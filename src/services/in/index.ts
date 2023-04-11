import { axiosInstance } from "authProvider";

export const getIns =
  () =>
    async (): Promise<[]> => {
      return await axiosInstance
        .get("https://server-a1ho.onrender.com/api/ins?populate=*")
        .then(({ data }) => data.data);
    };


export const CreateIn =
  async (data: any): Promise<unknown> => {
    return await axiosInstance.post(`https://server-a1ho.onrender.com/api/ins`, { data: data }).then(({ data }) => data);
  }

export const updateIn =
  async (data: any): Promise<unknown> => {
    return await axiosInstance.put(`https://server-a1ho.onrender.com/api/ins/${data.id}`, { data: data.attributes }).then(({ data }) => data);
  }