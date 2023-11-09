import React, { useState, useEffect } from "react";
import "./Login.css";
import { CustomInputs } from "../../common/CustomInputs/CustomInputs";
import { useNavigate } from 'react-router-dom';
import { connection } from "../../services/apiCalls";


export const Login = () => {

    const navigate = useNavigate();

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

    useEffect(() => {
        console.log(credentials);
    }, [credentials]);

    const logMe = () => {
        connection(credentials)
            .then((response) => {
                console.log(response.data);
                navigate("/profile");
            })
            .catch(error => {
                console.log(error);
            });
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

            <div className='buttonLogin' onClick={logMe}>Log Me!</div>

        </div>

    )
}
