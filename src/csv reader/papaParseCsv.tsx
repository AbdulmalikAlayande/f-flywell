import React from 'react'
import Papa from 'papaparse'
import { UseAirportsQuery } from './useAirportsQuery'

const PapaParseCsv = () => {

    let { data, error, isLoading } = UseAirportsQuery()

    function parseCsv(e: React.MouseEvent<HTMLButtonElement>): string[]{
        if(data){
            Papa.parse<string>(data, {
                worker: true, // use a web worker so that the page doesn't hang up
                complete({ data }) {
                    console.log("parsed data ==> ", data)  
                },
              })
        }
        return [""]
    }


  return (
    <div><button onClick={parseCsv}>PapaParseCsv</button></div>
  )
}

export default PapaParseCsv