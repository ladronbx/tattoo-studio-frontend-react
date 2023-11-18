import axios from 'axios'

const BASE_URL = 'http://localhost:4000/user/';

export const logUser = async (body) => {
  return await axios.post(`${BASE_URL}login`, body);
}

export const registerUser = async (body) => {
  return await axios.post(`${BASE_URL}register`, body);
}

export const getArtists = async (page) => {
  return await axios.get(`${BASE_URL}artists?page=${page}&pageSize=6`);
}

export const getServices = async (page) => {
  return await axios.get(`${BASE_URL}services?page=${page}&pageSize=9`);
}

export const getProfile = (rdxToken) => {
  return axios.get(`${BASE_URL}profile`, {
    headers: {
      Authorization: `Bearer ${rdxToken}`,
    },
  });
};

export const updateProfile = (body, rdxToken) => {
  return axios.put(`${BASE_URL}profile/update`, body, {
    headers: {
      Authorization: `Bearer ${rdxToken}`,
    },
  });
};

export const appointmentsUsers = (rdxToken, page) => {
  return axios.get(`${BASE_URL}appointments/get-all-my-appointments?page=${page}&pageSize=8`, {
    headers: {
      Authorization: `Bearer ${rdxToken}`,
    },
  });
}

export const createAppointment = (body, rdxToken) => {
  return axios.post(`${BASE_URL}appointments/create`, body, {
    headers: {
      Authorization: `Bearer ${rdxToken}`,
    },
  });
}

export const updateAppointment = (body, rdxToken) => {
  return axios.put(`${BASE_URL}appointments/update`, body, {
    headers: {
      Authorization: `Bearer ${rdxToken}`,
    },
  });
};

export const getAllUsers = (rdxToken, page) => {
  return axios.get(`${BASE_URL}super/get/all/users?page=${page}&skip=10`, {
    headers: {
      Authorization: `Bearer ${rdxToken}`,
    },
  });
};

export const getAllAppointments = (rdxToken, page) => {
  return axios.get(`${BASE_URL}appointments/all-appointments-calendar?page=${page}&skip=10`, {
    headers: {
      Authorization: `Bearer ${rdxToken}`,
    },
  });
};

export const removeAppointment = async (id, token) => {
  console.log(token);
  return await axios.delete(`${BASE_URL}appointments/delete-my-appointment`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: id,
    },
  });
};