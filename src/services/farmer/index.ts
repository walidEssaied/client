import { axiosInstance } from "authProvider";

export const getFarmers =
 () =>
  async (): Promise<[]> => {
   return await axiosInstance
    .get("http://localhost:1337/api/farmers?populate=*")
    .then(({ data }) => data.data);
  };