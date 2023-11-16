import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser } from "../../services/apiCalls";
import { login, userData } from "../userSlice";
import { checker } from "../../services/checker";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const rdxUserData = useSelector(userData);

    useEffect(() => {
        if (rdxUserData) {
            navigate("/")
        }
    }, [rdxUserData])

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [credentialsError, setCredentialsError] = useState({
        emailError: "",
        passwordError: ""
    });

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
            logUser(credentials)
                .then((response) => {
                    const { message, token } = response.data;
                    setMessage(message);

                    if (message == "Login successful. Token generated.") {
                        dispatch(login(token))
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
                placeholder={"Email"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className='error-style'>{credentialsError.emailError}</div>
            <CustomInput
                design={"inputStyle"}
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className='error-style'>{credentialsError.passwordError}</div>

            <div className='buttonLogin' onClick={logMe}>Log Me!</div>

        </div>
    )
}