import React, { useState, useEffect } from "react";
import "./Appointments.css";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { appointmentsUsers } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const rdxToken = useSelector(selectToken);

    if (rdxToken && appointments.length === 0) {
      appointmentsUsers(rdxToken)
        .then((response) => {
          console.log(appointments);
          setAppointments(response.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);


  const localIdAppointment = (argumento) => {
    rdxToken.setItem("appointmentId", argumento)
  }
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
                emit={() => localIdAppointment(appointment.id)}
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