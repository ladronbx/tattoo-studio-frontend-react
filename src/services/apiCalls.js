import axios from "axios";

export const connection = async (body) => {
    return await axios.post(`http://localhost:4000/user/login`, body);

}