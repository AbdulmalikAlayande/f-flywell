import React, { useState } from "react";
import ReactModal from "react-modal";
import AddNewFlight from "./addNewFlight";
import { adminSideBarButtonData, addNewFlightModalStyle } from "@src/utils/utility.functions";
import ButtonWithIcon from "../../reusables/buttonWithIcon";
import DashboardNavBar from "../../reusables/dashboardNavBar";
import DashBoardSideBar from "../../reusables/dashBoardSideBar";

export default function AllFlights(){
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const buttonDataArray = adminSideBarButtonData();

    function openOrCloseModal(value: boolean){
        setModalIsOpen(value)
    }
    return(
        <div className="All-Flights-Main-Frame">
            <DashBoardSideBar userId={""} buttonData={buttonDataArray}/>
            <div className="All-Flights-Section-2">
                <DashboardNavBar/>
                <div className="All-Flights-Main-Body">
                    <section className="All-Flights-Main-Body-Section-1">
                        <h1>Flights</h1>
                        <div className="All-Flights-Main-Body-Filter-Frame">
                            <p>Filter By: </p>
                            <select>
                                <option>Hello</option>
                                <option>Hello</option>
                                <option>Hello</option>
                                <option>Hello</option>
                                <option>Hello</option>
                            </select>
                        </div>
                    </section>
                    <section className="All-Flights-Main-Body-Section-2">
                        <div className="All-Flights">
                            <ReactModal style={addNewFlightModalStyle} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                                <AddNewFlight modalIsOpen={openOrCloseModal}/>
                            </ReactModal>
                        </div>
                        <ButtonWithIcon 
                            onClick={(event: React.MouseEvent<HTMLButtonElement>)=>{
                                event.preventDefault();
                                setModalIsOpen(true)
                            }}
                            icon="fluent:add-12-regular" buttonPlaceHolder="Add New Flight"/>
                    </section>
                </div>
            </div>
        </div>
    )
}