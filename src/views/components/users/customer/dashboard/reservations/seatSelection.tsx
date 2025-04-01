import React, {useEffect, useState} from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Info } from 'lucide-react';
import { toast } from "sonner"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


interface SeatSelectionProps {
    onSubmit: (selectedSeats: string[]) => void;
    passengerCount: number;
    flightClass: string;
}

interface Seat {
    id: string;
    status: 'available' | 'selected' | 'booked';
    price: number;
    features?: string[];
}
  
const SeatSelection: React.FC<SeatSelectionProps> = ({ onSubmit, passengerCount = 1, flightClass = 'Business'}) => {


    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [currentSection, setCurrentSection] = useState(1);
    const [zoom, setZoom] = useState(100);
    const [seatMap, setSeatMap] = useState<Record<string, Seat[][]>>({});

    // Initialize seatmap data with realistic layouts
    useEffect(() => {
        // Generate alphabets for row labels (A-F)
        const rowLabels = Array.from({ length: 6 }, (_, i) => String.fromCharCode(65 + i));
        
        // Helper to generate seats for a section
        const generateSeats = (section: number, rows: number, isBusiness: boolean, bookedPercentage: number): Seat[][] => {
            return rowLabels.slice(0, isBusiness ? 4 : 6).map(rowLabel => {
                return Array.from({ length: rows }, (_, colIndex) => {
                const seatNumber = `${section}${colIndex + 1}${rowLabel}`;
                const randomStatus = Math.random() < bookedPercentage ? 'booked' : 'available';
                const isWindowSeat = rowLabel === 'A' || rowLabel === (isBusiness ? 'D' : 'F');
                const isAisleSeat = isBusiness 
                    ? (rowLabel === 'B' || rowLabel === 'C') 
                    : (rowLabel === 'C' || rowLabel === 'D');
                
                // Features that make certain seats special
                const features = [];
                if (isWindowSeat) features.push('Window');
                if (isAisleSeat) features.push('Aisle');
                if (section === 1 && colIndex < 2) features.push('Extra Legroom');
                
                return {
                    id: seatNumber,
                    status: randomStatus,
                    price: isBusiness 
                    ? 50 + Math.floor(Math.random() * 30) 
                    : 25 + Math.floor(Math.random() * 15),
                    features
                };
                });
            });
        };
        
        // Create 3 sections of seats
        const sections: Record<string, Seat[][]> = {
            'business': generateSeats(1, 5, true, 0.4),
            'premium': generateSeats(2, 6, false, 0.3),
            'economy': generateSeats(3, 10, false, 0.2),
        };
        
        setSeatMap(sections);
    }, []);

    const handleSeatClick = (seat: Seat) => {
        if (seat.status === 'booked') return;
        
        // If this seat is already selected, unselect it
        if (seat.status === 'selected' || selectedSeats.includes(seat.id)) {
            setSelectedSeats(prev => prev.filter(id => id !== seat.id));
            
            // Update the seat map
            setSeatMap(prev => {
                const newMap = { ...prev };
                const section = getSectionFromSeatId(seat.id);
                const [row, col] = getPositionFromSeatId(seat.id, section);
                
                if (newMap[section] && newMap[section][row] && newMap[section][row][col]) {
                newMap[section][row][col] = {
                    ...newMap[section][row][col],
                    status: 'available'
                };
                }
                
                return newMap;
            });
            
            return;
        }
        
        // Check if we've already selected enough seats
        if (selectedSeats.length >= passengerCount) {
            toast.error("Maximum seats selected", {
                description: `You can only select ${passengerCount} seats for your booking.`
            });
            return;
        }
        
        // Add seat to selection
        setSelectedSeats(prev => [...prev, seat.id]);
        
        // Update the seat map
        setSeatMap(prev => {
            const newMap = { ...prev };
            const section = getSectionFromSeatId(seat.id);
            const [row, col] = getPositionFromSeatId(seat.id, section);
            
            if (newMap[section] && newMap[section][row] && newMap[section][row][col]) {
                newMap[section][row][col] = {
                    ...newMap[section][row][col],
                    status: 'selected'
                };
            }
            
            return newMap;
        });
    };
    
    // Helper functions for seat ID handling
    const getSectionFromSeatId = (seatId: string): string => {
        const section = parseInt(seatId.charAt(0));
        if (section === 1) return 'business';
        if (section === 2) return 'premium';
        return 'economy';
    };
    
    const getPositionFromSeatId = (seatId: string, section: string): [number, number] => {
        const rowChar = seatId.charAt(seatId.length - 1);
        const rowIndex = rowChar.charCodeAt(0) - 65; // Convert A->0, B->1, etc.
        
        // Extract column number (handle double digits)
        const colStr = seatId.substring(1, seatId.length - 1);
        const colIndex = parseInt(colStr) - 1;
        
        return [rowIndex, colIndex];
    };
    
    const handleZoomIn = () => {
        if (zoom < 150) setZoom(zoom + 10);
    };
    
    const handleZoomOut = () => {
        if (zoom > 70) setZoom(zoom - 10);
    };
    
    const handleNext = () => {
        if (currentSection < 3) setCurrentSection(currentSection + 1);
    };
    
    const handlePrev = () => {
        if (currentSection > 1) setCurrentSection(currentSection - 1);
    };
    
    const handleSubmit = () => {
        if (selectedSeats.length < passengerCount) {
            toast.error("Not enough seats selected", {
                description: `Please select ${passengerCount} seats to continue.`
            });
          return;
        }
            
        toast.success("Seats confirmed", {
            description: `Successfully selected ${selectedSeats.length} seats.`
        });
    
        onSubmit(selectedSeats);
    };
    
    // Get the current section to render
    const getCurrentSectionName = (): string => {
        switch (currentSection) {
        case 1: return 'business';
        case 2: return 'premium';
        case 3: return 'economy';
        default: return 'business';
        }
    };
    
    const getCurrentSectionMap = (): Seat[][] => {
        return seatMap[getCurrentSectionName()] || [];
    };
    
    const getSectionTitle = (): string => {
        switch (currentSection) {
        case 1: return 'Business Class';
        case 2: return 'Premium Economy';
        case 3: return 'Economy';
        default: return 'Select Your Seats';
        }
    };
    
    const getTotalPrice = (): number => {
        let total = 0;
        
        selectedSeats.forEach(seatId => {
        const section = getSectionFromSeatId(seatId);
        const [row, col] = getPositionFromSeatId(seatId, section);
        
        if (seatMap[section] && seatMap[section][row] && seatMap[section][row][col]) {
            total += seatMap[section][row][col].price;
        }
        });
        
        return total;
    };
    
    const getSeatFeatures = (seat: Seat): string => {
        if (!seat.features || seat.features.length === 0) return "Standard seat";
        return seat.features.join(', ');
    };
    
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{getSectionTitle()}</h2>
                <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={handleZoomOut}>
                    <ZoomOut size={16} />
                </Button>
                <span>{zoom}%</span>
                <Button size="sm" variant="outline" onClick={handleZoomIn}>
                    <ZoomIn size={16} />
                </Button>
                </div>
            </div>
            
            <div className="text-center mb-6">
                <div className="inline-block bg-gray-200 p-4 rounded-lg">
                FRONT OF AIRCRAFT
                </div>
            </div>
            
            <Card>
                <CardContent className="pt-6">
                    <div 
                        className="overflow-auto" 
                        style={{ 
                            maxHeight: '500px',
                            transform: `scale(${zoom/100})`,
                            transformOrigin: 'top center',
                            transition: 'transform 0.3s ease'
                        }}
                    >
                        <div className="flex flex-col items-center gap-1 min-w-max">
                            {getCurrentSectionMap().map((row, rowIndex) => (
                                <div key={rowIndex} className="flex gap-1">
                                    {row.map((seat, seatIndex) => (
                                        <TooltipProvider key={`${seatIndex}+${seat.id}`}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`
                                                        w-10 h-10 flex items-center justify-center rounded cursor-pointer
                                                        ${seat.status === 'booked' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}
                                                        ${seat.status === 'selected' || selectedSeats.includes(seat.id) 
                                                            ? 'bg-green-500 text-white' 
                                                            : seat.status === 'available' 
                                                            ? 'bg-blue-100 hover:bg-blue-200 text-blue-800' 
                                                            : ''}
                                                        ${seat.features?.includes('Extra Legroom') ? 'border-2 border-amber-500' : ''}
                                                        ${seat.features?.includes('Window') ? 'border-l-4 border-l-sky-500' : ''}
                                                        ${seat.features?.includes('Aisle') ? 'border-r-4 border-r-purple-500' : ''}
                                                    `}
                                                    onClick={() => handleSeatClick(seat)}
                                                >
                                                    {seat.id.substring(1)}
                                                </motion.div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="p-1">
                                                        <p className="font-bold">Seat {seat.id.substring(1)}</p>
                                                        <p>{seat.status === 'booked' ? 'Already booked' : `$${seat.price}`}</p>
                                                        <p className="text-xs">{getSeatFeatures(seat)}</p>
                                                    </div>  
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-between items-center">
                <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentSection === 1}
                >
                <ChevronLeft size={16} className="mr-1" /> Previous
                </Button>
                
                <div className="flex items-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-1 cursor-help">
                                    <Info size={16} />
                                    <span>Seat Legend</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <div className="p-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-4 h-4 bg-blue-100 rounded"></div>
                                        <span>Available</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                                        <span>Selected</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                        <span>Booked</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-4 h-4 border-2 border-amber-500 rounded"></div>
                                        <span>Extra Legroom</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-4 h-4 border-l-4 border-l-sky-500 rounded"></div>
                                        <span>Window Seat</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-r-4 border-r-purple-500 rounded"></div>
                                        <span>Aisle Seat</span>
                                    </div>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                
                <Button
                    variant="outline"
                    onClick={handleNext}
                    disabled={currentSection === 3}
                >
                    Next <ChevronRight size={16} className="ml-1" />
                </Button>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold mb-2">Selected Seats: {selectedSeats.length}/{passengerCount}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSeats.length > 0 ? (
                        selectedSeats.map(seatId => {
                        const section = getSectionFromSeatId(seatId);
                        const [row, col] = getPositionFromSeatId(seatId, section);
                        const seat = seatMap[section]?.[row]?.[col];
                        
                        return (
                            <div key={seatId} className="bg-green-100 p-2 rounded flex items-center gap-2">
                                <span>{seatId.substring(1)}</span>
                                <span className="text-sm text-gray-600">${seat?.price}</span>
                                <button 
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleSeatClick(seat)}
                                >
                                    ✕
                                </button>
                            </div>
                        );
                        })
                    ) : (
                        <p className="text-gray-500">No seats selected yet</p>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold">Total: ${getTotalPrice()}</p>
                        <p className="text-sm text-gray-600">Plus taxes and fees</p>
                    </div>
                    <Button 
                        onClick={handleSubmit}
                        disabled={selectedSeats.length < passengerCount}
                    >
                        Confirm Selection
                    </Button>
                </div>
            </div>
        </div>
    );
};
    
export default SeatSelection;