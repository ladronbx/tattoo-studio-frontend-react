import React, { useState, useEffect } from "react";
import "./Appointments.css"
import { CardAppointment } from "../../common/CardAppointment/CardAppointment"
import { appointmentsUsers } from "../../services/apiCalls";

export const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            appointmentsUsers(token)
                .then(response => {
                    console.log(appointments);
                    setAppointments(response.data.data);
                })
                .catch(error => console.log(error));
        }
    }, [appointments]);
console.log(appointments);
    return (
        <div className="card-appointments">
            {
                appointments
                    ? (
                        <div>
                            {appointments.map(appointment => (
                                <CardAppointment
                                    appointmentId={appointment.id}
                                    nameProduct={appointment.name}
                                    imageProduct={appointment.image}
                                    categoryProduct={appointment.category}
                                    email={appointment.email}
                                    artist={appointment.full_name}
                                    date={appointment.date}
                                    shift={appointment.shift}
                                />
                            ))}
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )
            }
        </div>
    );
};
