import React, { useState, useEffect } from "react";
import "./Appointments.css"
import { appointmentsUsers, removeAppointment } from "../../services/apiCalls";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { appointmentId } from "../appointmentSlice";

export const Appointments = () => {

  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [appointments, setAppointments] = useState([])
  const [loop, setloop] = useState(false)

  useEffect(() => {
    if (rdxToken) {
      appointmentsUsers(rdxToken)
        .then(response => {
          if (loop == false) {
            setAppointments(response.data.data);
            setloop(true)
          }
        })
        .catch(error => console.log(error));
    } else {
      navigate("/");
    }
  }, [appointments]);

  const rdxIdAppointment = (argumento) => {
    dispatch(appointmentId(argumento))
  }

  const removeAppointments = (appointmentId, token) => {
    removeAppointment(appointmentId, token)
      .then(response => {
        console.log(response.data.message);
        setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
      })
      .catch(error => console.log(error));
  };
  
  console.log(appointments);
  return (
    <div className="cards-appointment-body">
      {
        appointments
          ? (
            <div className="cards-appointment-container">
              <div>
                <LinkButton
                  classButton={"link-button-style"}
                  path={"/create-appointment"}
                  title={"CreateAppointment"}
                />
                {
                  appointments.map((appointment) => (

                    <CardAppointment
                      key={appointment.id}
                      appointmentId={appointment.id}
                      date={appointment.date}
                      category={appointment.category}
                      nameProduct={appointment.name}
                      imageProduct={appointment.image}
                      email={appointment.email}
                      artist_name={appointment.full_name}
                      shift={appointment.shift}
                      price={appointment.price}
                      emit={() => rdxIdAppointment(appointment.id)}
                      remove={() => removeAppointments(appointment.id, rdxToken)}
                    />
                  ))
                }
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
    </div>
  );
}