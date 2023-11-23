import { axiosInstance } from "authProvider";


export const CreateOut =
  async (data: any): Promise<unknown> => {
    return await axiosInstance.post(`http://localhost:1337/api/outs`, { data: data }).then(({ data }) => data);
  }

export const updateOut =
  async (data: any): Promise<unknown> => {
    return await axiosInstance.put(`http://localhost:1337/api/outs/${data.id}`, { data: { is_archive: true } }).then((data) => console.log({ data }));
  }