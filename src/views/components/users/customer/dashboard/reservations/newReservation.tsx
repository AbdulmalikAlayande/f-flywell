import DatePicker2 from '@src/views/landingPage/datePicker2'
import PriceRangeSlider from './priceRangeSlider'
import { Icon } from '@iconify-icon/react'
import { motion } from "framer-motion";
import { useState } from "react";
import { availableFlights } from '@src/utils/placeholder';
import AvailableFlightCard from './availableFlightCard';


const tabs = [
  { id: 1, label: "Recommended", icon: "fa6-solid:thumbs-up" },
  { id: 2, label: "Fastest", icon: "ion:flash-sharp" },
  { id: 3, label: "Cheapest", icon: "mdi:tag" },
];

const NewReservation = () => {

    const [activeTab, setActiveTab] = useState(tabs[0]);
    
    function clearDate(){
    }

    return (
        <div className="w-full p-6 lg:p-12 rounded-lg bg-gray-100 dark:bg-[var(--background-color)]">
            {/* Search Flight Section */}
            <section className="space-6 md:w-9/10 lg:w-5/6 md:h-10 flex flex-col md:flex-row items-center justify-evenly gap-4">
                <div className="relative max-w-lg mx-auto flex gap-4 items-center">
                    <div className="relative max-w-sm h-full">
                        <input className="peer py-3 px-4 pl-12 block h-full w-full bg-gray-50 border border-gray-300 rounded-xl text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="From" />
                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43l-1.93.51l4.14 7.17l-4.97 1.33l-1.97-1.54l-1.45.39l2.59 4.49L21 11.49c.81-.23 1.28-1.05 1.07-1.85"></path>
                            </svg>                        
                        </div>
                    </div>
                    <div className="absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-[#2563eb] shadow-md">
                        <svg className="block" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 48 48">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m10 8l-6 6l6 6m28 8l6 6l-6 6M4 14h40M4 34h40"></path>
                        </svg>
                    </div>
                    <div className="relative max-w-sm h-full">
                        <input className="peer py-3 px-4 pl-12 block h-full w-full bg-gray-50 border border-gray-300 rounded-xl text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="To" />
                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M2.5 19h19v2h-19zm16.84-3.15c.8.21 1.62-.26 1.84-1.06c.21-.8-.26-1.62-1.06-1.84l-5.31-1.42l-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32l-1.45-.39v5.17z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                {/* Date section */}
                <div className="h-full max-w-lg flex items-center justify-center space-x-3">
                    <DatePicker2 onClear={clearDate} label={''} minDate={undefined} maxDate={undefined} />
                    <DatePicker2 onClear={clearDate} label={''} minDate={undefined} maxDate={undefined} />
                </div>
                {/* Travelers Section */}
                <div className="relative max-w-sm h-full">
                    <input type="number" className="peer py-3 px-4 pl-12 block w-full h-full bg-gray-50 border border-gray-300 rounded-xl text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Passengers"/>
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M17.755 14a2.25 2.25 0 0 1 2.248 2.25v.918a2.75 2.75 0 0 1-.512 1.598c-1.546 2.164-4.07 3.235-7.49 3.235c-3.422 0-5.945-1.072-7.487-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.25 2.25 0 0 1 6.253 14zM12 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10"></path>
                        </svg>
                    </div>
                </div>
                {/* Submit Button */}
                <button type="submit" className="h-full py-3 px-6 inline-flex items-center gap-x-2 text-sm font-medium cursor-pointer rounded-xl border border-transparent text-white bg-[#2563eb] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"></path>
                    </svg>
                    Search  
                </button>

            </section>
            {/* Search Option */}
            <section className='flex flex-col lg:flex-row items-center gap-10 lg:w-3/4 mt-6'>
                <div className="flex gap-6">
                    <div className="flex">
                        <input type="radio" name="hs-radio-group" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-group-1" checked />
                        <label htmlFor="hs-radio-group-1" className="text-sm text-gray-500 ms-2 dark:text-neutral-400">One-Way</label>
                    </div>

                    <div className="flex">
                        <input type="radio" name="hs-radio-group" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-group-2" />
                        <label htmlFor="hs-radio-group-2" className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Round-Trip</label>
                    </div>

                    <div className="flex">
                        <input type="radio" name="hs-radio-group" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-group-3" />
                        <label htmlFor="hs-radio-group-3" className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Multi-City</label>
                    </div>
                </div>
                <div className="flex h-10 rounded-lg gap-6">
            
                    <button type="button" className="py-3 px-4 inline-flex items-center text-center gap-x-2 -mt-px -ms-px rounded-xl text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-400 focus:outline-none focus:bg-[#2563eb] focus:text-white disabled:opacity-50 disabled:pointer-events-none dark:bg-[#202A3A] dark:border-neutral-700 dark:text-white">
                        Economy
                    </button>
                    <button type="button" className="py-3 px-4 inline-flex items-center text-center gap-x-2 -mt-px -ms-px rounded-xl text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-400 focus:outline-none focus:bg-[#2563eb] focus:text-white disabled:opacity-50 disabled:pointer-events-none dark:bg-[#202A3A] dark:border-neutral-700 dark:text-white">
                        Business Class
                    </button>
                    <button type="button" className="py-3 px-4 inline-flex items-center text-center gap-x-2 -mt-px -ms-px rounded-xl text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-400 focus:outline-none focus:bg-[#2563eb] focus:text-white disabled:opacity-50 disabled:pointer-events-none dark:bg-[#202A3A] dark:border-neutral-700 dark:text-white">
                        First Class
                    </button>
                </div>
            </section>
            {/* Filter, Sort  and Result */}
            <section className='w-full mt-6 flex items-center justify-between gap-8'>
                {/* Filter */}
                <aside 
                    id="hs-sidebar-content-push" 
                    className={`
                        hidden hs-overlay [--auto-close:md] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 max-w-65
                        hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform h-full top-0 
                        start-0 bottom-0 z-[60]
                    `}
                    role="dialog" 
                    tabIndex={-1 }
                    aria-label="Sidebar"
                >
                    {/* Header */}
                    <header className="p-4 flex justify-between items-center gap-x-2">
                        <div className="lg:hidden -me-2 bg-green-300 h-15 w-15">
                            {/* Close Button */}
                            <button type="button" className="flex justify-center items-center gap-x-3 size-6 dark:bg-white focus:bg-gray-100 bg-neutral-800 border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:text-neutral-200" data-hs-overlay="#hs-sidebar-content-push">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                <span className="sr-only">Close</span>
                            </button>
                            {/* End Close Button  */}
                        </div>
                    </header>
                    {/* End Header */}
                    <div className={'relative w-full md:flex flex-col gap-4'}>
                        <div className="flex gap-6">
                            <h5 className='dark:text-white font-medium'>Filter By</h5>
                        </div>
                        <div className='bg-white dark:bg-[#202A3A] text-base flex flex-col items-center gap-4 p-4 rounded-2xl'>
                            <div className='flex items-center justify-between w-full'>
                                <p className={'dark:text-white'}>Stop</p>
                                <button type={"reset"} className={'inline-flex items-center font-medium rounded-lg border border-transparent cursor-pointer text-[#2563eb] hover:text-blue-700 focus:outline-none focus:bg-blue-100 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none'}>
                                    Reset
                                </button>
                            </div>
                            <div className="flex flex-col gap-y-6 w-full">
                                <div className="flex">
                                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-1" />
                                    <label htmlFor="hs-checkbox-group-1" className="text-sm ms-3 dark:text-neutral-400">Direct</label>
                                </div>

                                <div className="flex">
                                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-2" />
                                    <label htmlFor="hs-checkbox-group-2" className="text-sm ms-3 dark:text-neutral-400">1 Stop</label>
                                </div>

                                <div className="flex">
                                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-3" />
                                    <label htmlFor="hs-checkbox-group-3" className="text-sm ms-3 dark:text-neutral-400">2+ Stops</label>
                                </div>
                            </div>

                        </div>
                        <div className='bg-white dark:bg-[#202A3A] w-full text-base flex flex-col items-center gap-4 rounded-2xl p-4'>
                            <div className='flex items-center justify-between w-full'>
                                <p className={"dark:text-white"}>Time</p>
                                <button type={"reset"} className={'inline-flex items-center font-medium rounded-lg border border-transparent cursor-pointer text-[#2563eb] hover:text-blue-700 focus:outline-none focus:bg-blue-100 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none'}>
                                    Reset
                                </button>
                            </div>

                            <div className="flex flex-col gap-y-6 w-full">
                                <div className="flex">
                                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-lg text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-4" />
                                    <label htmlFor="hs-checkbox-group-4" className="text-sm ms-3 dark:text-neutral-400">Morning (6:00 AM - 12:00 PM)</label>
                                </div>

                                <div className="flex">
                                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-lg text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-5" />
                                    <label htmlFor="hs-checkbox-group-5" className="text-sm ms-3 dark:text-neutral-400">Afternoon (12:00 PM - 6:00 PM)</label>
                                </div>
                                <div className="flex">
                                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-lg text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-6" />
                                    <label htmlFor="hs-checkbox-group-6" className="text-sm ms-3 dark:text-neutral-400">Evening (6:00 PM - 12:00 AM)</label>
                                </div>
                                <div className="flex">
                                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded-lg text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checkbox-group-7" />
                                    <label htmlFor="hs-checkbox-group-7" className="text-sm ms-3 dark:text-neutral-400">Night (12:00 AM - 6:00 AM)</label>
                                </div>
                            </div>
                        </div>
                        <div className={"bg-white dark:bg-[#202A3A] w-full text-base flex flex-col items-center gap-4 rounded-2xl p-4"}>
                            <PriceRangeSlider />
                        </div>

                    </div>                
                </aside>
                {/* Result and Sort */}
                
                <div className='flex flex-col w-screen max-w-full gap-4'>
                    <div className="sm:hs-overlay-layout-open:ms-64 max-h-15 transition-all duration-300">
                        {/* Navigation Toggle */}
                        <div className="lg:hidden p-2">
                            <button type="button" className="flex justify-center items-center gap-x-3 size-8 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:text-neutral-200" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-sidebar-content-push" aria-label="Toggle navigation" data-hs-overlay="#hs-sidebar-content-push">
                            <svg className="sm:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m8 9 3 3-3 3"/></svg>
                            <svg className="hidden sm:block shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m10 15-3-3 3-3"/></svg>
                            <span className="sr-only">Navigation Toggle</span>
                            </button>
                        </div>
                        {/* End Navigation Toggle */}
                    </div>
                    <div className='w-full flex justify-start items-center gap-6'>
                        <p className={"dark:text-white font-medium text-gray-500"}>10 of 150 Results</p>
                    </div>
                    {/* Sort */}
                    <nav className="flex items-center h-20 w-full bg-white dark:bg-[#202A3A] font-medium rounded-2xl" aria-label="Sort Tabs" role="sort-tablist" aria-orientation="horizontal">
                        <ul className="relative list-none h-full w-full lg:w-1/2 flex items-center justify-start overflow-x-auto">
                            {tabs.map((tab, index) => (
                                <motion.li 
                                    key={tab.id} 
                                    className={`flex flex-col md:flex-row items-center gap-4 px-4 pt-4 md:pt-0 w-full h-full relative cursor-pointer select-none text-[#0f1115]`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    <Icon icon={tab.icon} />
                                    <p className="whitespace-nowrap">{tab.label}</p>
                                    {tab === activeTab ? (
                                        <motion.span
                                            className={`ml-2 md:mr-0 ${index === 0 && 'rounded-l-xl'} ${index === tabs.length - 1 && 'rounded-r-xl'} absolute bg-[#2563eb] bottom-0 left-0 right-0 h-1`} 
                                            layoutId="underline"
                                            id="underline"
                                        />
                                    ) : null}
                                </motion.li>
                            ))}
                        </ul>
                    </nav>
                    {/* Result */}
                    <main className={'w-full'}>
                        <ul className={"w-full flex flex-col gap-4 md:gap-6"}>
                            {availableFlights.map((flight, index) => (
                                <li 
                                    className={`
                                        w-full items-center bg-white border border-gray-200 text-gray-800 
                                        rounded-2xl dark:bg-[#] dark:border-neutral-700 dark:text-white
                                    `}
                                >
                                    <AvailableFlightCard 
                                        key={index}
                                        {...flight}
                                        badge={{
                                            refundable: "partially",
                                            sortOption: "recommended"
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </main>
                </div>
            </section>
        </div>
    )
}

export default NewReservation