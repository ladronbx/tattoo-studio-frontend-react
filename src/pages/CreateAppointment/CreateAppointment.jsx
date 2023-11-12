import React, { useState, useEffect } from "react"
import "./CreateAppointment.css"
import { useNavigate } from "react-router-dom";
import { checker } from "../../services/checker";
import { createAppointment } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";

export const CreateAppointment = () => {

    const navigate = useNavigate();

    const [dataAppointments, setdataAppointments] = useState({
        date: "",
        shift: "",
        email: "",
        id: ""
    });

    const [dataAppointmentsError, setdataAppointmensError] = useState({
        dateError: "",
        shiftError: "",
        emailError: "",
        idError: ""
    });

    const [message, setMessage] = useState("");

    const functionHandler = (e) => {
        setdataAppointments((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {
        let error = "";
        error = checker(e.target.name, e.target.value);

        setdataAppointmensError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    };

    const Create = () => {
        if (
            dataAppointments.date !== "" &&
            dataAppointments.shift !== "" &&
            dataAppointments.email !== "" &&
            dataAppointments.id !== ""
        ) {
            const token = localStorage.getItem("token");
            createAppointment(dataAppointments, token)
                .then((response) => {
                    console.log(response.data);
                    const { message, error } = response.data;
                    setMessage(message);
                    if (!error) {
                        setTimeout(() => {
                            navigate("/appointments");
                        }, 2000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="create-appointment-body">
            <div className="input-card">
                <CustomInput
                    design={"inputStyle"}
                    type={"date"}
                    name={"date"}
                    placeholder={"date"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='error-style'>{dataAppointmentsError.dateError}</div>

                <ShiftToggle
                    selectedShift={dataAppointments.shift}
                    onShiftChange={(value) =>
                        setdataAppointments((prevState) => ({ ...prevState, shift: value }))
                    }
                />
                <div className='error-style'>{dataAppointmentsError.shiftError}</div>

                <CustomInput
                    design={"inputDesign"}
                    type={"email"}
                    name={"email"}
                    placeholder={"email"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='error-style'>{dataAppointmentsError.emailError}</div>

                <CustomInput
                    design={"inputDesign"}
                    type={"number"}
                    name={"id"}
                    placeholder={"id"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='error-style'>{dataAppointmentsError.idError}</div>

                <div className='button-submit' onClick={Create}>Create appointment</div>
                <p>{message}</p>
            </div>
        </div>

    );
};