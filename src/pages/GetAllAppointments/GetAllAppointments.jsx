import React, { useState, useEffect } from "react";
import "./GetAllAppointments.css"

import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { CardSuperAppointments } from "../../common/CardSuperAppointments/CardSuperAppointments";
import { getAllAppointments } from "../../services/apiCalls";

export const GetAllAppointments = () => {
  
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    if (rdxToken) {
      const decoded = jwtDecode(rdxToken);
      console.log(decoded);
      if (decoded.role == "super_admin") {
        getAllAppointments(rdxToken)
          .then(
            response => {
              if (appointments.length == 0) {
                setAppointments(response.data.data);
              }
            })
          .catch(error => console.log(error));
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [appointments]);

  const localStorageId = (argumento) => {
    localStorage.setItem("appointmentId", argumento)
  }

  return (
    <div className="appointments-body">
      {
        appointments.length > 0
          ? (<div className='appointments-Roster'>
            <div className="create-button">
              <LinkButton
                classButton={"createAppointment"}
                path={"/createAppointment"}
                title={"Create Appointment"} />
            </div>
            <div>
              {
                appointments.map(appointment => {
                  if (appointment.status) {
                    appointment.status = "pending"
                  } else if (!appointment.status) {
                    appointment.status = "done"
                  }
                  return (
                    <CardSuperAppointments
                      key={appointment.id}
                      appointmentId={appointment.id}
                      nameProduct={appointment.name}
                      imageProduct={appointment.image}
                      service={appointment.category}
                      email={appointment.email}
                      artist_name={appointment.artist_name}
                      client_name={appointment.user_name}
                      user_email={appointment.user_email}
                      artist={appointment.full_name}
                      date={appointment.date}
                      status={appointment.status}
                      shift={appointment.shift}
                      price={appointment.price}
                      emit={() => localStorageId(appointment.id)}
                    />
                  )
                }
                )}
            </div>
          </div>
          )
          : (
            <div>Loading...</div>
          )
      }
    </div>
  )
}












