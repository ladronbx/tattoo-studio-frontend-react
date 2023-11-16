
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { GetArtists } from '../GetArtists/GetArtists';
import { UpdateProfile } from '../UpdateProfile/UpdateProfile';
import { Appointments } from '../Appointments/Appointments';
import { CreateAppointment } from '../CreateAppointment/CreateAppointment';
import { UpdateAppointment } from '../UpdateAppointment/UpdateAppointment';
import { GetAllUsers } from '../GetAllUsers/GetAllUsers';
import { GetAllAppointments } from '../GetAllAppointments/GetAllAppointments'
import { Gallery } from '../Gallery/Gallery';

export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>}/>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/artists" element={<GetArtists />}/>
                <Route path="/update" element={<UpdateProfile />}/>
                <Route path="/appointments" element={<Appointments />}/>
                <Route path="/create-appointment" element={<CreateAppointment />}/>
                <Route path="/update-appointment" element={<UpdateAppointment />}/>
                <Route path="/get-all-users" element={<GetAllUsers />}/>
                <Route path="/get-all-appointments" element={<GetAllAppointments />}/>
                <Route path="/gallery" element={<Gallery />}/>
            </Routes>
         </>
     )
}