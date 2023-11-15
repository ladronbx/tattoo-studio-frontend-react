import React, { useState, useEffect } from "react";
import "./GetAllUsers.css";
import { getAllUsers } from "../../services/apiCalls";
import { CardUser } from "../../common/CardUser/CardUser";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";

export const GetAllUsers = () => {
    const rdxToken = useSelector(selectToken);
    const [decodedToken, setDecodedToken] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (rdxToken) {
            try {
                const decoded = jwtDecode(rdxToken);
                console.log(decoded.role);
                setDecodedToken(decoded);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [rdxToken]);

    useEffect(() => {
        if (rdxToken) {
            getAllUsers(rdxToken)
                .then((users) => {
                    setUsers(users.data.data);
                })
                .catch((error) => console.log(error));
        }
    }, [rdxToken]);

    return (
        <div className="cards-users-body">
            {users.length > 0 
            ? (
                <div>
                    {users.map((user) => {
                        if (decodedToken && decodedToken.role === "super_admin") {
                            return (
                                <CardUser
                                    key={user.id}
                                    full_name={user.full_name}
                                    photo={user.photo}
                                    email={user.email}
                                    phone_number={user.phone_number}
                                    is_active={user.is_active}
                                    role_id={user.role_id}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            ) : (
                <div>Loading ...</div>
            )}
        </div>
    );
};
