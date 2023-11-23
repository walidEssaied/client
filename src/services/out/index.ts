import { axiosInstance } from "authProvider";


export const CreateOut =
  async (data: any): Promise<unknown> => {
    return await axiosInstance.post(`https://server-a1ho.onrender.com/api/outs`, { data: data }).then(({ data }) => data);
  }

export const updateOut =
  async (data: any): Promise<unknown> => {
    return await axiosInstance.put(`https://server-a1ho.onrender.com/api/outs/${data.id}`, { data: { is_archive: true } }).then((data) => console.log({ data }));
  }