import React, { useState, useEffect } from "react"
import "./GetAllUsers.css"
import { getAllUsers } from "../../services/apiCalls"
import { CardUser } from "../../common/CardUSer/CardUser"

export const GetAllUsers = () => {

    const [users, setUsers] = useState([])


    useEffect(() => {
        if (users.length === 0) {
            const token = localStorage.getItem("token")
            getAllUsers(token)
                .then(users => {
                    console.log(users)
                    setUsers(users.data.data)
                })
                .catch(error => console.log(error))
        }
    }, [users])

    return (
        <div className="cards-users-body">
            {
                users.length > 0

                    ? (
                        <div>
                            {
                                users.map(user => {
                                    if(user.is_active == true){
                                        user.is_active = "This user is active"
                                    } else if(users.is_active == false){
                                        user.is_active = "This user is not active"
                                    }
                                    if(user.role_id == 1){
                                        user.role_id = "This user is a client"
                                    } else if(user.role_id == 2){
                                        user.role_id = "This user is a worker"
                                    } else if (user.role_id == 3){
                                        user.role_id = "This user is a super admin"
                                    }
                                    return <CardUser
                                        key={user.id}
                                        full_name={user.full_name}
                                        photo={user.photo}
                                        email={user.email}
                                        phone_number={user.phone_number}
                                        is_active={user.is_active}
                                        role_id={user.role_id}
                                    />
                                })
                            }
                        </div>)

                    : (<div> Loading ... </div>)
            }
        </div>
    )
}