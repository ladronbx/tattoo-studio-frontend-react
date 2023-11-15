import React, { useState, useEffect } from "react";
import "./GetAllAppointments.css"
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CardSuperAppointments } from "../../common/CardSuperAppointments/CardSuperAppointments";
import { getAllAppointments } from "../../services/apiCalls";

//Rdx escritura
import { useDispatch } from "react-redux";
import { appointmentId } from "../appointmentSlice";

//Rdx lectura
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";


export const GetAllAppointments = () => {
  
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [appointments, setAppointments] = useState([])
  const [loop, setloop] = useState(false)

  useEffect(() => {
    if (rdxToken) {
      const decoded = jwtDecode(rdxToken);
      console.log(decoded);
      if (decoded.role == "super_admin") {
        getAllAppointments(rdxToken)
          .then(
            response => {
              if (loop == false) {
                setAppointments(response.data.data);
                setloop(true);
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

  const rdxIdAppointment = (argumento) => {
    dispatch(appointmentId(argumento))
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
                      emit={() => rdxIdAppointment(appointment.id)}
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












