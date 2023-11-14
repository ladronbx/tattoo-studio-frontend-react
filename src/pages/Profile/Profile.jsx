import React, { useState, useEffect } from "react"
import "./Profile.css";
import { getProfile } from "../../services/apiCalls"
import { useNavigate } from 'react-router-dom'
import { LinkButton } from '../../common/LinkButton/LinkButton'
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const Profile = () => {

    const rdxToken = useSelector(selectToken);

    const [user, setUser] = useState({
        full_name: "",
        email: "",
        password: "",
        photo: "",
    });

    const navigate = useNavigate();

    useEffect(() => {

        if (rdxToken) {
            getProfile(rdxToken)
                .then((response) => {
                    setUser(response.data.data);
                })
                .catch((error) => { console.log(error) });

        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div class="card-user-container">
            {
                user
                    ? (
                        <div className="card-user">
                            <img src={user.photo} alt="User" />
                            <h2>{user.full_name}</h2>
                            <h3>Email</h3>
                            <h4>{user.email}</h4>
                            <h3>Phone number</h3>
                            <h4>{user.phone_number}</h4>
                            <div>
                                <LinkButton
                                    classButton="button-update"
                                    path={"/update"}
                                    title={"Update my profile"}
                                />
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