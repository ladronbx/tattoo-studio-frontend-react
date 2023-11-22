import React, { useState, useEffect } from "react";
import "./UpdateAppointment.css"
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";
import { getArtists, getServices, updateAppointment } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { selectAppointmentId } from "../appointmentSlice";
import { checker } from "../../services/checker";

export const UpdateAppointment = () => {
    const rdxToken = useSelector(selectToken);
    const rdxAppointmentId = useSelector(selectAppointmentId);
    const navigate = useNavigate();
    const [gallery, setgallery] = useState("");
    const [artists, setartists] = useState([])

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
        if (rdxToken && rdxAppointmentId) {
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

    useEffect(() => {

        if (artists.length === 0) {
            getArtists()
                .then(
                    response => {
                        setartists(response.data.data)
                    }
                )
                .catch(error => console.log(error))
        } else {
            console.log(artists)
        }
    }, [artists]);

    useEffect(() => {

        if (gallery.length === 0) {
            getServices()
                .then(
                    response => {
                        setgallery(response.data.data)
                    }
                )
                .catch(error => console.log(error))
        } else {
            console.log(gallery)
        }
    }, [gallery]);

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
                    const { message } = response.data;
                    setMessage(message);
                    if (message == "Appointment updated succesfully") {
                        setTimeout(() => {
                            navigate("/appointments");
                        }, 3000)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setMessage("All field are required");

        }
    };
    return (
        <div className="login-style-container-main">
            <div className="login-style-container">
                <div className="tittle-create-appointment"> Update appointment</div>

                <CustomInput
                    design={"inputDesign"}
                    type={"date"}
                    name={"date"}
                    placeholder={"YYYY-MM-DD"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.dateError}</div>
{/* 
                <ShiftToggle
                    design={"inputDesign"}
                    selectedShift={appointment.shift}
                    onShiftChange={(value) =>
                        setAppointment((prevState) => ({ ...prevState, shift: value }))
                    }
                /> */}
                 
                <select name="shift" onChange={functionHandler}>
                    <option>Select an shift</option>
                    <option value='morning'>Morning </option>
                    <option value='afternoon'>Afternoon</option>
                </select> 

                <div className='errorMsg'>{appointmentError.dateError}</div>

                {
                    artists.length > 0 &&

                    <select name="email" onChange={functionHandler}>
                        <option>Select an artist</option>
                        {
                            artists.map(
                                artist => {
                                    return (
                                        <option key={artist.id} value={artist.email}>{artist.full_name}</option>
                                    )
                                }
                            )
                        }
                    </select>
                }

                {
                    gallery.length > 0 &&

                    <select className="gallery-select" name="portfolioId" onChange={functionHandler}>
                        <option>Select a service</option>
                        {
                            gallery.map(
                                service => {
                                    return (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    )
                                }
                            )
                        }
                    </select>
                }

                <div className='button-update' onClick={Update}>Update</div>

                <p>{message}</p>
            </div>
        </div>
    )
}