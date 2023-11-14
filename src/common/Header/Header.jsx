import React from "react";
import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken } from "../../pages/userSlice";
import { Navigate } from "react-router-dom";

export const Header = () => {
    const dispatch = useDispatch();
    const rdxToken = useSelector(selectToken);

    const logOutMe = () => {
        dispatch(logout())
        Navigate("/")
    }

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

            {
                rdxToken
                    ? (
                        <>

                            <LinkButton
                                classButton={"link-button-style"}
                                path={"/profile"}
                                title={`Profile`}
                            />

                            <LinkButton
                                classButton={"link-button-style"}
                                path={"/appointments"}
                                title={"Appointments"}
                            />

                            <LinkButton
                                classButton={"link-button-style"}
                                path={"/update"}
                                title={"Update Profile"}
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
                                <LinkButton 
                                classButton={"link-button-style"} 
                                path={"/"} 
                                title={"Log Out"} />
                            </div>



                        </>
                    ) : (
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
                    )}
        </div>
    );

};


