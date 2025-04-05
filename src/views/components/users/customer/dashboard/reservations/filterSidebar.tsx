import React, { useState, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { FlightSearchFilter, StopFilter, TimeFilter } from '@/views/interfaces/interface';

type FilterSidebarProps = {
    applyFilters(filter: FlightSearchFilter): void;
}
export const FilterSidebar = React.memo<FilterSidebarProps>((props) => {

    const [durationInSec, setDurationInSec] = useState<number>(4500);

    const [priceRange, setPriceRange] = useState<[number, number]>([250, 750]);

    const [stopFilters, setStopFilters] = useState<StopFilter>({
        direct: false,
        oneStop: false,
        multiStop: false
    });

    const [timeFilters, setTimeFilters] = useState<TimeFilter>({
        morning: false,
        afternoon: false,
        evening: false,
        night: false
    });

    function formatToHour(durationSec: number): string {
        const hours = Math.floor(durationSec / 3600);
        const minutes = Math.floor((durationSec % 3600) / 60);
        return `${hours}hrs${minutes > 0 ? ` ${minutes}min` : ''}`;
    }

    function resetDurationFilter() {
        setDurationInSec(4500); // Reset to default
    }

    function resetPriceRange() {
        setPriceRange([250, 750]); // Reset to default
    }

    function resetStopFilters() {
        setStopFilters({
            direct: false,
            oneStop: false,
            multiStop: false
        });
    }

    function resetTimeFilters() {
        setTimeFilters({
            morning: false,
            afternoon: false,
            evening: false,
            night: false
        });
    }

    const handleStopFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        if (id === "direct-filter") {
            setStopFilters(prev => ({ ...prev, direct: checked }));
        } else if (id === "one-stop-filter") {
            setStopFilters(prev => ({ ...prev, oneStop: checked }));
        } else if (id === "multi-stop-filter") {
            setStopFilters(prev => ({ ...prev, multiStop: checked }));
        }
    }, []);

    const handleTimeFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        if (id === "morning-filter") {
            setTimeFilters(prev => ({ ...prev, morning: checked }));
        } else if (id === "afternoon-filter") {
            setTimeFilters(prev => ({ ...prev, afternoon: checked }));
        } else if (id === "evening-filter") {
            setTimeFilters(prev => ({ ...prev, evening: checked }));
        } else if (id === "night-filter") {
            setTimeFilters(prev => ({ ...prev, night: checked }));
        }
    }, []);

    const handleDurationChange = useCallback((value: number[]) => {
        setDurationInSec(value[0]);
    }, []);

    const handlePriceRangeChange = useCallback((value: number[]) => {
        setPriceRange([value[0], value[1]]);
    }, []);

    function applyFilters(){
        const filter: FlightSearchFilter = {
            stops: stopFilters,
            time: timeFilters,
            duration: durationInSec,
            priceRange: {min: priceRange[0], max: priceRange[1]}
        };
        props.applyFilters(filter);
    }

    return (
        <aside 
            id="filter-sidebar" 
            className="hidden lg:block w-full h-full max-w-62 lg:translate-x-0 lg:end-auto lg:bottom-0 
                transition-all duration-300 transform top-0 start-0 bottom-0 z-[60] lg:top-4
                flex-shrink-0"
            role="complementary" 
            aria-label="Filter options"
        >
            <div className="relative w-full flex flex-col gap-4">
                <div className="flex">
                    <h5 className="dark:text-white font-medium">Filter By</h5>
                </div>
                
                {/* Stop Filters */}
                <div className="bg-white dark:bg-[#202A3A] text-base flex flex-col items-center gap-4 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between w-full">
                        <p className="dark:text-white font-medium">Stops</p>
                        <button 
                            type="button" 
                            onClick={resetStopFilters}
                            className="inline-flex items-center text-sm font-medium rounded-lg border border-transparent cursor-pointer text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                    
                    <div className="flex flex-col gap-y-4 w-full">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="direct-filter"
                                checked={stopFilters.direct}
                                onChange={handleStopFilterChange}
                                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800" 
                            />
                            <label htmlFor="direct-filter" className="ml-3 text-sm dark:text-neutral-300">Direct</label>
                        </div>
            
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="one-stop-filter"
                                checked={stopFilters.oneStop}
                                onChange={handleStopFilterChange}
                                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800" 
                            />
                            <label htmlFor="one-stop-filter" className="ml-3 text-sm dark:text-neutral-300">1 Stop</label>
                        </div>
        
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="multi-stop-filter"
                                checked={stopFilters.multiStop}
                                onChange={handleStopFilterChange}
                                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800" 
                            />
                            <label htmlFor="multi-stop-filter" className="ml-3 text-sm dark:text-neutral-300">2+ Stops</label>
                        </div>
                    </div>
                </div>
    
                {/* Time Filters */}
                <div className="bg-white dark:bg-[#202A3A] w-full text-base flex flex-col items-center gap-4 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between w-full">
                        <p className="dark:text-white font-medium">Time</p>
                        <button 
                            type="button" 
                            onClick={resetTimeFilters}
                            className="inline-flex items-center text-sm font-medium rounded-lg border border-transparent cursor-pointer text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 transition-colors"
                        >
                            Reset
                        </button>
                    </div>
        
                    <div className="flex flex-col gap-y-4 w-full">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="morning-filter"
                                checked={timeFilters.morning}
                                onChange={handleTimeFilterChange}
                                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800" 
                            />
                            <label htmlFor="morning-filter" className="ml-3 text-sm dark:text-neutral-300">Morning (6:00 AM - 12:00 PM)</label>
                        </div>
            
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="afternoon-filter"
                                checked={timeFilters.afternoon}
                                onChange={handleTimeFilterChange}
                                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800" 
                            />
                            <label htmlFor="afternoon-filter" className="ml-3 text-sm dark:text-neutral-300">Afternoon (12:00 PM - 6:00 PM)</label>
                        </div>
                        
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="evening-filter"
                                checked={timeFilters.evening}
                                onChange={handleTimeFilterChange}
                                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800" 
                            />
                            <label htmlFor="evening-filter" className="ml-3 text-sm dark:text-neutral-300">Evening (6:00 PM - 12:00 AM)</label>
                        </div>
                        
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="night-filter"
                                checked={timeFilters.night}
                                onChange={handleTimeFilterChange}
                                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800" 
                            />
                            <label htmlFor="night-filter" className="ml-3 text-sm dark:text-neutral-300">Night (12:00 AM - 6:00 AM)</label>
                        </div>  
                    </div>
                </div>
                
                {/* Price Range Slider */}
                <div className="bg-white dark:bg-[#202A3A] w-full text-base flex flex-col items-center gap-4 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between w-full">
                        <p className="dark:text-white font-medium">Price range (NGN)</p>
                        <button 
                            type="button" 
                            onClick={resetPriceRange}
                            className="inline-flex items-center text-sm font-medium rounded-lg border border-transparent cursor-pointer text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                    
                    <div className="w-full pt-6 px-2">
                        <Slider
                            defaultValue={priceRange}
                            min={0}
                            max={1000}
                            step={50}
                            onValueChange={handlePriceRangeChange}
                        />
                    </div>
                    
                    <div className="flex justify-between w-full mt-2">
                        <span className="text-sm dark:text-neutral-400">₦{priceRange[0]}</span>
                        <span className="text-sm dark:text-neutral-400">₦{priceRange[1]}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 w-full mt-2">
                        <div>
                            <label className="text-xs text-gray-500 dark:text-neutral-400">Min price</label>
                            <input 
                                type="number" 
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                className="w-full p-2 mt-1 text-sm rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 dark:text-neutral-400">Max price</label>
                            <input 
                                type="number" 
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                                className="w-full p-2 mt-1 text-sm rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Flight Duration Filter */}
                <div className="bg-white dark:bg-[#202A3A] w-full text-base flex flex-col items-center gap-4 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between w-full">  
                        <p className="dark:text-white font-medium">Flight Duration</p>
                        <button 
                            type="button" 
                            onClick={resetDurationFilter}
                            className="inline-flex items-center text-sm font-medium rounded-lg border border-transparent cursor-pointer text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                    
                    <div className="w-full pt-4 px-2">
                        <Slider
                            defaultValue={[durationInSec]}
                            min={1800} // 30 minutes
                            max={86400} // 24 hours
                            step={900} // 15 minute steps
                            onValueChange={handleDurationChange}
                        />
                    </div>
                    
                    <div className="flex justify-between w-full mt-2">
                        <span className="text-sm font-medium dark:text-white">Max flight time: {formatToHour(durationInSec)}</span>
                    </div>
                </div>
                
                {/* Apply Filters Button */}
                <button 
                    type="button"
                    onClick={applyFilters}
                    className="cursor-pointer mt-2 w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-xl border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800"
                >
                    Apply Filters
                </button>
            </div>                
        </aside>
    );
});

export default FilterSidebar;