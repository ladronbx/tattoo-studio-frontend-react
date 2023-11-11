import React, { useState, useEffect } from "react"
import "./Profile.css";
import { getProfile } from "../../services/apiCalls"
import { useNavigate } from 'react-router-dom'
import { CardUser } from "../../common/CardUSer/CardUser"

export const Profile = () => {
    const [user, setUser] = useState({
        full_name: "",
        email: "",
        password: "",
        photo: "",

    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)

        if (token) {
            getProfile(token)
                .then((response) => {
                    setUser(response.data.data);
                })
                .catch((error) => { console.log(error) });

        } else {
            // Si no hay token, redirige al usuario a la página de inicio de sesión
            console.log("No hay token, redirigiendo a la página de inicio de sesión");
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
                            <h1>Welcome, {user.full_name}!</h1>
                        </div>
                    )
                    : (
                        <div>Loading ...</div>
                    )
            }
        </div>
    );

};