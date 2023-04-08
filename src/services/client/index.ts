import { axiosInstance } from "authProvider";

export const getClients =
  () =>
    async (): Promise<[]> => {
      return await axiosInstance
        .get("http://localhost:1337/api/clients?populate=*")
        .then(({ data }) => data.data);
    };