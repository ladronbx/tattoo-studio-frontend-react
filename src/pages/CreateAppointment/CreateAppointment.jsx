import React, { useState, useEffect } from "react"
import "./CreateAppointment.css"
import { useNavigate } from "react-router-dom";
import { checker } from "../../services/checker";
import { createAppointment, getAllArtists, getGallery } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";

import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const CreateAppointment = () => {
    const rdxToken = useSelector(selectToken);
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
    const [gallery, setgallery] = useState("");
    const [artists, setArtists] = useState([])

    const functionHandler = (e) => {
        setdataAppointments((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {

        if (artists.length === 0) {
            getAllArtists()
                .then(
                    response => {
                        setArtists(response.data.data)
                    }
                )
                .catch(error => console.log(error))
        } else {
            console.log(artists)
        }
    }, [artists]);

    useEffect(() => {

        if (gallery.length === 0) {
            getGallery()
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
            dataAppointments.email !== "") {
            createAppointment(dataAppointments, rdxToken)
                .then((response) => {
                    const { message, error } = response.data;
                    setMessage(message);
                    if (!error) {
                        setTimeout(() => {
                            navigate("/create-appointment");
                        }, 1500);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setMessage("All field are required");

        }
    };

    return (
        <div className="login-style-container-main">
            <div className="login-style-container">
            <div className="tittle-create-appointment"> Create appointment</div>
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

                    <select className="gallery-select" name="name" onChange={functionHandler}>
                        <option>Select a service</option>
                        {
                            gallery.map(
                                service => {
                                    return (
                                        <option key={service.id} value={service.name}>{service.name}</option>
                                    )
                                }
                            )
                        }
                    </select>
                }

                <div className='button-create' onClick={Create}>Send</div>
                <p>{message}</p>
            </div>
        </div>

    );
};