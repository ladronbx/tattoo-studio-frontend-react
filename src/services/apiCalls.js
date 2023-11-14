import axios from 'axios';

const BASE_URL = 'http://localhost:4000/user/';

export const logUser = async (body) => {
  return await axios.post(`${BASE_URL}login`, body);
}

export const registerUser = async (body) => {
  return await axios.post(`${BASE_URL}register`, body);
}

export const getArtists = async () => {
  return await axios.get(`${BASE_URL}artists`);
}
export const getServices = async () => {
  return await axios.get(`${BASE_URL}services`);
}

export const getProfile = (token) => {
  return axios.get(`${BASE_URL}profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = (body, token) => {
  return axios.put(`${BASE_URL}profile/update`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const appointmentsUsers = (token) => {
  return axios.get(`${BASE_URL}appointments/get-all-my-appointments?page=2&skip=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const createAppointment = (body, token) => {
  return axios.post(`${BASE_URL}appointments/create`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const updateAppointment = (body, token) => {
  return axios.put(`${BASE_URL}appointments/update`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllUsers = (token) => {
  return axios.get(`${BASE_URL}super/get/all/users?page=1&skip=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllAppointments = (token) => {
  return axios.get(`${BASE_URL}appointments/all-appointments-calendar?page=1&skip=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
