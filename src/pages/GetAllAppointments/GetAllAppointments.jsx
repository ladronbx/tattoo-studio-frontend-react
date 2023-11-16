import React, { useState, useEffect } from "react";
import "./GetAllAppointments.css"
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { getAllAppointments, removeAppointment } from "../../services/apiCalls";

//Rdx escritura
import { useDispatch } from "react-redux";
import { appointmentId } from "../appointmentSlice";

//Rdx lectura
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton";


export const GetAllAppointments = () => {

  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (rdxToken) {
      const decoded = jwtDecode(rdxToken);
      console.log(decoded);
      if (decoded.role == "super_admin") {
        const pageString = page.toString()
        getAllAppointments(rdxToken, pageString)
          .then(
            user => {
              if (Array.isArray(user.data.data)) {
                setAppointments(user.data.data)
              } else {
                setPage(page - 1)
              }
            })
          .catch((error) => console.log(error));
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [page]);

  const changePageUp = () => {
    setPage(page + 1)
  }

  const changePageDown = () => {
    if (page != 0) {
      setPage(page - 1)
    }
  }

  const rdxIdAppointment = (argumento) => {
    dispatch(appointmentId(argumento))
  }

  const removeAppointments = (body, token) => {
    removeAppointment(body, token)
      .then(response => {
        console.log(response.data.message);
        // setAppointments(prevAppointments => prevAppointments.filter(app => app.id !== id));
      })
      .catch(error => console.log(error))
  }
  console.log(appointments);

  return (

    <div className="appointments-body">

      <PaginationButton
        classPagination={"next"}
        text={"Next"}
        changePagination={() => changePageUp()}
      />
      <PaginationButton
        classPagination={"previus"}
        text={"Previus"}
        changePagination={() => changePageDown()}
      />

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
                  // if (appointment.status) {
                  //   appointment.status = "pending"
                  // } else if (!appointment.status) {
                  //   appointment.status = "done"
                  // }
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
                      emit={() => rdxIdAppointment(appointment.id)}
                      remove={() => removeAppointments(appointment.id, rdxToken)}

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












