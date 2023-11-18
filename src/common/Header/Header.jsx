import React, { useEffect, useState } from "react";
import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken } from "../../pages/userSlice";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logoImage from "../../assets/img/logo.png";

export const Header = () => {
    const dispatch = useDispatch();
    const rdxToken = useSelector(selectToken);
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        if (rdxToken) {
            try {
                const decoded = jwtDecode(rdxToken);
                console.log(decoded);
                console.log(decoded.role);
                setDecodedToken(decoded);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [rdxToken]);

    const logOutMe = () => {
        dispatch(logout());
        Navigate("/");
    };

    return (
        <div className="header-style">
            <LinkButton
                classButton={"link-button-style"}
                path={"/"}
                title={
                    <div className="logo-image">
                        <img src={logoImage} alt="Logo" />
                    </div>
                }
            />

            <div className="link-buttons">

                <LinkButton classButton={"link-button-style"} path={"/"} title={"Home"} />
                <LinkButton classButton={"link-button-style"} path={"/artists"} title={"Artists"} />
                <LinkButton classButton={"link-button-style"} path={"/gallery"} title={"Gallery"} />

                {rdxToken ? (
                    <>
                        <LinkButton classButton={"link-button-style"} path={"/profile"} title={"Profile"} />
                        <LinkButton classButton={"link-button-style"} path={"/appointments"} title={"Appointments"} />
                        <LinkButton classButton={"link-button-style"} path={"/update"} title={"Update Profile"} />

                        {decodedToken && decodedToken.role === "super_admin" && (
                            <>
                                <LinkButton classButton={"link-button-style"} path={"/get-all-users"} title={"Get all Users"} />
                                <LinkButton classButton={"link-button-style"} path={"/get-all-appointments"} title={"Get all Appointments"} />
                            </>
                        )}

                        <div onClick={logOutMe}>
                            <LinkButton classButton={"link-button-style"} path={"/"} title={"Log Out"} />
                        </div>

                    </>
                )

                    : (
                        <>
                            <LinkButton classButton={"link-button-style"} path={"/login"} title={"Login"} />
                            <LinkButton classButton={"link-button-style"} path={"/register"} title={"Register"} />
                        </>
                    )}
            </div>
        </div>
    );
};

