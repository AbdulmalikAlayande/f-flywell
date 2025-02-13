import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

type Props = {
    queryKey: string[],
}


export function useFetchCities<T>(params:Props) {
    async function queryFunction():Promise<T> {
        return await axios.get<T>('https://countriesnow.space/api/v0.1/countries')
                        .then((response) => {
                            return response.data
                        })
    }
    
    return useQuery({
        queryKey: params.queryKey,
        queryFn: queryFunction        
    })
}

