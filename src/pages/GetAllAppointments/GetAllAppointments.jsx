import React, { useState, useEffect } from "react";
import "./GetAllAppointments.css";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { getAllAppointments } from "../../services/apiCalls";
import { CardSuperAppointments } from "../../common/CardSuperAppointments/CardSuperAppointments";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { useNavigate } from "react-router-dom";

export const GetAllAppointments = () => {
  const navigate = useNavigate(); 
  const rdxToken = useSelector(selectToken);


  const [appointments, setAppointments] = useState([]); 

  useEffect(() => { 

      if (rdxToken && appointments.length == 0) {
          getAllAppointments(rdxToken)
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
