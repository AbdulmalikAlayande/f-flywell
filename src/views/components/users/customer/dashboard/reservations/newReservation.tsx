
import { useCallback, useState } from "react";
import { availableFlights } from '@src/utils/placeholder';
import { AvailableFlight } from '@src/views/interfaces/interface';
import { useQuery } from '@tanstack/react-query';
import AvailableFlights from './availableFlights';
import { SearchForm } from './searchForm';
import { FilterSidebar } from './filterSidebar';
import { TabNavigation } from './tabNavigation';


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

    const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        
        const { name, checked } = event.target;
        setCheckboxStates(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading flights</div>;
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
                    <FilterSidebar />

                    {/* Result and Sort */}
                    <div className='flex flex-col flex-grow w-full lg:w-auto max-w-full gap-4'>
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
                        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
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
            <div className={`
                hidden absolute h-full z-100 left-0 top-0 overflow-y-hidden duration-300 ease-linear
                ${flightDetailsViewIsOpen && 'translate-x-[2/5]'}
            `}>

            </div>
        </div>
    )
}

export default NewReservation
