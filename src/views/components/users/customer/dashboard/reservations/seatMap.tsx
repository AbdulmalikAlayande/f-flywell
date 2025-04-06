import React, { useState, useEffect } from 'react';
import { Seat } from "@src/views/interfaces/interface";
import { Label } from '@/components/ui/label';
import Logger from '@src/utils/logger';

interface SeatMapProps {
    onSeatSelect: (seat: Seat) => void;
    selectedSeats?: Seat[];
}

const seatStyles = {
    EMPTY: { fill: '#bfdbfe', stroke: '#60a5fa' },
    SELECTED: { fill: '#4ade80', stroke: '#16a34a' },   
    RESERVED: { fill: '#d1d5db', stroke: '#9ca3af', cursor: 'not-allowed' },
    FIRST_CLASS: { fill: '#c4b5fd', stroke: '#8b5cf6' }, 
    BUSINESS_CLASS: { fill: '#fcd34d', stroke: '#f59e0b' },
    PREMIUM_ECONOMY: { fill: '#fb923c', stroke: '#ea580c' },
    ECONOMY: { fill: '#bfdbfe', stroke: '#60a5fa' }, 
};


const seatSections = [
    { id: 'first-class', name: 'First Class', range: [1, 100], columns: 4, color: 'bg-violet-200' },
    { id: 'business-class', name: 'Business Class', range: [101, 200], columns: 4, color: 'bg-teal-200' },
    { id: 'premium', name: 'Premium Economy', range: [301, 400], columns: 4, color: 'bg-orange-200' },
    { id: 'economy', name: 'Economy Class', range: [201, 300], columns: 4, color: 'bg-blue-200' },
];

