import React, { useState, useEffect } from "react"
import "./CreateAppointment.css"
import { useNavigate } from "react-router-dom";
import { checker } from "../../services/checker";

export const CreateAppointment = () => {

    const navigate = useNavigate();

    const [createAppointments, setcreateAppointments] = useState({
        date: "",
        shift: "",
        email: "",
        id: ""
    });


    const [message, setMessage] = useState("");

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

    const Create = () => {
        if (
            credentials.full_name !== "" &&
            credentials.password !== "" &&
            credentials.phone_number !== ""
        ) {
            const credentialsWithNumber = {
                ...credentials,
                phone_number: parseInt(credentials.phone_number, 10),
                photo: photoDefault(credentials.photo),
            };
            const token = localStorage.getItem("token");
            updateProfile(credentialsWithNumber, token)
                .then((response) => {
                    console.log(response.data);
                    const { message, error } = response.data;
                    setMessage(message);
                    if (!error) {
                        setTimeout(() => {
                            navigate("/profile");
                        }, 2000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="register-body">
            <div className="input-card">
                <CustomInput
                    design={"inputStyle"}
                    type={"date"}
                    name={"date"}
                    placeholder={"date"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='error-style'>{credentialsError.full_nameError}</div>

                <CustomInput
                    design={"inputStyle"}
                    type={"shift"}
                    name={"shift"}
                    placeholder={"shift"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='error-style'>{credentialsError.shiftError}</div>

                <CustomInput
                    design={"inputDesign"}
                    type={"email"}
                    name={"email"}
                    placeholder={"email"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='error-style'>{credentialsError.emailError}</div>

                <CustomInput
                    design={"inputDesign"}
                    type={"id"}
                    name={"id"}
                    placeholder={"id"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='error-style'>{credentialsError.idError}</div>

                <div className='button-submit' onClick={Create}>Create appointment</div>
                <p>{message}</p>
            </div>
        </div>

    );
};