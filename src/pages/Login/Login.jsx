import React, { useState, useEffect } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { login } from "../../services/apiCalls";
import { checker } from "../../services/checker";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [credentialsError, setCredentialsError] = useState({
        emailError: "",
        passwordError: ""
    });

    // const [token, setToken] = useState("");

    const functionHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {
        let error = "";
        error = checker(e.target.name, e.target.value);

        setCredentialsError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    };

    const [message, setMessage] = useState("");

    const logMe = () => {
        if (
            credentials.password !== "" &&
            credentials.email !== ""
        ) {
            login(credentials)
                .then((response) => {
                    console.log(response.data);
                    const { message} = response.data;
                    setMessage(message);
                    // setToken(token);
                    if (message == "Login successful. Token generated.") {
                        //guarado el token en localstorage
                        localStorage.setItem("token", response.data.token)
                        console.log(response.data);
                        navigate("/profile")
                    }
                })

                .catch(error => {
                    console.log(error);
                });
        };
    }

    return (
        <div className="login-style">
            <CustomInput
                design={"inputStyle"}
                type={"email"}
                name={"email"}
                placeholder={"user@gmail.com"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className='error-style'>{credentialsError.emailError}</div>
            <CustomInput
                design={"inputStyle"}
                type={"password"}
                name={"password"}
                placeholder={"Password1!"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className='error-style'>{credentialsError.passwordError}</div>

            <div className='buttonLogin' onClick={logMe}>Log Me!</div>

        </div>
    )
}