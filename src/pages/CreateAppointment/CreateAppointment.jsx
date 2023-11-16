import React, { useState, useEffect } from "react"
import "./CreateAppointment.css"
import { useNavigate } from "react-router-dom";
import { checker } from "../../services/checker";
import { createAppointment, getArtists, getServices } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";

//Rdx lectura
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



    // useEffect(() => {
    //     if (!rdxToken) {
    //         navigate("/");
    //     }
    // }, []);

    const [message, setMessage] = useState("");
    const [gallery, setgallery] = useState("");

    const [artists, setartists] = useState([])

    const functionHandler = (e) => {
        setdataAppointments((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

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
            dataAppointments.id !== "") {
            createAppointment(dataAppointments, rdxToken)
                .then((response) => {
                    console.log(response.data);
                    const { message, error } = response.data;
                    setMessage(message);
                    if (!error) {
                        setTimeout(() => {
                            navigate("/appointments");
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

                {
                    artists.length > 0 &&

                    <select name="email" value="email" onChange={functionHandler}>
                        <option>Select an artist</option>
                        {
                            artists.map(
                                artist => {
                                    return (
                                        <option key={artist.id} value="email">{artist.full_name}</option>
                                    )
                                }
                            )
                        }
                    </select>
                }

                {
                    gallery.length > 0 &&

                    <select className = "gallery-select" value="id" name="id" onChange={functionHandler}>
                        <option>Select a service</option>
                        {
                            gallery.map(
                                service => {
                                    return (
                                        <option key={service.id} value="id">{service.name}</option>
                                    )
                                }
                            )
                        }
                    </select>
                }

                <div className='button-submit' onClick={Create}>Create appointment</div>
                <p>{message}</p>
            </div>
        </div>

    );
};