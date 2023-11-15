import React, { useState, useEffect } from "react";
import "./Appointments.css";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { appointmentsUsers } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { useNavigate } from "react-router-dom";

export const Appointments = () => {
  
  const navigate = useNavigate(); 
  const rdxToken = useSelector(selectToken);


  const [appointments, setAppointments] = useState([]); 

  useEffect(() => { 

      if (rdxToken && appointments.length == 0) {
          appointmentsUsers(rdxToken)
              .then(response => { 
                  setAppointments(response.data.data)
              })
              .catch(error => console.log(error))
      } else {
          navigate("/login");
      } 

  }, []); 

  const localStorageId = (argumento) => {
      localStorage.setItem("appointmentId", argumento)
  } 
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
            {appointments.map((appointment) => (

              <CardAppointment
                key={appointment.id}
                appointmentId={appointment.id}
                nameProduct={appointment.name}
                imageProduct={appointment.image}
                service={appointment.category}
                email={appointment.email}
                artist={appointment.full_name}
                date={appointment.date}
                shift={appointment.shift}
                price={appointment.price}
                emit={() => localStorageId(appointment.id)}
              />

            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};