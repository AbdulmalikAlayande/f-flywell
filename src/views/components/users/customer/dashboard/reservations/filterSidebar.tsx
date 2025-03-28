import React from 'react';
import PriceRangeSlider from './priceRangeSlider';
import { Slider } from '@/components/ui/slider';

export const FilterSidebar = React.memo(() => {
    
    const [durationInSec, setDurationInSec] = React.useState<number>(4500)
    
    function formatToHour(duration: number ): string{
        return "3hrs20min"
    }

    function resetDurationInSec(){

    }

    return (
        
        <aside 
            id="hs-sidebar-content-push" 
            className={`
                hidden lg:block w-full h-full max-w-62 [--auto-close:md] lg:translate-x-0 lg:end-auto lg:bottom-0 
                transition-all duration-300 transform top-0 start-0 bottom-0 z-[60] lg:top-4
                flex-shrink-0 rounded-xl`
            }
            role="dialog" 
            tabIndex={-1}
            aria-label="Sidebar"
        >
            
            {/* Header */}
            <header className="lg:hidden -me-2 p-4 flex justify-between items-center gap-x-2">
                
                <div className="h-15 w-15">
                    
                    {/* Close Button */}
                    <button type="button" className="flex justify-center items-center gap-x-3 size-6 dark:bg-white focus:bg-gray-100 bg-neutral-800 border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:text-neutral-200" data-hs-overlay="#hs-sidebar-content-push">
                        
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        <span className="sr-only">Close</span>
                    </button>
                </div>
            </header>
            
            {/* Body */}
            <div className="relative w-full md:flex flex-col gap-4">
                
                <div className="flex">
                    <h5 className="dark:text-white font-medium">Filter By</h5>
                </div>
                
                {/* Stop Filters */}
                <div className="bg-white dark:bg-[#202A3A] text-base flex flex-col items-center gap-4 p-4 rounded-2xl">
                    
                    <div className="flex items-center justify-between w-full">
                        <p className="dark:text-white">Stop</p>
                        <button type="reset" className="inline-flex items-center font-medium rounded-lg border border-transparent cursor-pointer text-[#2563eb] hover:text-blue-700 focus:outline-none focus:bg-blue-100 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none">
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
    
                {/* Time Filters */}
                <div className="bg-white dark:bg-[#202A3A] w-full text-base flex flex-col items-center gap-4 rounded-2xl p-4">
                    
                    <div className="flex items-center justify-between w-full">
                        <p className="dark:text-white">Time</p>
                        <button type="reset" className="inline-flex items-center font-medium rounded-lg border border-transparent cursor-pointer text-[#2563eb] hover:text-blue-700 focus:outline-none focus:bg-blue-100 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none">
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
                
                {/* Price Range Slider */}
                <div className="bg-white dark:bg-[#202A3A] w-full text-base flex flex-col items-center gap-4 rounded-2xl p-4">
                    <PriceRangeSlider />
                </div>

                {/*Flight Duration Filter*/}
                <div className={"bg-white dark:bg-[#202A3A] w-full text-base flex flex-col items-center gap-4 rounded-2xl p-4"}>
                    <div className={"flex items-center justify-between w-full"}>  
                        <p className="dark:text-white text-sm md:text-[16px]">Flight Duration</p>
                        <button type="reset" className="inline-flex items-center font-medium rounded-lg border border-transparent cursor-pointer text-[#2563eb] hover:text-blue-700 focus:outline-none focus:bg-blue-100 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none">
                            Reset
                        </button>
                    </div>
                    <Slider onChange={resetDurationInSec}/>
                    <div>
                        <p>{formatToHour(durationInSec)}</p>
                    </div>
                </div>
            </div>                
        </aside>
    );
  });