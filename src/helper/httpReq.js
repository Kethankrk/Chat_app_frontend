import axios from "axios";

export const postReq = async (route, data, params = "") => {
  const url = import.meta.env.VITE_URL;
  try {
    const response = (await axios.post(`${url}/${route}/${params}`, data)).data;
    return {
      error: null,
      data: response,
    };
  } catch (e) {
    console.log(e);
    return {
      error: e,
      data: null,
    };
  }
};

export const getReq = async (route, params = "") => {
  const url = import.meta.env.VITE_URL;
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const response = (await axios.get(`${url}/${route}/${params}`, { headers }))
      .data;
    return {
      error: null,
      data: response,
    };
  } catch (e) {
    console.log(
      `Error: ${e.response.statusText}, Status: ${e.response.status}`
    );
    return {
      error: e,
      data: null,
    };
  }
};
