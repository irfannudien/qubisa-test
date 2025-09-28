import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://lmsapi.qubisa.com/v1/testing",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAPI = {
  login: async (email: string, password: string) => {
    const res = await axiosClient.post("/login", { email, password });
    return res.data;
  },
};

export const homeAPI = {
  getHomeData: async () => {
    const res = await axiosClient.get("/home");
    return res.data;
  },
};
