import { axiosInstance } from "authProvider";

export const getIns =
  () =>
    async (): Promise<[]> => {
      return await axiosInstance
        .get("http://localhost:1337/api/ins?populate=*")
        .then(({ data }) => data.data);
    };

export const updateIn =
  async (data: any): Promise<unknown> => {
    return await axiosInstance.put(`http://localhost:1337/api/ins/${data.id}`, { data: data.attributes }).then(({ data }) => data);
  }