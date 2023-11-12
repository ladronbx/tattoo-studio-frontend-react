import axios from "axios";

export const login = async (body) => {
  return await axios.post(`http://localhost:4000/user/login`, body);

}
export const registerUser = async (body) => {
  return await axios.post(`http://localhost:4000/user/register`, body);

}

export const getArtists = async () => {
  return await axios.get(`http://localhost:4000/user/artists`);

}

export const getProfile = (token) => {
  return axios.get("http://localhost:4000/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = (body, token) => {
  return axios.put("http://localhost:4000/user/profile/update", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const appointmentsUsers = (token) => {
  return axios.get("http://localhost:4000/user/appointments/get-all-my-appointments?page=1&skip=10", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const createAppointment = (body, token) => {
  return axios.post("http://localhost:4000/user/appointments/create", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}