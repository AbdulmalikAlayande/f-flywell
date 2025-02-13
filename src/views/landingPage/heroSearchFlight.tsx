import { FaBriefcase, FaLocationDot } from "react-icons/fa6";
import { BiSolidTimeFive, BiSolidPlaneAlt } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import {availableFlights} from "@utils/placeholder"
import ButtonWithIcon from "../components/reusables/buttonWithIcon";
import DatePicker2 from "./datePicker2";
import { addYears } from "date-fns";
import Logger from "@src/utils/logger";


const HeroSearchFlight = () => {
    
    const selectOptionConfig: object = {
        icon: "",
        src: "",
        alt: "",
    }
    const selectConfig: object = {
        hasSearch: true,
        searchPlaceholder: "Search...",
        searchClasses:
          "block w-full text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-2 px-3",
        searchWrapperClasses: "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
        placeholder: "Search Flight...",
        toggleTag: `<button type="button" aria-expanded="false">
                      <span class="me-2" data-icon></span>
                      <span class="text-gray-800 dark:text-neutral-200" data-title></span>
                    </button>`,
        toggleClasses:
          "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full h-12 cursor-pointer bg-gray-100 dark:bg-gray-700 border-b-2 border-b-[#2563eb] rounded-t-sm text-start text-sm focus:outline-none dark:text-neutral-400 dark:focus:outline-none",
        dropdownClasses:
          "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto dark:bg-neutral-900 dark:border-neutral-700",
        optionClasses:
          "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
        optionTemplate: `<div class="flex items-center">
                          <div class="me-2" data-icon></div>
                          <div class="text-gray-800 dark:text-neutral-200" data-title></div>
                        </div>`,
        extraMarkup: `<div class="absolute top-1/2 end-3 -translate-y-1/2">
                        <svg class="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>
                        </svg>
                      </div>`,
    };

    function onClearDate(value?: object | null) {
        Logger.info("onClear date, value is: "+value)
        throw new Error("Function not implemented.");
    }
    
    return (
        <div className="w-full md:flex rounded-lg">
                <div className={"relative border border-gray-200 transform transition-y-[10px] w-full h-full flex flex-col gap-4 max-w-screen-xl mx-auto shadow-2xl rounded-xl pb-4"}>
                    <div className="w-full h-15 rounded-lg grid grid-cols-2 md:grid-cols-4 items-center max-w-screen-xl mx-auto text-sm/6 md:text-lg/8">
                        <ButtonWithIcon 
                            icon={<BiSolidPlaneAlt />} 
                            className={"w-full h-full flex items-center justify-center gap-2 md:gap-4 rounded-tl-lg md:rounded-tl-xl bg-[#2563eb] dark:bg-gray-100 focus:bg-gray-100 dark:focus:bg-[#2563eb] text-gray-100 dark:text-[#2563eb] focus:text-[#2563eb] dark:focus:text-gray-100"} 
                            buttonPlaceHolder={"Make Reservation"} 
                        />
                        <ButtonWithIcon 
                            icon={<FaBriefcase />} 
                            className={"w-full h-full flex items-center justify-center gap-2 md:gap-4 bg-[#2563eb] dark:bg-gray-100 focus:bg-gray-100 dark:focus:bg-[#2563eb] text-gray-100 dark:text-[#2563eb] focus:text-[#2563eb] dark:focus:text-gray-100"} 
                            buttonPlaceHolder={"Packages"} 
                        />
                        <ButtonWithIcon 
                            icon={<FaLocationDot />} 
                            className={"w-full h-full flex items-center justify-center gap-2 md:gap-4 bg-[#2563eb] dark:bg-gray-100 focus:bg-gray-100 dark:focus:bg-[#2563eb] text-gray-100 dark:text-[#2563eb] focus:text-[#2563eb] dark:focus:text-gray-100"} 
                            buttonPlaceHolder={"Check In"} 
                        />
                        <ButtonWithIcon 
                            icon={<BiSolidTimeFive />} 
                            className={"w-full h-full flex items-center justify-center gap-2 md:gap-4 md:rounded-tr-xl bg-[#2563eb] dark:bg-gray-100 focus:bg-gray-100 dark:focus:bg-[#2563eb] text-gray-100 dark:text-[#2563eb] focus:text-[#2563eb] dark:focus:text-gray-100"} 
                            buttonPlaceHolder={"Flight Status"} 
                        />
                    </div>
                    
                    <div className="w-full flex flex-col md:flex-row justify-evenly gap-2 max-w-screen-xl mx-auto px-6">
                        <div className="w-full h-full">
                            <label htmlFor={""} className={"text-gray-900 dark:text-gray-100"}>From</label>
                            <select id={""} 
                                data-hs-select={JSON.stringify(selectConfig)} 
                                className={`hidden`}
                            >
                                {availableFlights.map((flight) => (
                                    <>
                                        <option value="">Select a location</option>
                                        <option
                                            key={flight.publicId}
                                            data-hs-select-option={JSON.stringify(selectOptionConfig)}
                                        >
                                        </option>
                                    </>
                                ))}
                            </select>
                        </div>
                        <div className="w-full h-full">
                            <label htmlFor={""} className={"text-gray-900 dark:text-gray-100"}>To</label>
                            <select id={""} 
                                data-hs-select={JSON.stringify(selectConfig)} 
                                className={`hidden`}
                            >
                                {availableFlights.map((flight) => (
                                    <option
                                        key={flight.publicId}
                                        data-hs-select-option={JSON.stringify(selectOptionConfig)}
                                    >
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full h-full">
                            <label htmlFor={""} className={"text-gray-900 dark:text-gray-100"} >Departure Date</label>
                            <DatePicker2 onClear={onClearDate} label={"Click..."} minDate={new Date()} maxDate={addYears(new Date(), 1)} />
                        </div>
                        <div className="w-full h-full">
                            <label htmlFor={""} className={"text-gray-900 dark:text-gray-100"}>Passengers</label>
                            <select id={""} 
                                data-hs-select={JSON.stringify(selectConfig)} 
                                className={`hidden`}
                            >
                                {availableFlights.map((flight) => (
                                    <option
                                        key={flight.publicId}
                                        data-hs-select-option={JSON.stringify(selectOptionConfig)}
                                    >
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Search */}
                    <div className={"w-full h-10 max-w-screen-xl mx-auto px-6 flex items-center justify-end text-sm/6 md:text-lg/8"}>
                        <ButtonWithIcon 
                            icon={<MdSearch size={25}/>} 
                            buttonPlaceHolder="Search"
                            className={"w-30 h-full flex items-center justify-center gap-2 md:gap-4 rounded-lg md:rounded-tr-xl bg-[#2563eb] focus:bg-gray-100 text-gray-100 focus:text-[#2563eb]"}
                        />
                    </div>
                </div>
            </div>
    )
}

export default HeroSearchFlight

