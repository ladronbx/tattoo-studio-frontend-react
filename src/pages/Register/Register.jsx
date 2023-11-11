import React, { useState } from "react";
import "./Register.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { registerUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { checker } from "../../services/checker";

export const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    photo: ""
  });

  const [credentialsError, setCredentialsError] = useState({
    full_nameError: "",
    emailError: "",
    passwordError: "",
    phone_numberError: "",
    photoError: ""
  })

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

  const photoDefault = (photo) => (photo === "" ? undefined : photo);
  // const messageValidation = (message) => (message === ""? :)



  const SignUp = () => {
    if (
      credentials.full_name !== "" &&
      credentials.password !== "" &&
      credentials.email !== "" &&
      credentials.phone_number !== ""
    ) {
      const credentialsWithNumber = {
        ...credentials,
        phone_number: parseInt(credentials.phone_number, 10),
        photo: photoDefault(credentials.photo),
      };
      registerUser(credentialsWithNumber)
        .then((response) => {
          console.log(response.data);
          const { message, error } = response.data;
          setMessage(message);

          if (!error) {
            // Si no hay error, redirigir a la vista de login después de 2 segundos
            setTimeout(() => {
              navigate("/login");
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
          type={"name"}
          name={"full_name"}
          placeholder={"name"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.full_nameError}</div>

        <CustomInput
          design={"inputStyle"}
          type={"email"}
          name={"email"}
          placeholder={"email"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.emailError}</div>

        <CustomInput
          design={"inputStyle"}
          type={"password"}
          name={"password"}
          placeholder={"password"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.passwordError}</div>

        <CustomInput
          design={"inputStyle"}
          type={"number"}
          name={"phone_number"}
          placeholder={"phone number"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.phone_numberError}</div>

        <CustomInput
          design={"inputDesign"}
          type={"text"}
          name={"photo"}
          placeholder={"URL photo"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.photoError}</div>

        <div className='button-submit' onClick={SignUp}>Sign up</div>
        <p>{message}</p>
      </div>
    </div>

  );
};
