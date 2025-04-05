import React from "react";
import DatePicker2 from '@src/views/landingPage/datePicker2';

interface SearchFormProps {
    clearDate: () => void;
}

export const SearchForm = React.memo(({ clearDate }: SearchFormProps) => {
    return (
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
    );
});