import axios from 'axios'
import { useQuery } from "@tanstack/react-query";


export const UseAirportsQuery = () => {
    const queryFuntion=()=>axios.get("https://ourairports.com/countries/NG/airports.csv")
                                .then((res): string => res.data)

    return useQuery<string, Error>({
        queryKey: ["id, name"],
        queryFn: queryFuntion
    })
}
