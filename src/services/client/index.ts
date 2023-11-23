import { axiosInstance } from "authProvider";

export const getClients =
  () =>
    async (): Promise<[]> => {
      return await axiosInstance
        .get("https://server-a1ho.onrender.com/api/clients?populate=*")
        .then(({ data }) => data.data);
    };