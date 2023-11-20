import React, { useState } from 'react'
import {AirlineObject} from "./airlineObject"
import axios from 'axios'

export const Read = () => {
    const [file, setFile] = useState<File | undefined>()
    const [fileList, setFileList] = useState<FileList>()
    const [lines, setLines] = useState<String[]>([])
    let [rows, setRows] = useState<String[]>()
    let [jsonFormat, setJsonFormat] = useState<AirlineObject[]>()
    let [jsonObject, setJsonObject] = useState<AirlineObject>()


    async function handleFIleChange(event: React.ChangeEvent<HTMLInputElement>){
        if(event.target.files){
            setFile(event.target.files[0])
            const fileUrl = URL.createObjectURL(event.target.files[0])
            const response = await fetch(fileUrl)
            const text = await response.text()
            const splitLine = text.split("\n")
            setLines(splitLine)
            rows = lines?.slice(2);
            convertToJson()
        }
    }
    

    function convertToJson(){
        const jsonArray: AirlineObject[] = [];

        rows?.forEach((row, index) => {
            let split_row = row.split(",");
            const obj: AirlineObject = {
                id: split_row[0],
                ident: split_row[1],
                type: split_row[2],
                name: split_row[3],
                longitude_deg: split_row[4],
                latitude_deg: split_row[5],
                elevation_ft: split_row[6],
                continent: split_row[7],
                country_name: split_row[8],
                iso_country: split_row[9],
                region_name: split_row[10],
                iso_region: split_row[11],
                local_region: split_row[12],
                municipality: split_row[13],
                scheduled_service: split_row[14],
                gps_code: split_row[15],
                iata_code: split_row[16],
                local_code: split_row[17],
                home_link: split_row[18],
                wikipedia_link: split_row[19],                
                keywords: split_row[20],
                score: split_row[21],
                last_updated: split_row[22],
               
            }
            jsonObject = obj
            jsonArray.push(jsonObject)
        });
        setJsonFormat(jsonArray)
        axios.post("http://localhost:8080/airlines", jsonArray)
            .then((res)=>{

            })
            .catch((error)=>{

            })
        return jsonArray;

    }
    

  return (
    <div>
        <input type={"file"} accept={".csv, .xslx"} onChange={handleFIleChange}/>
            {jsonFormat?.map((row, index)=>(
                <ul style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly'
                }}>
                    <li key={index} style={{fontSize: "20px"}}>
                        <p>id: {row.id}</p>
                        <p>ident: {row.ident}</p>
                        <p>type: {row.type}</p>
                        <p>name: {row.name}</p>
                        <p>latitude_deg: {row.latitude_deg}</p>
                        <p>longitude_deg: {row.longitude_deg}</p>
                        <p>local_region: {row.local_region}</p>
                        <p >local_code: {row.local_code}</p>
                        <p >iso_country: {row.iso_country}</p>
                        <p >{row.iso_region}</p>
                        <p >iso_region: {row.keywords}</p>
                        <p >last_updated: {row.last_updated}</p>
                        <p>municipality: {row.municipality}</p>
                        <p >region_name: {row.region_name}</p>
                        <p> wikipedia_link: {row.wikipedia_link}</p>
                        <p>scheduled_service: {row.scheduled_service}</p>
                        <p>score: {row.score}</p>
                    </li>
                </ul>
            ))}
    </div>
  )
}
