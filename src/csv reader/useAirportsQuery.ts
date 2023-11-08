import axios from 'axios'
import { useQuery } from "@tanstack/react-query";


export const UseAirportsQuery = () => {
    const queryFuntion=()=>axios.get("https://ourairports.com/countries/NG/airports.csv")
                                .then((res): string => res.data)
                                .catch((error) => {
                                    const params = {
                                        title: "An Error Occured!",
                                        message: error.message
                                    }
                                })

  return useQuery({
    queryKey: ["id, name"],
    queryFn: queryFuntion
})
}
