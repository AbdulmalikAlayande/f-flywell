import * as React from 'react';
import Select from "react-select";

type Props = {
    cityOptions: {}[],
    countryOptions: {}[],
    handleCitySelectionChange: (data: any)=>void
    handleCountrySelectionChange: (data: any)=>void
};

export function AirportSelection(props: Props) {
    return (
        <>
            <div className={"Select-Frame-1"}>
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'blue' : 'grey',
                            width: '17vw',
                            height: '5vh'
                        }),
                        menu: (provided) => ({
                            ...provided,
                            background: 'powderblue',
                            width: '17vw',
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 0
                        }),
                    }}
                    options={props.countryOptions}
                    onChange={props.handleCountrySelectionChange}
                />
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'blue' : 'grey',
                            width: '17vw',
                            height: '5vh',
                        }),
                        menu: (provided) => ({
                            ...provided,
                            background: 'powderblue',
                            width: '17w',
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 0
                        }),
                    }}
                    options={props.cityOptions}
                    onChange={props.handleCitySelectionChange}
                />
            </div>
            <div className={"Select-Frame-2"}>
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'blue' : 'grey',
                            width: '17vw',
                            height: '5vh'
                        }),
                        menu: (provided) => ({
                            ...provided,
                            background: 'powderblue',
                            width: '17vw',
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 0
                        }),
                    }}
                    options={props.countryOptions}
                    onChange={props.handleCountrySelectionChange}
                />
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'blue' : 'grey',
                            width: '17vw',
                            height: '5vh',
                        }),
                        menu: (provided) => ({
                            ...provided,
                            background: 'powderblue',
                            width: '17w',
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 0
                        }),
                    }}
                    options={props.cityOptions}
                    onChange={props.handleCitySelectionChange}
                />
            </div>
        </>
    );
}