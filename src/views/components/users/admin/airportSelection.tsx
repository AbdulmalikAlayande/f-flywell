import * as React from 'react';
import Select, {GroupBase, StylesConfig} from "react-select";

type Props = {
    currentStep: number,
    cityOptions: {}[],
    countryOptions: {}[],
    handleCitySelectionChange: (data: any)=>void
    handleCountrySelectionChange: (data: any)=>void
};

export function AirportSelection(props: Props) {
    
    const airportSelectionTagStyles: StylesConfig<{}, false, GroupBase<{}>> = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'powderblue' : 'grey',
            width: '17vw',
        }),
        menu: (provided) => ({
            background: 'powderblue',
            width: '17vw',
        }),
    };
    return (
        <>
            {props.currentStep === 1 && <div className={"Select-Frame-1"}>
                <Select
                    styles={airportSelectionTagStyles}
                    options={props.countryOptions}
                    onChange={props.handleCountrySelectionChange}
                />
                <Select
                    styles={airportSelectionTagStyles}
                    options={props.cityOptions}
                    onChange={props.handleCitySelectionChange}
                />
            </div>
            }
            {props.currentStep === 2 && <div className={"Select-Frame-2"}>
                <Select
                    styles={airportSelectionTagStyles}
                    options={props.countryOptions}
                    onChange={props.handleCountrySelectionChange}
                />
                <Select
                    styles={airportSelectionTagStyles}
                    options={props.cityOptions}
                    onChange={props.handleCitySelectionChange}
                />
            </div>
            }
            
        </>
    );
}