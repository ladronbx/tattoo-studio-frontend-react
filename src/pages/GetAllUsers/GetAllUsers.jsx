import React, { useState, useEffect } from "react";
import "./GetAllUsers.css";
import { getAllUsers } from "../../services/apiCalls";
import { CardUser } from "../../common/CardUser/CardUser";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const GetAllUsers = () => {

const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const [users, setusers] = useState([])
  const [loop, setloop] = useState(false)

  useEffect(() => {
    if (rdxToken) {
      const decoded = jwtDecode(rdxToken);
      console.log(decoded);
      if (decoded.role == "super_admin") {
        getAllUsers(rdxToken)
          .then(
            response => {
              if(loop == false) {
                setusers(response.data.data);
                setloop(true)
              }
            })
          .catch(error => console.log(error));
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [users]);

    return (
        <div className="cards-users-body">
            {
            users.length > 0 
            ? (
                <div>
                    {users.map((user) => (
                        <CardUser
                            key={user.id}
                            full_name={user.full_name}
                            photo={user.photo}
                            email={user.email}
                            phone_number={user.phone_number}
                            is_active={user.is_active}
                            role_id={user.role_id}
                        />
                    ))}
                </div>
            ) : (
                <div>Loading ...</div>
            )}
        </div>
    );
};
