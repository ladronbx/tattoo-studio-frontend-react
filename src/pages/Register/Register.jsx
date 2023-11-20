import React, { useEffect, useState } from "react";
import "./Register.css"; // Asegúrate de importar el archivo CSS correcto
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser, registerUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { checker } from "../../services/checker";

//Rdx escritura
import { useDispatch } from "react-redux";
import { login } from "../userSlice";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const rdxUserData = useSelector(selectToken);

  useEffect(() => {
    if (rdxUserData) {
      navigate("/");
    }
  }, []);

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
          const { message } = response.data;
          setMessage(message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (message === "User registered successfully") {
      logUser(credentials)
        .then((response) => {
          const { message, token } = response.data;
          setMessage(message);
          if (message === "Login successful. Token generated.") {
            dispatch(login(token));
            navigate("/profile");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [message]);

  return (
    <div className="login-style-container-main"> {/* Aplicar estilo del contenedor principal */}
      <div className="register-style-container"> {/* Aplicar estilo del contenedor de inputs */}
        <h2 class="title-login">Sign Up!</h2> {/* Aplicar estilo del título */}
        {/* Aplicar estilo del input y del mensaje de error para cada campo */}
        <CustomInput
          design={"inputStyle"}
          type={"name"}
          name={"full_name"}
          placeholder={"Name"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.full_nameError}</div>

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

        <CustomInput
          design={"inputStyle"}
          type={"number"}
          name={"phone_number"}
          placeholder={"Phone number"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.phone_numberError}</div>

        <CustomInput
          design={"inputStyle"}
          type={"text"}
          name={"photo"}
          placeholder={"URL photo"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
        <div className='error-style'>{credentialsError.photoError}</div>

        {/* Aplicar estilo al botón de registro */}
        <div className='buttonLogin' onClick={SignUp}>Sign Up</div>
        <p>{message}</p>
      </div>
    </div>
  );
};
