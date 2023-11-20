import React, { useState } from 'react'
import Papa from 'papaparse'
import { UseAirportsQuery } from './useAirportsQuery'
import axios from 'axios'
import { AirlineObject } from './airlineObject'
import "../styles/papaParseCsv.css"

const PapaParseCsv = () => {

  let [jsonFormat, setJsonFormat] = useState<AirlineObject[]>([])

  let { data, error, isLoading } = UseAirportsQuery()

  function parseCsv(e: React.MouseEvent<HTMLButtonElement>){
      if(data){
          Papa.parse<string[]>(data, {
              worker: true,
              complete({ data }){
                  const slicedOutRows: string[][] = data.slice(1, data.length - 1)
                  const headRow: string[] = data[0]
                  convertToJson(slicedOutRows, headRow)
              },
          })
          
      }
  }

  function convertToJson(rows: string[][], header: string[]): AirlineObject[]{
    const jsonArray: AirlineObject[] = [];
    rows.map((row: string[], _index: number) => {
      const obj: AirlineObject = {}
      row.map((elem: string | undefined, index: number)=>{
        const param = header[index] as keyof AirlineObject;
        obj[param] = elem;
      })
      jsonArray.push(obj)

    })   
    setJsonFormat(jsonArray)
    return jsonArray;
  }

  function sendAirportDataToBackend(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    event.preventDefault()
    let button: HTMLButtonElement = event.target as HTMLButtonElement;
    let index: string = button.value
    let selectedAirportObject = jsonFormat[parseInt(index)]
    axios.post("http://localhost:8080/airlines", selectedAirportObject)
    .then((res)=>{
      
    })
    .catch((error)=>{

    })
  }


  return (
    <div className='Main-Frame'>
      <button className={"PapaParse-Read-Csv-Button"} onClick={parseCsv}>PapaParseCsv</button>
      <div className="Aiport-Cards-Frame">
        <ul className='List-Of-Airports'>
          {jsonFormat.map((json, index) => (
              <li key={index} className='Airport'>
                <button value={index} className='Airport-Button'onClick={sendAirportDataToBackend}>
                  <p></p>
                  <h3>{index+1}. {json.name}</h3>
                  <h4>{json.region_name}, {json.country_name}</h4>
                  <p>airport type: {json.type}</p>
                  <p>longitude and lattude: {json.longitude_deg}, {json.latitude_deg}</p>
                </button>
              </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PapaParseCsv