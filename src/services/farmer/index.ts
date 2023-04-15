import { axiosInstance } from "authProvider";

export const getFarmers =
 () =>
  async (): Promise<[]> => {
   return await axiosInstance
    .get("https://server-a1ho.onrender.com/api/farmers?populate=*")
    .then(({ data }) => data.data);
  };