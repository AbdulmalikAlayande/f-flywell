import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Plane, Briefcase, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '@/utils/apiClient';
import Logger from '@/utils/logger';
import { Passenger } from '@src/views/types';
import { toast } from 'sonner';

type Country = {
    name: {
        common: string;
        official: string;
    };
    cca2: string;
    maps: {
        googleMaps: string,
        openStreetMaps: string;
    };
    timezones: [];
    flags: {
        png: string;
        svg: string;
    };
};

interface PassengerFormProps {
    onSubmit: (passengers: Passenger[]) => void;
}

const PassengerForm: React.FC<PassengerFormProps> = ({ onSubmit }) => {
    
    const [activeTab, setActiveTab] = useState('1');
    const [passengers, setPassengers] = useState<Passenger[]>([
        {
            title: "Mr",
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            nationality: '',
            passportNumber: '',
            passportExpiryDate: '',
            mealPreference: "Standard",
            specialAssistance: false,
            activeTab: 'basic'
        }
    ]);

    const [countries, setCountries] = useState<Country[]>([
        {name: {common: 'Nigeria', official: 'Federal Republic of Nigeria'}, cca2: "NG", maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'Ghana', official: 'Republic of Ghana'}, cca2: "GH", maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'Togo', official: 'Togolese Republic'}, cca2: "TG", maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'Benin', official: 'Republic of Benin'}, cca2: "BJ", maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'Cameroon', official: 'Republic of Cameroon'}, cca2: "CM", maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'Niger', official: 'Republic of Niger'}, cca2: "NE", maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'United States', official: 'United States of America'}, cca2: 'US', maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'United Kingdom', official: 'United Kingdom of Great Britain and Northern Ireland'}, cca2: 'UK', maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'Indonesia', official: 'Republic of Indonesia'}, cca2: 'ID', maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'Japan', official: 'Japan'}, cca2: 'JP', maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'Australia', official: 'Commonwealth of Australia'}, cca2: 'AU', maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'Singapore', official: 'Republic of Singapore'}, cca2: 'SG', maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'Malaysia', official: 'Malaysia'}, cca2: 'MY', maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
        {name: {common: 'China', official: "People's Republic of China"}, cca2: 'CN', maps: {googleMaps: '', openStreetMaps: ''}, timezones: [], flags: {png: '', svg: ''}},
    ]);
    
    const fetchCountries = async (): Promise<Country[]> => {
        try {
            const apiClient = new ApiClient<unknown, Country[]>("https://restcountries.com/v3.1");
            const response = await apiClient.get("/all");
            if(response.data) {
                Logger.debug("Countries fetched successfully");
                return response.data.map((country) => ({
                    name: country.name,
                    cca2: country.cca2,
                    maps: country.maps,
                    timezones: country.timezones,
                    flags: country.flags
                }));
            }
        } catch (error) {
            Logger.error(`Failed to fetch countries: ${error}`);
        }
        return countries;
    };
    
    const { data } = useQuery<Country[]>({
        queryKey: ["countries"],
        queryFn: fetchCountries
    });
    
    useEffect(() => {
        if(data && data.length > 0){
            setCountries(data.sort((a, b) => a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase())));
        }
    }, [data]);

    const validatePassengers = () => {

        for (const passenger of passengers) {
            if (!passenger.firstName || !passenger.lastName || !passenger.title || 
                !passenger.dateOfBirth || !passenger.nationality) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        Logger.debug("Passenger form submitted: "+ JSON.stringify(passengers));
        if (validatePassengers()) {
            onSubmit(passengers);
        } 
        else {
            Logger.error("Passenger form validation failed: "+ JSON.stringify(passengers));
            toast("Please fill in all required fields for all passengers");
        }
    };

    const handleInputChange = (index: number, field: string, value: string | number | boolean) => {
        setPassengers((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value,
            };
            return updated;
        });
    };

    const addPassenger = () => {
        setPassengers((prev) => [
            ...prev,
            {
                title: "Mr",
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                nationality: '',
                passportNumber: '',
                passportExpiryDate: '',
                mealPreference: "Standard",
                specialAssistance: false,
                activeTab: 'basic'
            }
        ]);

        setActiveTab(String(passengers.length + 1));
    };

    const removePassenger = (index: number) => {
        if (passengers.length > 1) {
            setPassengers((prev) => prev.filter((_, i) => i !== index));

            if (Number(activeTab) > passengers.length - 1) {
                setActiveTab(String(passengers.length - 1));
            }
        }
    };

    const togglePassengerTab = (passengerIndex: number, tab: string) => {
        setPassengers(prev => {
            const updated = [...prev];
            updated[passengerIndex] = {
                ...updated[passengerIndex],
                activeTab: tab
            };
            return updated;
        });
    };

    const isTabComplete = (passenger: Passenger, tab: string) => {
        switch (tab) {
            case 'basic':
                return Boolean(passenger.firstName && passenger.lastName && passenger.title);
            case 'travel':
                return Boolean(passenger.nationality && passenger.passportNumber && passenger.passportExpiryDate);
            case 'preferences':
                return true; // Optional fields, always complete
            default:
                return false;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                <Label className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-6">Passenger Information</Label>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 p-2 w-full h-full bg-white dark:bg-gray-800">
                        {passengers.map((_, index) => (
                            <TabsTrigger 
                                key={index} 
                                value={String(index + 1)}
                                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                            >
                                {`P ${index + 1}`}
                            </TabsTrigger>
                        ))}
                        {passengers.length < 9 && (
                            <Button 
                                type="button" 
                                variant="outline"
                                size="sm"
                                onClick={addPassenger}
                                className="h-10"
                            >
                                +
                            </Button>
                        )}
                    </TabsList>

                {passengers.map((passenger, pIndex) => (
                    <TabsContent key={pIndex} value={String(pIndex + 1)} className="mt-6 bg-transparent">
                        <Card className="border-0 shadow-none bg-white dark:bg-gray-800 p-4 pb-6">
                            <CardContent className="flex flex-col gap-4 p-0">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium">
                                        {`Passenger ${pIndex + 1}`}
                                    </h3>
                                    <div className={""}>
                                        {pIndex > 0 && (
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => removePassenger(pIndex)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                                Remove
                                            </Button>
                                            
                                        )}
                                        {/* {tab === "basic"} */}
                                    </div>
                                </div>

                                <div className="flex border-b mb-4">
                                    <button
                                        type="button"
                                        className={`cursor-pointer px-4 py-2 font-medium text-sm border-b-2 ${
                                            passenger.activeTab === 'basic' 
                                            ? 'border-blue-500 text-blue-600' 
                                            : 'border-transparent text-gray-500'
                                        } ${isTabComplete(passenger, 'basic') ? 'after:content-["✓"] after:text-green-500 after:ml-1' : ''}`}
                                        onClick={() => togglePassengerTab(pIndex, 'basic')}
                                    >
                                        <span className="flex items-center gap-1 text-sm">
                                            <User size={20} />
                                            Basic Info
                                        </span>
                                    </button>
                                    
                                    <button
                                        type="button"
                                        className={`cursor-pointer px-4 py-2 font-medium text-sm border-b-2 ${
                                            passenger.activeTab === 'travel' 
                                            ? 'border-blue-500 text-blue-600' 
                                            : 'border-transparent text-gray-500'
                                        } ${isTabComplete(passenger, 'travel') ? 'after:content-["✓"] after:text-green-500 after:ml-1' : ''}`}
                                        onClick={() => togglePassengerTab(pIndex, 'travel')}
                                    >
                                        <span className="flex items-center gap-1 text-sm">
                                            <Plane size={20} />
                                            Travel Documents
                                        </span>
                                    </button>
                                    
                                    <button
                                        type="button"
                                        className={`cursor-pointer  px-4 py-2 font-medium text-sm border-b-2 ${
                                            passenger.activeTab === 'preferences' 
                                            ? 'border-blue-500 text-blue-600' 
                                            : 'border-transparent text-gray-500'
                                        }`}
                                        onClick={() => togglePassengerTab(pIndex, 'preferences')}
                                    >
                                        <span className="flex items-center gap-1 text-sm">
                                            <Briefcase size={20} />
                                            Preferences
                                        </span>
                                    </button>
                                </div>

                                {passenger.activeTab === 'basic' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4"
                                    >
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={`title-${pIndex}`}>Title<span className="text-red-500">*</span></Label>
                                                <Select
                                                    value={passenger.title}
                                                    onValueChange={(value) => handleInputChange(pIndex, 'title', value)}
                                                >
                                                    <SelectTrigger id={`title-${pIndex}`} className="w-full">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Mr">Mr.</SelectItem>
                                                        <SelectItem value="Mrs">Mrs.</SelectItem>
                                                        <SelectItem value="Ms">Ms.</SelectItem>
                                                        <SelectItem value="Dr">Dr.</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={`firstName-${pIndex}`}>First Name<span className="text-red-500">*</span></Label>
                                                <Input
                                                    id={`firstName-${pIndex}`}
                                                    value={passenger.firstName}
                                                    onChange={(e) => handleInputChange(pIndex, 'firstName', e.target.value)}
                                                    placeholder="As shown on ID/passport"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={`lastName-${pIndex}`}>Last Name<span className="text-red-500">*</span></Label>
                                                <Input
                                                    id={`lastName-${pIndex}`}
                                                    value={passenger.lastName}
                                                    onChange={(e) => handleInputChange(pIndex, 'lastName', e.target.value)}
                                                    placeholder="As shown on ID/passport"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    
                                        <div className={"flex flex-col gap-2"}>
                                            <Label htmlFor={`dateOfBirth-${pIndex}`}>Date of Birth<span className="text-red-500">*</span></Label>
                                            <Input
                                                id={`dateOfBirth-${pIndex}`}
                                                type="date"
                                                value={passenger.dateOfBirth}
                                                onChange={(e) => handleInputChange(pIndex, 'dateOfBirth', e.target.value)}
                                                className="w-full"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {passenger.activeTab === 'travel' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4"
                                    >
                                        <div className={"flex flex-col gap-2"}>
                                            <Label htmlFor={`nationality-${pIndex}`}>Nationality<span className="text-red-500">*</span></Label>
                                            <Select
                                                value={passenger.nationality}
                                                onValueChange={(value) => handleInputChange(pIndex, 'nationality', value)}
                                            >
                                                <SelectTrigger id={`nationality-${pIndex}`} className="w-full">
                                                    <SelectValue placeholder="Select nationality" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {countries.map((country) => (
                                                        <SelectItem key={country.cca2} value={country.cca2}>
                                                            {country.name.common}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={`passportId-${pIndex}`}>Passport ID<span className="text-red-500">*</span></Label>
                                                <Input
                                                    id={`passportId-${pIndex}`}
                                                    value={passenger.passportNumber}
                                                    type={"text"}
                                                    onChange={(e) => handleInputChange(pIndex, 'passportNumber', e.target.value)}
                                                    placeholder="As shown on passport"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className={"flex flex-col gap-2"}>
                                                <Label htmlFor={`passportExpiryDate-${pIndex}`}>Expiry Date<span className="text-red-500">*</span></Label>
                                                <Input
                                                    id={`passportExpiryDate-${pIndex}`}
                                                    type="date"
                                                    value={passenger.passportExpiryDate}
                                                    onChange={(e) => handleInputChange(pIndex, 'passportExpiryDate', e.target.value)}
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start gap-3">
                                            <AlertCircle className="text-blue-500 mt-0.5" size={20} />
                                            <div>
                                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                                    Ensure your passport is valid for at least 6 months beyond your travel date.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {passenger.activeTab === 'preferences' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4"
                                    >
                                        <div className={"flex flex-col gap-2"}>
                                            <Label htmlFor={`mealPreference-${pIndex}`}>Meal Preference</Label>
                                            <Select
                                                value={passenger.mealPreference}
                                                onValueChange={(value) => handleInputChange(pIndex, 'mealPreference', value)}
                                            >
                                                <SelectTrigger id={`mealPreference-${pIndex}`} className="w-full">
                                                    <SelectValue placeholder="Select meal preference" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Standard">Standard</SelectItem>
                                                    <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                                                    <SelectItem value="Vegan">Vegan</SelectItem>
                                                    <SelectItem value="Halal">Halal</SelectItem>
                                                    <SelectItem value="Kosher">Kosher</SelectItem>
                                                    <SelectItem value="GlutenFree">Gluten Free</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`specialAssistance-${pIndex}`}
                                                checked={passenger.specialAssistance}
                                                onCheckedChange={(checked) => 
                                                    handleInputChange(pIndex, 'specialAssistance', checked === true)
                                                }
                                            />
                                            <Label 
                                                htmlFor={`specialAssistance-${pIndex}`}
                                                className="text-sm font-normal text-gray-700 dark:text-gray-300"
                                            >
                                                Special assistance required (wheelchair, mobility assistance)
                                            </Label>
                                        </div>

                                        {passenger.specialAssistance && (
                                            <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                                                <p className="text-sm text-amber-700 dark:text-amber-300">
                                                    An airline representative will contact you before your flight to arrange special assistance.
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                            )}

                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
                </Tabs>

                <div className="flex justify-end gap-3 mt-8">
                    <Button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Continue to Seat Selection
                    </Button>
                </div>
            </div>
        </form>
    );
};

    export default PassengerForm;