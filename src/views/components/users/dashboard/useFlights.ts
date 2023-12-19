import {useQuery, UseQueryResult} from "@tanstack/react-query";
import axios from "axios";

type Props = {
    url: string,
    queryKey: string
};

function useFlights<Flight>(props: Props): UseQueryResult<Flight, Error> {

    async function queryFunction(): Promise<Flight> {
        const response = await axios.get<Flight>(props.url);
        console.log("flight data => ", response.data)
        return response.data;
    }

    return useQuery<Flight>({
        queryKey: [props.queryKey],
        queryFn: queryFunction,
        refetchOnMount: false
    })
}
export default useFlights