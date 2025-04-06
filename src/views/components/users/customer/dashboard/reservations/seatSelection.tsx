import React, {useState} from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Briefcase, Diamond, User, X, LayoutGrid } from 'lucide-react';
import { Seat } from '@/views/interfaces/interface';
import { Badge } from '@/components/ui/badge';


type SeatSelectionProps = {
    onSubmit: () => void;
    passengerCount: number;
    flightClass: string;
    selectedSeats: Seat[];
    onSeatRemove: (seatId: number) => void;
    onBack?: () => void;
}

const aircraftSections = [
    {id: "all", name: "All"},
    {id: "first-class", name: "First Class"}, 
    {id: "business-class", name: "Business Class"}, 
    {id: "premium-economy", name: "Premium Economy"}, 
    {id: "economy", name: "Economy"}
];

const SeatSelection: React.FC<SeatSelectionProps> = ({onSubmit, passengerCount, selectedSeats, onSeatRemove}) => {
    
    const [currentSection, setCurrentSection] = useState<string>("all");
    
    const handleSectionChange = (sectionId: string) => {
        setCurrentSection(sectionId);
    };

    // Filter seats based on current section tab
    const getSectionType = (sectionId: string) => {
        if (sectionId === 'all') return 'ALL';
        if (sectionId === 'first-class') return 'FIRST_CLASS';
        if (sectionId === 'business-class') return 'BUSINESS_CLASS';
        if (sectionId === 'premium-economy') return 'PREMIUM_ECONOMY';
        return 'ECONOMY';
    };

    const filteredSeats = selectedSeats.filter(
        seat => currentSection === "all" || seat.type === getSectionType(currentSection)
    );

    return (
        <div className={"h-full w-full flex flex-col space-y"}>
            <Card className="h-full w-full flex flex-col justify-between overflow-hidden">
                <div className="px-6 pt-6 pb-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div>
                            <Label className="text-2xl font-bold">Select Your Seats</Label>
                            <p className="opacity-70">
                                Choose {passengerCount}{' '}{passengerCount === 1 ? 'seat' : 'seats'} to continue
                            </p>                        
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">
                                {selectedSeats.length} of {passengerCount} selected
                            </span>
                            <Button
                                onClick={onSubmit}
                                disabled={selectedSeats.length !== passengerCount}
                            >
                                Confirm Seats
                            </Button>
                        </div>
                    </div>
                </div>
                
                <Tabs
                    defaultValue={currentSection}
                    onValueChange={handleSectionChange}
                    className="w-full"
                >
                    <TabsList className="w-full h-full grid grid-cols-5">
                        {aircraftSections.map((section) => (
                            <TabsTrigger
                                key={section.id}
                                value={section.id}
                                className="flex items-center gap-1"
                            >
                                <div className={"h-full w-full flex flex-col md:flex-row items-center justify-center gap-2"}>
                                    {section.id === 'first-class' ? (
                                        <Crown size={24} className={"text-[#FFD700]"} />
                                    ) : section.id === 'business-class' ? (
                                        <Briefcase size={12} className={"text-[#0055B3]"} />
                                    ) : section.id === 'premium-economy' ? (
                                        <Diamond size={24} className={"text-[#008080]"} />
                                    ) : section.id === 'all' ? (
                                        <LayoutGrid size={24} className={"text-[#6B7280]"} />
                                    ) : (
                                        <User size={24} className={"text-[#28A745]"} />
                                    )}
                                    <span className={'hidden md:block text-[12px] md:text-[14px]'}>{section.name}</span>
                                </div>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                {/* Content to render selected seats */}
                <CardContent className="w-full h-7/10 p-4 overflow-y-auto">
                    {/* Show message if no seats match the current filter */}
                    {filteredSeats.length === 0 ? (
                        <div className="text-center p-4">
                            <p>{currentSection === "all" ? "No Seats Selected" : `No ${getSectionType(currentSection).replace('_', ' ').toLowerCase()} seats selected.`}</p>
                            <p className="text-sm opacity-70">
                                {selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'} selected in other sections
                            </p>
                        </div>
                    ) : (
                        filteredSeats.map((seat) => (
                            <SeatCard 
                                key={seat.id} 
                                seat={seat} 
                                onRemove={onSeatRemove}
                            />
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default SeatSelection;


type SeatCardProps = {
    seat: Seat;
    onRemove: (seatId: number) => void;
};
  
const SeatCard: React.FC<SeatCardProps> = ({ seat, onRemove }) => {

    const getBadgeVariant = () => {
      switch (seat.type) {
        case 'FIRST_CLASS':
          return 'bg-violet-100 text-violet-800 hover:bg-violet-200';
        case 'BUSINESS_CLASS':
          return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
        case 'PREMIUM_ECONOMY':
          return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
        case 'ECONOMY':
        default:
          return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      }
    };
  

    const formatSeatType = (type: string) => {
      return type.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
    };
  
    return (
        <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg group hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-4">
                {/* Seat icon with number */}
                <div className="flex items-center justify-center w-12 h-12 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700">
                    <svg viewBox="0 0 40 40" className="w-10 h-10">
                        <rect 
                            x="4" y="4" 
                            width="32" height="32" 
                            rx="3"
                            fill={seat.type === 'FIRST_CLASS' ? '#c4b5fd' : 
                                seat.type === 'BUSINESS_CLASS' ? '#fcd34d' : 
                                seat.type === 'PREMIUM_ECONOMY' ? '#fb923c' : '#bfdbfe'}
                            stroke={seat.type === 'FIRST_CLASS' ? '#8b5cf6' : 
                                    seat.type === 'BUSINESS_CLASS' ? '#f59e0b' : 
                                    seat.type === 'PREMIUM_ECONOMY' ? '#ea580c' : '#60a5fa'}
                            strokeWidth="1.5"
                        />
                        <text
                            x="20" y="24"
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="bold"
                            fill="#000000"
                        >
                            {seat.seatNumber}
                        </text>
                    </svg>
                </div>
        
                {/* Seat details */}
                <div className="md:w-65 flex flex-col justify-between gap-2">
                    <div className="w-full flex items-center justify-between">
                        <span className="font-medium text-gray-800 dark:text-gray-200">Seat {seat.seatNumber}</span>
                        <Badge className={`md:w-40 text-[12px] md:text-sm px-2 py-0 ${getBadgeVariant()}`}>
                            {formatSeatType(seat.type)}
                        </Badge>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Row {seat.row} • ${seat.price.toFixed(2)}
                    </span>
                </div>
            </div>
    
            {/* Remove button */}
            <button 
                onClick={() => onRemove(seat.id)}
                className="p-0.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove seat"
            >
                <X size={18} />
            </button>
        </div>
    );
};
  
