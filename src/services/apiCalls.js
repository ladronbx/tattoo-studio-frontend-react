
import axios from 'axios';

export const connection = async (body) => {
    return await axios.post(`http://localhost:5173/api/user/login`, body);
}


