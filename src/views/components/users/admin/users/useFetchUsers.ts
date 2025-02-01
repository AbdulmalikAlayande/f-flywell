import axios from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";

type Props = {
    url: string,
    queryKey: string
}

export function useFetchUsers<Users>(props: Props): UseQueryResult<Users[]>{
    
    const queryFunction = (): Promise<Users[]> =>{
        console.log("I am Here At Use Fetch Users")
           return axios.get<Users[]>(props.url)
                 .then((response) => {
                     console.log("response data at use fetch users ==> ", response.data)
                     return  response.data;
                 })
        
    }
    
    return useQuery({
        queryKey: [props.queryKey],
        queryFn: queryFunction
    })
}