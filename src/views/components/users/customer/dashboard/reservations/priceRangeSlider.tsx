import React, { useState } from 'react'
import Slider from '@mui/material/Slider';
import debounce from "lodash/debounce";

const MIN_DISTANCE = 500;
const MAX_VALUE = 1000;
const MIN_VALUE = 0;


const PriceRangeSlider = () => {

    const [minPrice, setMinPrice] = useState(250);
    const [maxPrice, setMaxPrice] = useState(750);
    
      
    const handleSliderChange = (event: Event, newValue: number | Array<number>, activeThumb: number) => {
        
        event.preventDefault();

        if (!Array.isArray(newValue)) {
            return;
        }
      
        if (newValue[1] - newValue[0] < MIN_DISTANCE) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], MAX_VALUE - MIN_DISTANCE);
                setMinPrice(clamped);
                setMaxPrice(clamped + MIN_DISTANCE); 
            } else {
                const clamped = Math.max(newValue[1], MIN_DISTANCE);
                setMinPrice(clamped - MIN_DISTANCE);
                setMaxPrice(clamped); 
            }
        } else {
            setMinPrice(newValue[0]);
            setMaxPrice(newValue[1]);
        }   
    }
    const handleMinChange = debounce((event) => {
        const value = Math.max(0, Math.min(Number(event.target.value), maxPrice));
        setMinPrice(value);
    }, 300);
    
    const handleMaxChange = debounce((event) => {
        const value = Math.max(minPrice, Math.min(Number(event.target.value), 1000));
        setMaxPrice(value);
    }, 300);

    return (
        <React.Fragment>
            <div className='w-full flex justify-start items-center'>
                <label className="w-full text-start dark:text-white">Price range (NGN)</label>
            </div>
            <Slider
                min={MIN_VALUE}
                max={MAX_VALUE}
                step={50}
                disableSwap={true}
                valueLabelDisplay="auto"
                value={[minPrice, maxPrice]}
                getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                onChange={handleSliderChange}
                marks={[
                    { value: 0, label: 0 },
                    { value: 1000, label: 1000 }
                ]}
                sx={{
                    margin: '0 auto 0 auto',
                    color: '#2563eb',
                    height: 10,
                    '& .MuiSlider-thumb': {
                        backgroundColor: '#fff',
                        border: '4px solid currentColor',
                        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                            boxShadow: '0px 0px 0px 8px rgba(63, 81, 181, 0.16)',
                        },
                        '&::before': {
                            display: 'none',
                        },
                    },
                    '& .MuiSlider-mark': {
                        fontSize: '8px',
                        '&.MuiSlider-markActive': {
                            backgroundColor: 'currentColor',
                        },
                    },
                    '& .MuiSlider-markLabel': {
                        marginTop: '8px',
                        color: 'text.primary',
                        '@media (prefers-color-scheme: dark)': {
                            color: '#fff',
                        },
                    },
                    '& .MuiSlider-valueLabel': {
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        fontSize: 12,
                        padding: 0,
                        width: 32,
                        height: 32,
                        borderRadius: '50% 50% 50% 0',
                        transformOrigin: 'bottom left',
                        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
                        '&::before': { display: 'none' },
                        '&.MuiSlider-valueLabelOpen': {
                        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                        },
                        '& > *': {
                        transform: 'rotate(45deg)',
                        },
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: 'currentColor',
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: '#bfbfbf',
                    },
                }}
            />
        
            <div className="flex flex-row space-x-4 mt-5">
                <div className="basis-1/2">
                    <label 
                        htmlFor="hs-pass-values-to-inputs-min-target" 
                        className="block text-sm font-medium mb-2 dark:text-neutral-200"
                    >
                        Min price:
                    </label>
                    <input 
                        id="hs-pass-values-to-inputs-min-target" 
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                        type="number"
                        defaultValue={minPrice}
                        onChange={handleMinChange} 
                        onBlur={() => {
                            if (minPrice < MIN_VALUE) {
                                setMinPrice(MIN_VALUE);
                            } else if (minPrice > maxPrice - MIN_DISTANCE) {
                                setMinPrice(maxPrice - MIN_DISTANCE);
                            }
                        }} 
                    />
                </div>
                <div className="basis-1/2">
                    <label 
                        htmlFor="hs-pass-values-to-inputs-max-target" 
                        className="block text-sm font-medium mb-2 dark:text-neutral-200"
                    >
                        Max price:
                    </label>
                    <input 
                        id="hs-pass-values-to-inputs-max-target" 
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:focus:border-[#2563eb] dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-blue-600 " 
                        type="number" 
                        defaultValue={maxPrice}
                        onChange={handleMaxChange}
                        onBlur={() => {
                            if (maxPrice > MAX_VALUE) {
                                setMaxPrice(MAX_VALUE);
                            } else if (maxPrice < minPrice + MIN_DISTANCE) {
                                setMaxPrice(minPrice + MIN_DISTANCE);
                            }
                        }}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}

export default PriceRangeSlider