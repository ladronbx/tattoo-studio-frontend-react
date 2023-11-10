import React, { useState, useEffect } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { login } from "../../services/apiCalls";

export const Login = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });


    const [token, setToken] = useState(""); 

    const functionHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const logMe = () => {
        login(credentials)
            .then((response) => {
                console.log(response.data);
                const { token } = response.data;
                //const token = response.data.token 
                setToken(token);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="loginStyle">
            <CustomInput
                design={"inputStyle"}
                type={"email"}
                name={"email"}
                placeholder={"user@gmail.com"}
                functionProp={functionHandler}
            />
            <CustomInput
                design={"inputStyle"}
                type={"password"}
                name={"password"}
                placeholder={"Password1!"}
                functionProp={functionHandler}
            />

            <div className='buttonLogin' onClick={logMe}>Log Me!</div>

            <div className="tokenStyle">{token}</div>

        </div>
    )
}