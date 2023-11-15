import React, { useState, useEffect } from "react";
import "./UpdateAppointment.css"
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";
import { updateAppointment } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { selectAppointmentId } from "../appointmentSlice";
import { checker } from "../../services/checker";

export const UpdateAppointment = () => {

    const rdxToken = useSelector(selectToken);
    const rdxAppointmentId = useSelector(selectAppointmentId);
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState({
        id: "",
        date: "",
        shift: "",
        email: "",
        portfolioId: ""
    });

    const [appointmentError, setAppointmentError] = useState({
        idError: "",
        dateError: "",
        shiftError: "",
        emailError: "",
        portfolioIdError: ""
    });

    useEffect(() => {
        if (rdxToken) {
            setAppointment((prevState) => ({ ...prevState, id: rdxAppointmentId }))
            console.log(rdxAppointmentId);
        } else {
            navigate("/");
        }
    }, [])

    const [message, setMessage] = useState("");

    const functionHandler = (e) => {
        setAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {

        let error = "";
        error = checker(e.target.name, e.target.value);

        setAppointmentError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const Update = () => {
        if (
            appointment.date !== "" &&
            appointment.shift !== "" &&
            appointment.email !== "" &&
            appointment.portfolioId !== "" &&
            appointment.id !== ""
        ) {
            const appointmentsWithNumber = {
                ...appointment,
                id: parseInt(appointment.id, 10),
                portfolioId: parseInt(appointment.portfolioId, 10),
            };
            updateAppointment(appointmentsWithNumber, rdxToken)
                .then((response) => {
                    console.log(response.data);
                    const { message } = response.data;
                    setMessage(message);
                    if (message == "Appointment updated succesfully") {
                        setTimeout(() => {
                            navigate("/appointments");
                        }, 2500)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
    return (
        <div className="appointment-update-body">

            <div className="input-card">


                <CustomInput
                    design={"inputDesign"}
                    type={"date"}
                    name={"date"}
                    placeholder={"YYYY-MM-DD"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.dateError}</div>

                <ShiftToggle
                    design={"inputDesign"}
                    selectedShift={appointment.shift}
                    onShiftChange={(value) =>
                        setAppointment((prevState) => ({ ...prevState, shift: value }))
                    }

                />
                <div className='errorMsg'>{appointmentError.dateError}</div>

                <CustomInput
                    design={"inputDesign"}
                    type={"number"}
                    name={"portfolioId"}
                    placeholder={"55"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.portfolioIdError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"email"}
                    name={"email"}
                    placeholder={"user@gmail.com"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.emailError}</div>
                <div className='animated-button' onClick={Update}>Update</div>

                <p>{message}</p>
            </div>
        </div>
    )
}