import React, { useState, useEffect } from "react"
import "./CreateAppointment.css"
import { useNavigate } from "react-router-dom";
import { checker } from "../../services/checker";
import { createAppointment, getArtists } from "../../services/apiCalls";
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

    const [message, setMessage] = useState("");

    const [artists, setartists]=useState([])

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
                    results => {
                        setartists(results.data.data)
                    }
                )
                .catch(error => console.log(error))
        } else {
            console.log("artists vale...", artists)
        }
    }, [artists]);



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
            createAppointment(dataAppointments, rdxToken)
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

                {
                    artists.length > 0 &&

                    <select name="email" onChange={functionHandler}>
                        <option>Select an artist</option>
                        {
                            artists.map(
                                artist => {
                                    return (
                                        <option key={artist.id} >{artist.email }</option>
                                    )
                                }
                            )
                        }
                    </select>
                }

                {/* <CustomInput
                    design={"inputDesign"}
                    type={"email"}
                    name={"email"}
                    placeholder={"email"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                /> */}
                {/* <div className='error-style'>{dataAppointmentsError.emailError}</div> */}

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