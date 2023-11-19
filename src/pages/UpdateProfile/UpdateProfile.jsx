import React, { useState, useEffect } from "react";
import "./UpdateProfile.css"
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { checker } from "../../services/checker";
import { updateProfile } from "../../services/apiCalls";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const UpdateProfile = () => {

  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    full_name: "",
    password: "",
    phone_number: "",
    photo: ""
  });

  const [credentialsError, setCredentialsError] = useState({
    full_nameError: "",
    passwordError: "",
    phone_numberError: "",
    photoError: ""
  });

  useEffect(() => {
    if (!rdxToken) {
      navigate("/");
    }
  }, []);

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
  }

  const photoDefault = (photo) => (photo === "" ? undefined : photo);

  const Update = () => {
    if (credentials.full_name != "" &&
      credentials.password != "" &&
      credentials.phone_number != "") {
      const credentialsWithNumber = {
        ...credentials,
        phone_number: parseInt(credentials.phone_number, 10),
        photo: photoDefault(credentials.photo)
      };
      updateProfile(credentialsWithNumber, rdxToken)
        .then((response) => {
          console.log(response.data);
          const { message, error } = response.data;
          setMessage(message);
          if (!error) {
            setTimeout(() => {
              navigate("/profile");
            }, 1000)
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <div className="update-style-container-main">
      <div className="update-style-container">
        <h2 className="title-update">Update Profile</h2>
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

        <div className='buttonupdate' onClick={Update}>Update</div>
        <p>{message}</p>
      </div>
    </div>
  );
};
