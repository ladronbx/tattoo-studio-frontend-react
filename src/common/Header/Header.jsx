import React from "react";
import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const rdxCredentials = useSelector(userData);

    const logOutMe = () => {
        dispatch(logout({ credentials: "" }));
        navigate("/");
    };


    return (
        <div className="header-style">
            <LinkButton
                classButton={"link-button-style"}
                path={"/"}
                title={"Home"}
            />

            <LinkButton
                classButton={"link-button-style"}
                path={"/artists"}
                title={"Artists"}
            />

            <LinkButton
                classButton={"link-button-style"}
                path={"/services"}
                title={"Services"}
            />

            {!rdxCredentials?.credentials.token ? (
                <>
                    <LinkButton
                        classButton={"link-button-style"}
                        path={"/login"}
                        title={"Login"}
                    />
                    <LinkButton
                        classButton={"link-button-style"}
                        path={"/register"}
                        title={"Register"}
                    />

                    <LinkButton
                        classButton={"link-button-style"}
                        path={"/get-all-services"}
                        title={"Get all Services"}
                    />
                </>
            ) : (
                <>
                    <LinkButton
                        classButton={"link-button-style"}
                        path={"/profile"}
                        title={`Profile ${rdxCredentials.credentials.full_name}`}
                    />

                    <LinkButton
                        classButton={"link-button-style"}
                        path={"/update"}
                        title={"Update Profile"}
                    />

                    <LinkButton
                        classButton={"link-button-style"}
                        path={"/appointments"}
                        title={"Appointments"}
                    />

                    <LinkButton
                        classButton={"link-button-style"}
                        path={"/get-all-users"}
                        title={"Get all Users"}
                    />
                    <LinkButton
                        classButton={"link-button-style"}
                        path={"/get-all-appointments"}
                        title={"Get all Appointments"}
                    />


                    <div onClick={logOutMe}>
                        <LinkButton path={"/"} title={"Log Out"} />
                    </div>
                </>
            )}
        </div>
    );

};


