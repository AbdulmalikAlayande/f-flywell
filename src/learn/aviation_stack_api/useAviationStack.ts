import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { CitiesData } from "./fetchCities";
import "react-toastify/dist/ReactToastify.css";


export interface PaginationParameters{
  limit: number,
  offset?: number,
  count?: number,
  total?: number
}

const UseAviationStack = (parameter: PaginationParameters, url: string, queryKey: string[], accessKey?: string) => {

  async function queryFunction(): Promise<void | CitiesData>{
    try {
      const response = await axios.get<CitiesData>(url,{params:{accessKey, parameter}});
      toast.success("Query Successful", {
        autoClose: 5000,
        pauseOnHover: false,
        position: toast.POSITION.TOP_CENTER,
        className: "Toast-Message",
      });
      return response.data;
    }
    catch (error: any) {
      toast.info(error.message, {
        autoClose: 5000,
        pauseOnHover: false,
        position: toast.POSITION.TOP_CENTER,
        className: "Toast-Message",
      });
    }
  }

  return useQuery<void | CitiesData>({
    queryKey: queryKey,
    queryFn: queryFunction
  });
}

export default UseAviationStack;
