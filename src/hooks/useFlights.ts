import {useQuery, UseQueryResult} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

type Props = {
    url: string,
    queryKey: string
};

function useFlights<Flights>(props: Props): UseQueryResult<Flights, Error> {
    async function queryFunction(): Promise<Flights> {
        const result = await axios.get<Flights>(props.url)
            .then((axiosResponse: AxiosResponse<Flights>)=>{
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

    return useQuery<Flights>({
        queryKey: [props.queryKey],
        queryFn: queryFunction,
        refetchOnMount: false
    })
}
export default useFlights