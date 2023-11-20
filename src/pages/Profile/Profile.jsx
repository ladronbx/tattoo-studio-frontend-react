import React, { useState, useEffect } from "react";
import "./Profile.css";
import { getProfile } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { LinkButton } from '../../common/LinkButton/LinkButton';
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const Profile = () => {
    const rdxToken = useSelector(selectToken);
    const [user, setUser] = useState({
        full_name: "",
        email: "",
        password: "",
        photo: "",
        phone_number: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (rdxToken) {
            getProfile(rdxToken)
                .then((response) => {
                    setUser(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            navigate("/login");
        }
    }, [rdxToken, navigate]);

    return (
        <div className="container-main-profile">
            {
                user
                    ? (
                        <div className="container-profile">
                            <div className="profile-row row">
                                <div className="profile-column col">
                                    <div className="container-left-img-profile">
                                        <img src={user.photo} alt="User" className="profile-image" />
                                    </div>
                                </div>
                                <div className="profile-column col">
                                    <div className="user-card-right-profile">
                                        <div className="full-name-profile">{user.full_name}</div>
                                        <div className="email-name-profile">Email</div>
                                        <div className="email-profile">{user.email}</div>
                                        <div className="phone-name-profile">Phone number</div>
                                        <div className="phone-profile">{user.phone_number}</div>
                                        <div className="button-update-profile">
                                            <LinkButton
                                                className=""
                                                path={"/update"}
                                                title={"Update my profile"}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div>Loading ...</div>
                    )
            }
        </div>
    );
};
