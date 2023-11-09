import React, { useState, useEffect } from "react"
import "./Login.css"
import { CustomInputs } from "../../common/CustomInputs/CustomInputs"


export const Login = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    // Argumento de entrada que es un evento.  
    const functionHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="loginStyle">
            <CustomInputs
                design={"inputStyle"}
                type={"email"}
                name={"email"}
                placeholder={"user@gmail.com"}
                functionProp={functionHandler}
            />
            <CustomInputs
                design={"inputStyle"}
                type={"password"}
                name={"password"}
                placeholder={"Password1!"}
                functionProp={functionHandler}
            />
        </div>

    )
}
