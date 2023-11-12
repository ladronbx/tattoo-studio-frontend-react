
import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { GetServices } from '../GetServices/GetServices';
import { GetArtists } from '../GetArtists/GetArtists';
import { UpdateProfile } from '../UpdateProfile/UpdateProfile';
import { Appointments } from '../Appointments/Appointments';
import { CreateAppointment } from '../CreateAppointment/CreateAppointment';

export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/artists" element={<GetArtists />}/>
                <Route path="/services" element={<GetServices />}/>
                <Route path="/update" element={<UpdateProfile />}/>
                <Route path="/appointments" element={<Appointments />}/>
                <Route path="/create-appointment" element={<CreateAppointment />}/>
            </Routes>
         </>
     )
}