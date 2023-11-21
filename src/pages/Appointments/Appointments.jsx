import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css";
import { appointmentsUsers, removeAppointment } from "../../services/apiCalls";
import { CardAppointment } from "../../common/CardAppointment/CardAppointment";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { selectToken } from "../userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { appointmentId } from "../appointmentSlice";
import { PaginationButton } from "../../common/PaginationButton/PaginationButton"

export const Appointments = () => {
  const rdxToken = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (rdxToken) {
      const pageString = page.toString();
      appointmentsUsers(rdxToken, pageString)
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setTimeout(() => {
              setAppointments(response.data.data);
            }, 200);
          } else {
            setPage(page - 1);
          }
        })
        .catch((error) => console.log(error));
    } else {
      navigate("/");
    }
  }, [page]);

  const rdxIdAppointment = (argumento) => {
    dispatch(appointmentId(argumento));
  };

  const removeAppointments = (appointmentId, token) => {
    removeAppointment(appointmentId, token)
      .then((response) => {
        console.log(response.data.message);
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment.id !== appointmentId
          )
        );
      })
      .catch((error) => console.log(error));
  };

  const changePageUp = () => {
    setPage(page + 1);
  };

  const changePageDown = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="cards-appointment-container-main">

      <div className="pagination-container row">
        <div className="col">
          <PaginationButton
            classPagination="previous-artist"
            text={"<< Previous"}
            changePagination={() => changePageDown()}
          />

        </div>

        <div className='create-appointment-button-green col'>
          <LinkButton
            classButton={""}
            path={"/create-appointment"}
            title={"CreateAppointment"}
          />
        </div>

        <div className="col">

          <PaginationButton
            classPagination="next-artist "
            text={"Next >>"}
            changePagination={() => changePageUp()}
          />
        </div>

      </div>
      {
        appointments


          ? (
            <div className="cards-appointment-container">
              <div >

                {appointments.map((appointment) => (
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
                ))}
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )
      }
    </div >
  );
};
