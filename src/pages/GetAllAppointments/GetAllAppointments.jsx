import React, { useState, useEffect } from "react";
import "./GetAllAppointments.css";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { getAllAppointments } from "../../services/apiCalls";

export const GetAllAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && appointments.length === 0) {
      getAllAppointments(token)
        .then((response) => {
          console.log(response.data.data);
          setAppointments(response.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const localIdAppointment = (argumento) => {
    localStorage.setItem("appointmentId", argumento);
  };

  console.log(appointments);

  return (
    <div className="cards-appointment-body">
      {appointments ? (
        <div className="cards-appointment-container">
          <div>
            <LinkButton
              classButton={"link-button-style"}
              path={"/create-appointment"}
              title={"CreateAppointment"}
            />
            {appointments.map((appointment) => {

              if (appointment.status == false) {
                appointment.status = "pending"
              } else if (appointment.status == true) {
                appointment.status = "done"
              }

              return (
                <CardAppointment
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
                  emit={() => localIdAppointment(appointment.id)}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
