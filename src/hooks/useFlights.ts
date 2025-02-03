import {useQuery, UseQueryResult} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

type Props = {
    url: string,
    queryKey: string
};

function useFlights<Flight>(props: Props): UseQueryResult<Flight, Error> {
    async function queryFunction(): Promise<Flight> {
        const result = await axios.get<Flight>(props.url)
            .then((axiosResponse: AxiosResponse<Flight>)=>{
                console.log("flight data => ", axiosResponse.data)
                return axiosResponse.data
            }).catch((error)=>{
                console.log(error.message)
                return error
            })
        if (result)
            return result;
        throw new Error(result.message);
    }

    return useQuery<Flight>({
        queryKey: [props.queryKey],
        queryFn: queryFunction,
        refetchOnMount: false
    })
}
export default useFlights