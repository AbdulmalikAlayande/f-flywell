import React from 'react'
import UseAviationStack, { PaginationParameters } from './useAviationStack'

const FetchAirlines = () => {
    const accessKey = process.env.AVIATION_STACK_ACCESS_KEY;
    const citiesUrl = "http://api.aviationstack.com/v1/airlines";
    const queryKey = ["airlines", "id"]
    const paginationQueries: PaginationParameters = {
        limit: 200,
        count: 200,
        offset: 0,
        total: 9370    
    }
    const {data, isLoading, error} = UseAviationStack(paginationQueries, citiesUrl, queryKey, accessKey)
  return (
    <div>FetchAirlines</div>
  )
}

export default FetchAirlines