const SeatMap: React.FC<SeatMapProps> = ({ onSeatSelect, selectedSeats = [] }) => {
    const [seatData, setSeatData] = useState<Map<number, Seat>>(new Map());

    useEffect(() => {
        const mockSeatData = generateMockSeatData();
        Logger.info("Mock Seat Data: " + JSON.stringify(mockSeatData));
        setSeatData(mockSeatData);
    }, []);

    // Update seatData when selectedSeats changes
    useEffect(() => {
        if (selectedSeats.length > 0 && seatData.size > 0) {
            const updatedSeatData = new Map(seatData);
            
            // Reset all SELECTED seats to EMPTY first (if they're not RESERVED)
            for (const [id, seat] of updatedSeatData.entries()) {
                if (seat.status === 'SELECTED') {
                    updatedSeatData.set(id, {...seat, status: 'EMPTY'});
                }
            }
            
            // Then mark the current selectedSeats as SELECTED
            for (const selectedSeat of selectedSeats) {
                if (updatedSeatData.has(selectedSeat.id)) {
                    const seat = updatedSeatData.get(selectedSeat.id);
                    if (seat && seat.status !== 'RESERVED') {
                        updatedSeatData.set(selectedSeat.id, {...seat, status: 'SELECTED'});
                    }
                }
            }
            
            setSeatData(updatedSeatData);
        }
    }, [seatData, selectedSeats]);

    const generateMockSeatData = (): Map<number, Seat> => {
        const mockMap = new Map<number, Seat>();
        
        // Generate seats for each section
        seatSections.forEach(section => {
            const [start, end] = section.range;
            let seatId = start;
            
            for (let row = Math.floor(start / 10); seatId <= end; row++) {
                for (let col = 0; col < section.columns && seatId <= end; col++) {
                    const seatLetter = String.fromCharCode(65 + col);
                    
                    mockMap.set(seatId, {
                        id: seatId,
                        status: Math.random() > 0.7 ? 'RESERVED' : 'EMPTY',
                        type: section.id.includes('first') ? 'FIRST_CLASS' :
                            section.id.includes('business') ? 'BUSINESS_CLASS' :
                                section.id.includes('premium') ? 'PREMIUM_ECONOMY' : 'ECONOMY',
                        row: row,
                        column: col,
                        seatNumber: `${row}${seatLetter}`,
                        price: section.id.includes('first') ? 450 : 
                            section.id.includes('business') ? 350 : 
                            section.id.includes('premium') ? 200 : 100,
                    });
                  
                    seatId++;
                }
            }
        });
        
        return mockMap;
    };

    const handleSeatClick = (seat: Seat) => {
        
        if (seat.status === 'RESERVED') 
            return;
        else if(seat.status === "SELECTED"){
            seat.status = 'EMPTY';
        }
        else 
            onSeatSelect(seat);
    };

    // Group seats by section and row
    const groupedSeats = Array.from(seatData.values()).reduce((acc, seat) => {
        const section = seatSections.find(s => 
            seat.id >= s.range[0] && seat.id <= s.range[1]
        );
        
        if (!section) return acc;
        
        if (!acc[section.id]) {
            acc[section.id] = {};
        }
        
        if (!acc[section.id][seat.row]) {
            acc[section.id][seat.row] = [];
        }
        
        acc[section.id][seat.row].push(seat);
        return acc;
    }, {} as Record<string, Record<number, Seat[]>>);

    const getSeatStyle = (seat: Seat) => {
        if (seat.status === 'SELECTED') 
            return seatStyles.SELECTED;
        else if (seat.status === 'RESERVED') 
            return seatStyles.RESERVED;
        else 
            return seatStyles[seat.type as keyof typeof seatStyles];
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-between bg-gray-800 dark:bg-white gap-4 px-4">
            {/* Seat status legend */}
            <svg
              viewBox="0 0 300 30"
              className="w-full max-w-md h-12 mt-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
                <g transform="translate(20, 8)">
                  <rect x="0" y="0" width="12" height="12" style={seatStyles.EMPTY} />
                  <text x="18" y="10" fontSize="10" fill="#64748b">Available</text>
                  
                  <rect x="80" y="0" width="12" height="12" style={seatStyles.SELECTED} />
                  <text x="98" y="10" fontSize="10" fill="#64748b">Selected</text>
                  
                  <rect x="160" y="0" width="12" height="12" style={seatStyles.RESERVED} />
                  <text x="178" y="10" fontSize="10" fill="#64748b">Occupied</text>
                </g>
            </svg>

            {/* Seat Map with custom scrollbar */}
            <div className="w-full h-9/10 flex flex-col items-center justify-between gap-4">
                <div 
                    className="w-full h-9.5/10 flex flex-col items-center gap-4 overflow-y-auto scrollbar-hide" 
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {seatSections.map(section => {
                        if (!groupedSeats[section.id]) return null;
                        
                        return (
                          <div key={section.id} className="w-full">
                            <Label className={`w-full flex items-center px-2 py-1 ${section.color} text-gray-800 font-medium`}>
                              {section.name}
                            </Label>
                            
                            {Object.entries(groupedSeats[section.id]).sort(([rowA], [rowB]) => Number(rowA) - Number(rowB))
                                .map(([row, seats]) => (
                                    <div key={`${section.id}-row-${row}`} className="w-full flex items-center justify-between py-2">
                                        {/* Row number */}
                                        <div className="w-8 text-center text-white dark:text-gray-700">{row}</div>
                                        
                                        {/* Left side seats */}
                                        <div className="h-full w-1/2 flex items-center justify-start gap-2">
                                            {seats.filter((_, idx) => idx < Math.ceil(section.columns / 2))
                                                .map(seat => (
                                                    <div 
                                                        key={`seat-${seat.id}`}
                                                        className={`h-10 w-10 flex items-center justify-center rounded-sm cursor-pointer ${
                                                            seat.status === 'RESERVED' ? 'cursor-not-allowed' : ''
                                                        }`}
                                                        onClick={() => handleSeatClick(seat)}
                                                    >
                                                        <svg width="100%" height="100%" viewBox="0 0 40 40">
                                                            <rect 
                                                                x="4" y="4" 
                                                                width="32" height="32" 
                                                                rx="3"
                                                                style={getSeatStyle(seat)}
                                                            />
                                                            <text
                                                                x="20" y="24"
                                                                textAnchor="middle"
                                                                fontSize="10"
                                                                fill={seat.status === 'SELECTED' ? 'white' : 'black'}
                                                            >
                                                                {seat.seatNumber}
                                                            </text>
                                                        </svg>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                  
                                        {/* Aisle */}
                                        <div className="h-full w-8 text-white dark:text-gray-800">||</div>
                                  
                                        {/* Right side seats */}
                                        <div className="h-full w-1/2 flex items-center justify-end gap-2">
                                            {seats.filter((_, idx) => idx >= Math.ceil(section.columns / 2))
                                                .map(seat => (
                                                    <div 
                                                        key={`seat-${seat.id}`}
                                                            className={`h-10 w-10 flex items-center justify-center rounded-sm cursor-pointer ${
                                                            seat.status === 'RESERVED' ? 'cursor-not-allowed' : ''
                                                        }`}
                                                        onClick={() => handleSeatClick(seat)}
                                                    >
                                                        <svg width="100%" height="100%" viewBox="0 0 40 40">
                                                            <rect 
                                                                x="4" y="4" 
                                                                width="32" height="32" 
                                                                rx="3"
                                                                style={getSeatStyle(seat)}
                                                            />
                                                            <text
                                                                x="20" y="24"
                                                                textAnchor="middle"
                                                                fontSize="10"
                                                                fill={seat.status === 'SELECTED' ? 'white' : 'black'}
                                                            >
                                                                {seat.seatNumber}
                                                            </text>
                                                        </svg>
                                                    </div>
                                                ))
                                            }
                                            </div>
                                        </div>
                                ))
                            }
                          </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SeatMap;