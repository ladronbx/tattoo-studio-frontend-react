import React, { useState, useEffect } from "react";
import "./GetAllUsers.css";
import { getAllUsers } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";
import { CardUser } from "../../common/CardUSer/CardUser";

export const GetAllUsers = () => {
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const [users, setusers] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (rdxToken) {
      const decoded = jwtDecode(rdxToken);
      if (decoded.role === "super_admin") {
        const pageString = page.toString()
        getAllUsers(rdxToken, pageString)
          .then(
            user => {
              if (Array.isArray(user.data.data)) {
                setusers(user.data.data)
              } else {
                setPage(page - 1)
              }
            })
          .catch((error) => console.log(error));
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [page]);

  const changePageUp = () => {
    setPage(page + 1)
  }

  const changePageDown = () => {
    if (page != 0) {
      setPage(page - 1)
    }
  }

  return (

    <div className="card-user-container-main">
      <div className="pagination-container">
        <PaginationButton
          classPagination="previous-artist"
          text={"<< Previous"}
          changePagination={() => changePageDown()}
        />
        <PaginationButton
          classPagination="next-artist "
          text={"Next >>"}
          changePagination={() => changePageUp()}
        />
      </div>


      {
        users.length > 0
          ? (

            <div className="card-user-container">
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
