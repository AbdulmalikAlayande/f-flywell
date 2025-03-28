
import React, { useCallback, useMemo, useState } from "react";
import { availableFlights } from '@src/utils/placeholder';
import { AvailableFlight } from '@src/views/interfaces/interface';
import { useQuery } from '@tanstack/react-query';
import AvailableFlights from './availableFlights';
import { SearchForm } from './searchForm';
import { FilterSidebar } from './mobile-filter-sidebar'
import { TabNavigation } from './tabNavigation';
import { FlightDetailsSheet } from "./flightDetails";
import { 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const tabs = [

    { id: 1, label: "Recommended", icon: "fa6-solid:thumbs-up" },
    { id: 2, label: "Fastest", icon: "ion:flash-sharp" },
    { id: 3, label: "Cheapest", icon: "mdi:tag" },
];


const NewReservation = () => {

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [flightDetailsViewIsOpen, setFlightDetailsViewIsOpen] = useState<boolean>(false)
    const [checkboxStates, setCheckboxStates] = useState({

        oneWay: false,
        roundTrip: false,
        multiCity: false,
    });
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState<AvailableFlight | null>(null);

    const fetchAvailableFlights = useCallback(async (): Promise<AvailableFlight[]> => {
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(availableFlights);
            }, 1000); 
        });
    }, []);

    const { data, error, isLoading } = useQuery<AvailableFlight[]>({

        queryKey: ["flights"],
        queryFn:fetchAvailableFlights,
        staleTime: 20 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const clearDate = useCallback(() => {

    }, [])

    const filteredFlights = useMemo(() => {
        if (!data) return [];

        switch (activeTab.label) {
            case "Recommended":
                return data.sort((f1, f2) => f1.seatsRemaining - f2.seatsRemaining)
            case "Fastest":
                return data.sort((f1, f2) => {
                    return new Date(f1.departureTime).getTime() - new Date(f2.departureTime).getTime();
                })
            case "Cheapest":
                return data;
            default:
                return data;
        }
    }, [activeTab.label, data]);


    const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        
        const { name, checked } = event.target;
        setCheckboxStates(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }, []);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                Error loading flights
            </div>
        );
    }


    return (
        <div className={'w-full relative'}>
                
            <div className="w-full p-6 lg:p-12 rounded-lg bg-gray-100 dark:bg-[var(--background-color)]">
                
                {/* Search Flight Section */}
                <SearchForm clearDate={clearDate} />

                {/* Travel Type Options */}
                <section className='flex flex-col lg:flex-row items-center gap-10 lg:w-3/4 mt-6'>
                    <div className="flex gap-6">
                        <div className="flex">
                            <input 
                                checked={checkboxStates.oneWay}
                                onChange={handleCheckboxChange}
                                type="radio" name="hs-radio-group" 
                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" 
                                id={"hs-radio-group-1"} 
                            />
                            <label htmlFor="hs-radio-group-1" className="text-sm text-gray-500 ms-2 dark:text-neutral-400">One-Way</label>
                        </div>

                        <div className="flex">
                            <input 
                                checked={checkboxStates.roundTrip}
                                onChange={handleCheckboxChange}
                                type="radio" name="hs-radio-group" 
                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" 
                                id="hs-radio-group-2"
                            />
                            <label htmlFor="hs-radio-group-2" className="text-sm text-gray-500 ms-2 dark:text-neutral-400">Round-Trip</label>
                        </div>

                        <div className="flex">
                            <input 
                                checked={checkboxStates.multiCity}
                                onChange={handleCheckboxChange}
                                type="radio" name="hs-radio-group" 
                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" 
                                id="hs-radio-group-3" 
                            />
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
                <section 
                    className={`
                        relative w-full mt-6 flex flex-col lg:flex-row gap-10 lg:gap-6 
                        min-h-[calc(100vh-300px)] items-center justify-between
                    `}
                >
                    {/* Filter */}
                    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <SheetContent side="left" className="w-[300px]">
                            
                            <SheetHeader>
                                <SheetTitle>Filter Flights</SheetTitle>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-4 right-4"
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </SheetHeader>
                            
                            <FilterSidebar />
                        </SheetContent>
                    </Sheet>


                    {/* Result and Sort */}
                    <div className='flex flex-col flex-grow w-full lg:w-auto max-w-full gap-8'>
                        <div className="sm:hs-overlay-layout-open:ms-64 max-h-15 transition-all duration-300">
                            {/* Navigation Toggle */}
                            <div className="lg:hidden p-2">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-0 left-4"
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                >                                   
                                    <svg className="sm:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m8 9 3 3-3 3"/></svg>
                                    <svg className="hidden sm:block shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m10 15-3-3 3-3"/></svg>
                                </Button>
                            </div>
                            {/* End Navigation Toggle */}
                        </div>
                        <div className='w-full flex justify-start items-center gap-6'>
                            <p className={"dark:text-white font-medium text-gray-500"}>10 of 150 Results</p>
                        </div>
                        {/* Sort */}
                        <TabNavigation
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                onTabSelect={() => filteredFlights}
                        />
                        {/* Result */}
                        <main className="h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                            <AvailableFlights 
                                flights={data ? data : []} 
                                openFlightDetailsViewPage={()=>{
                                    setFlightDetailsViewIsOpen(!flightDetailsViewIsOpen)
                                }}                            />
                        </main>
                    </div>
                </section>
            </div>

            {/* Flight Details View Sidebar */}
            <FlightDetailsSheet 
                flight={selectedFlight} 
                onClose={() => setSelectedFlight(null)} 
            />
        </div>
    )
}

export default NewReservation
