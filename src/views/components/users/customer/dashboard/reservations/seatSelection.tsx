import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ZoomIn,
    ZoomOut,
    Info,
    Plane,
    User,
    Crown,
    Plus,
    RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from 'next-themes';

interface SeatSelectionProps {
    onSubmit: (selectedSeats: string[]) => void;
    passengerCount: number;
    flightClass: string;
    onBack?: () => void;
}

interface Seat {
    id: string;
    status: 'available' | 'selected' | 'booked' | 'unavailable';
    price: number;
    features?: string[];
    position?: {
        x: number;
        y: number;
    };
}

interface SeatGroup {
    id: string;
    name: string;
    rows: number;
    cols: number;
    rowLabels: string[];
    colLabels: number[];
    layout: ('seat' | 'aisle' | 'empty')[][];
    seats: Record<string, Seat>;
    position?: {
        x: number;
        y: number;
    };
}

interface AircraftSection {
    id: string;
    name: string;
    layout: SeatGroup[];
    description?: string;
    basePrice: number;
    priceMultipliers?: {
        window: number;
        aisle: number;
        extraLegroom: number;
        preferred: number;
    };
}

// Visual theme definitions for different sections
const sectionThemes = {
    business: {
        primary: 'bg-amber-500',
        secondary: 'bg-amber-400',
        selected: 'bg-amber-600 text-white',
        available: 'bg-amber-100 text-amber-900',
        hover: 'hover:bg-amber-200',
        text: 'text-amber-900',
        light: 'text-amber-500',
        border: 'border-amber-300',
        gradientFrom: 'from-amber-50',
        gradientTo: 'to-amber-100',
    },
    premium: {
        primary: 'bg-indigo-500',
        secondary: 'bg-indigo-400',
        selected: 'bg-indigo-600 text-white',
        available: 'bg-indigo-100 text-indigo-900',
        hover: 'hover:bg-indigo-200',
        text: 'text-indigo-900',
        light: 'text-indigo-500',
        border: 'border-indigo-300',
        gradientFrom: 'from-indigo-50',
        gradientTo: 'to-indigo-100',
    },
    economy: {
        primary: 'bg-sky-500',
        secondary: 'bg-sky-400',
        selected: 'bg-sky-600 text-white',
        available: 'bg-sky-100 text-sky-900',
        hover: 'hover:bg-sky-200',
        text: 'text-sky-900',
        light: 'text-sky-500',
        border: 'border-sky-300',
        gradientFrom: 'from-sky-50',
        gradientTo: 'to-sky-100',
    },
};

const SeatSelection: React.FC<SeatSelectionProps> = ({
    onSubmit,
    passengerCount = 1,
    flightClass = 'Business',
    onBack,
}) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // State for different aspects of the UI
    const [aircraft, setAircraft] = useState<AircraftSection[]>([]);
    const [currentSection, setCurrentSection] = useState<string>('business');
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'2d' | '3d' | 'cabin'>('2d');
    const [zoom, setZoom] = useState<number>(100);
    const [rotation, setRotation] = useState<number>(0);
    const [legends, setLegends] = useState<boolean>(true);
    const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
    const [selectedPassenger, setSelectedPassenger] = useState<number>(0);
    const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);

    const sectionTheme = sectionThemes[currentSection as keyof typeof sectionThemes];

    // Generate aircraft layout with realistic seating
    useEffect(() => {
        // Define aircraft sections
        const aircraftConfig: AircraftSection[] = [
            {
                id: 'business',
                name: 'Business Class',
                basePrice: 450,
                description:
                    'Premium cabin with spacious seats, priority boarding, and 5-star dining',
                priceMultipliers: {
                    window: 1.2,
                    aisle: 1.1,
                    extraLegroom: 1.3,
                    preferred: 1.15,
                },
                layout: [
                    {
                        id: 'business-front',
                        name: 'Front Business',
                        rows: 2,
                        cols: 4,
                        rowLabels: ['1', '2'],
                        colLabels: [1, 2, 3, 4],
                        layout: [
                            ['seat', 'seat', 'aisle', 'seat', 'seat'],
                            ['seat', 'seat', 'aisle', 'seat', 'seat'],
                        ],
                        seats: {},
                    },
                    {
                        id: 'business-mid',
                        name: 'Mid Business',
                        rows: 3,
                        cols: 4,
                        rowLabels: ['3', '4', '5'],
                        colLabels: [1, 2, 3, 4],
                        layout: [
                            ['seat', 'seat', 'aisle', 'seat', 'seat'],
                            ['seat', 'seat', 'aisle', 'seat', 'seat'],
                            ['seat', 'seat', 'aisle', 'seat', 'seat'],
                        ],
                        seats: {},
                    },
                ],
            },
            {
                id: 'premium',
                name: 'Premium Economy',
                basePrice: 250,
                description:
                    'Enhanced comfort with extra legroom, priority boarding, and upgraded meals',
                priceMultipliers: {
                    window: 1.15,
                    aisle: 1.1,
                    extraLegroom: 1.2,
                    preferred: 1.12,
                },
                layout: [
                    {
                        id: 'premium-front',
                        name: 'Front Premium',
                        rows: 3,
                        cols: 6,
                        rowLabels: ['10', '11', '12'],
                        colLabels: [1, 2, 3, 4, 5, 6],
                        layout: [
                            ['seat', 'seat', 'seat', 'aisle', 'seat', 'seat', 'seat'],
                            ['seat', 'seat', 'seat', 'aisle', 'seat', 'seat', 'seat'],
                            ['seat', 'seat', 'seat', 'aisle', 'seat', 'seat', 'seat'],
                        ],
                        seats: {},
                    },
                ],
            },
            {
                id: 'economy',
                name: 'Economy',
                basePrice: 150,
                description: 'Standard seating with complimentary snacks and entertainment',
                priceMultipliers: {
                    window: 1.1,
                    aisle: 1.05,
                    extraLegroom: 1.15,
                    preferred: 1.08,
                },
                layout: [
                    {
                        id: 'economy-front',
                        name: 'Front Economy (Extra Legroom)',
                        rows: 3,
                        cols: 9,
                        rowLabels: ['20', '21', '22'],
                        colLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        layout: [
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                        ],
                        seats: {},
                    },
                    {
                        id: 'economy-mid',
                        name: 'Mid Economy',
                        rows: 10,
                        cols: 9,
                        rowLabels: ['23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
                        colLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        layout: [
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                        ],
                        seats: {},
                    },
                    {
                        id: 'economy-rear',
                        name: 'Rear Economy',
                        rows: 6,
                        cols: 9,
                        rowLabels: ['33', '34', '35', '36', '37', '38'],
                        colLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        layout: [
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                            [
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                                'aisle',
                                'seat',
                                'seat',
                                'seat',
                            ],
                        ],
                        seats: {},
                    },
                ],
            },
        ];

        // Generate seats with realistic attributes
        const generateSeats = (aircraftData: AircraftSection[]) => {
            const updatedAircraft = [...aircraftData];

            // Helper to determine if a seat is by a window or aisle
            const getSeatFeatures = (
                sectionId: string,
                groupId: string,
                rowIdx: number,
                colIdx: number,
                layout: ('seat' | 'aisle' | 'empty')[][]
            ): string[] => {
                const features: string[] = [];
                const row = layout[rowIdx];

                // Check if it's a window seat (leftmost or rightmost in row)
                if (colIdx === 0 || colIdx === row.filter(cell => cell !== 'aisle').length - 1) {
                    features.push('Window');
                }

                // Check if it's an aisle seat (next to an aisle)
                if (
                    (colIdx > 0 && row[colIdx - 1] === 'aisle') ||
                    (colIdx < row.length - 1 && row[colIdx + 1] === 'aisle')
                ) {
                    features.push('Aisle');
                }

                // Extra legroom seats - first rows of each section
                if (rowIdx === 0) {
                    features.push('Extra Legroom');
                }

                // Preferred seating (middle sections, good rows)
                if (groupId.includes('mid') && rowIdx > 0 && rowIdx < 3) {
                    features.push('Preferred');
                }

                return features;
            };

            // Process each aircraft section
            updatedAircraft.forEach((section, sectionIdx) => {
                const { basePrice, priceMultipliers } = section;

                // Process each group in the section
                section.layout.forEach(group => {
                    const { layout, rowLabels, id: groupId } = group;
                    let seatCount = 0;

                    // Create 2D array of rows and columns to hold generated seats
                    for (let rowIdx = 0; rowIdx < layout.length; rowIdx++) {
                        let seatIdx = 0;

                        for (let colIdx = 0; colIdx < layout[rowIdx].length; colIdx++) {
                            const cell = layout[rowIdx][colIdx];

                            if (cell === 'seat') {
                                // Generate a unique seat ID
                                const rowLabel = rowLabels[rowIdx];
                                const colLabel = String.fromCharCode(65 + seatIdx); // A, B, C, etc.
                                const seatId = `${rowLabel}${colLabel}`;
                                seatIdx++;

                                // Determine seat features
                                const features = getSeatFeatures(
                                    section.id,
                                    groupId,
                                    rowIdx,
                                    colIdx,
                                    layout
                                );

                                // Calculate seat price based on features
                                let seatPrice = basePrice;
                                if (priceMultipliers) {
                                    features.forEach(feature => {
                                        if (feature === 'Window' && priceMultipliers.window) {
                                            seatPrice *= priceMultipliers.window;
                                        } else if (feature === 'Aisle' && priceMultipliers.aisle) {
                                            seatPrice *= priceMultipliers.aisle;
                                        } else if (
                                            feature === 'Extra Legroom' &&
                                            priceMultipliers.extraLegroom
                                        ) {
                                            seatPrice *= priceMultipliers.extraLegroom;
                                        } else if (
                                            feature === 'Preferred' &&
                                            priceMultipliers.preferred
                                        ) {
                                            seatPrice *= priceMultipliers.preferred;
                                        }
                                    });
                                }

                                // Randomize some seats as booked (higher chance in better positions)
                                const isBooked =
                                    Math.random() <
                                    0.3 + (sectionIdx === 0 ? 0.2 : sectionIdx === 1 ? 0.1 : 0);

                                // Create the seat object
                                group.seats[seatId] = {
                                    id: `${section.id}-${groupId}-${seatId}`,
                                    status: isBooked ? 'booked' : 'available',
                                    price: Math.round(seatPrice),
                                    features,
                                    position: {
                                        x: colIdx,
                                        y: rowIdx,
                                    },
                                };

                                seatCount++;
                            }
                        }
                    }
                });
            });

            return updatedAircraft;
        };

        // Initialize the aircraft with seats
        setAircraft(generateSeats(aircraftConfig));

        // Set initial section based on flight class
        if (flightClass.toLowerCase().includes('business')) {
            setCurrentSection('business');
        } else if (flightClass.toLowerCase().includes('premium')) {
            setCurrentSection('premium');
        } else {
            setCurrentSection('economy');
        }
    }, [flightClass]);

    // Handle seat selection/deselection
    const handleSeatClick = useCallback(
        (seat: Seat, passengerIndex: number = selectedPassenger) => {
            if (seat.status === 'booked' || seat.status === 'unavailable') {
                toast.error('This seat is not available', {
                    description: 'Please select another seat from the available options.',
                });
                return;
            }

            // Handle deselection
            if (seat.status === 'selected' || selectedSeats.includes(seat.id)) {
                // Create a copy of selectedSeats
                const updatedSelectedSeats = [...selectedSeats];
                const seatIndex = updatedSelectedSeats.indexOf(seat.id);

                if (seatIndex !== -1) {
                    updatedSelectedSeats.splice(seatIndex, 1);
                    setSelectedSeats(updatedSelectedSeats);

                    // Update aircraft state to mark the seat as available
                    setAircraft(prev => {
                        const updated = [...prev];

                        // Find the section, group and seat
                        for (const section of updated) {
                            for (const group of section.layout) {
                                if (seat.id in group.seats) {
                                    group.seats[seat.id].status = 'available';
                                    break;
                                }
                            }
                        }

                        return updated;
                    });
                }
                return;
            }

            // Handle selection
            if (selectedSeats.length >= passengerCount) {
                toast.error('Maximum seats selected', {
                    description: `You can only select ${passengerCount} seats for your booking.`,
                    action: {
                        label: 'Change Selection',
                        onClick: () => {
                            // Toggle to the first seat's deselection if the user wants to change
                            if (selectedSeats.length > 0) {
                                const firstSeatId = selectedSeats[0];

                                // Find the seat object
                                let firstSeat: Seat | null = null;
                                for (const section of aircraft) {
                                    for (const group of section.layout) {
                                        for (const seatId in group.seats) {
                                            if (group.seats[seatId].id === firstSeatId) {
                                                firstSeat = group.seats[seatId];
                                                break;
                                            }
                                        }
                                        if (firstSeat) break;
                                    }
                                    if (firstSeat) break;
                                }

                                if (firstSeat) {
                                    handleSeatClick(firstSeat);
                                }
                            }
                        },
                    },
                });
                return;
            }

            // Add the seat to selection
            setSelectedSeats(prev => [...prev, seat.id]);

            // Update aircraft state to mark the seat as selected
            setAircraft(prev => {
                const updated = [...prev];

                // Find the section, group and seat
                for (const section of updated) {
                    for (const group of section.layout) {
                        if (seat.id in group.seats) {
                            group.seats[seat.id].status = 'selected';
                            break;
                        }
                    }
                }

                return updated;
            });

            // Move to next passenger
            if (passengerCount > 1 && selectedSeats.length < passengerCount - 1) {
                setSelectedPassenger(Math.min(passengerCount - 1, passengerIndex + 1));
            }
        },
        [aircraft, selectedSeats, passengerCount, selectedPassenger]
    );

    // Find a seat by ID throughout the aircraft
    const findSeatById = useCallback(
        (seatId: string): Seat | null => {
            for (const section of aircraft) {
                for (const group of section.layout) {
                    for (const id in group.seats) {
                        if (group.seats[id].id === seatId) {
                            return group.seats[id];
                        }
                    }
                }
            }
            return null;
        },
        [aircraft]
    );

    // Get the current section data
    const getCurrentSection = useCallback((): AircraftSection | undefined => {
        return aircraft.find(section => section.id === currentSection);
    }, [aircraft, currentSection]);

    // Get the total price for all selected seats
    const getTotalPrice = useCallback((): number => {
        let total = 0;

        selectedSeats.forEach(seatId => {
            const seat = findSeatById(seatId);
            if (seat) {
                total += seat.price;
            }
        });

        return total;
    }, [selectedSeats, findSeatById]);

    // Handle zoom controls
    const handleZoomIn = () => {
        if (zoom < 150) setZoom(zoom + 10);
    };

    const handleZoomOut = () => {
        if (zoom > 70) setZoom(zoom - 10);
    };

    // Handle rotation (for 3D view)
    const handleRotateLeft = () => {
        setRotation((rotation - 15) % 360);
    };

    const handleRotateRight = () => {
        setRotation((rotation + 15) % 360);
    };

    // Handle section change
    const handleSectionChange = (sectionId: string) => {
        setCurrentSection(sectionId);
    };

    // Handle submission
    const handleSubmit = () => {
        if (selectedSeats.length < passengerCount) {
            toast.error('Not enough seats selected', {
                description: `Please select ${passengerCount} seats to continue.`,
            });
            return;
        }

        toast.success('Seats confirmed', {
            description: `Successfully selected ${selectedSeats.length} seats.`,
        });

        onSubmit(selectedSeats);
    };

    // Generate seat legends explanation
    const renderSeatLegend = () => {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-sm">
                <div className="flex items-center gap-1">
                    <div
                        className={`w-4 h-4 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}
                    ></div>
                    <span>Unavailable</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className={`w-4 h-4 rounded ${sectionTheme.available}`}></div>
                    <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className={`w-4 h-4 rounded ${sectionTheme.selected}`}></div>
                    <span>Selected</span>
                </div>
                <div className="flex items-center gap-1">
                    <div
                        className={`w-4 h-4 rounded ${sectionTheme.available} border-l-4 border-l-blue-500`}
                    ></div>
                    <span>Window</span>
                </div>
                <div className="flex items-center gap-1">
                    <div
                        className={`w-4 h-4 rounded ${sectionTheme.available} border-r-4 border-r-purple-500`}
                    ></div>
                    <span>Aisle</span>
                </div>
                <div className="flex items-center gap-1">
                    <div
                        className={`w-4 h-4 rounded ${sectionTheme.available} border-2 border-amber-500`}
                    ></div>
                    <span>Extra Legroom</span>
                </div>
            </div>
        );
    };

    // Render a single seat
    const renderSeat = (seat: Seat, seatRef: string, showLabel: boolean = true) => {
        const isSelected = selectedSeats.includes(seat.id);
        const features = seat.features || [];

        // Determine seat styling based on status and features
        let seatClass = '';

        if (seat.status === 'booked') {
            seatClass = `${
                isDark ? 'bg-gray-600 text-gray-400' : 'bg-gray-300 text-gray-500'
            } cursor-not-allowed`;
        } else if (seat.status === 'unavailable') {
            seatClass = `${
                isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'
            } cursor-not-allowed`;
        } else if (seat.status === 'selected' || isSelected) {
            seatClass = `${sectionTheme.selected} cursor-pointer`;
        } else {
            seatClass = `${sectionTheme.available} ${sectionTheme.hover} cursor-pointer`;
        }

        // Add feature styling
        const hasExtraLegroom = features.includes('Extra Legroom');
        const isWindow = features.includes('Window');
        const isAisle = features.includes('Aisle');

        if (hasExtraLegroom) {
            seatClass += ' border-2 border-amber-500';
        }

        if (isWindow) {
            seatClass += ' border-l-4 border-l-blue-500';
        }

        if (isAisle) {
            seatClass += ' border-r-4 border-r-purple-500';
        }

        return (
            <TooltipProvider key={seat.id}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-10 h-10 flex items-center justify-center rounded font-medium text-sm ${seatClass}`}
                            onClick={() => handleSeatClick(seat)}
                            onMouseEnter={() => setHoveredSeat(seat)}
                            onMouseLeave={() => setHoveredSeat(null)}
                        >
                            {showLabel ? seatRef : ''}
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent
                        side="top"
                        sideOffset={5}
                        className="p-0 overflow-hidden rounded-md"
                    >
                        <div
                            className={`p-2 ${
                                isDark ? 'bg-gray-800' : 'bg-white'
                            } shadow-lg rounded-md w-48`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-sm">Seat {seatRef}</h4>
                                <Badge
                                    variant={
                                        seat.status === 'booked'
                                            ? 'secondary'
                                            : seat.status === 'selected'
                                            ? 'default'
                                            : 'outline'
                                    }
                                >
                                    {seat.status === 'booked'
                                        ? 'Unavailable'
                                        : seat.status === 'selected'
                                        ? 'Selected'
                                        : 'Available'}
                                </Badge>
                            </div>
                            <div className={`text-xl font-bold ${sectionTheme.text}`}>
                                ${seat.price}
                            </div>
                            <div className="text-xs mt-1 space-y-1">
                                {features.length > 0 ? (
                                    features.map((feature, idx) => (
                                        <Badge key={idx} variant="outline" className="mr-1 text-xs">
                                            {feature}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-xs opacity-70">Standard seat</span>
                                )}
                            </div>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    };

    // Render a passenger list for assigning seats
    const renderPassengerSelector = () => {
        if (passengerCount <= 1) return null;

        return (
            <div className="mb-4 flex flex-wrap gap-2">
                {Array.from({ length: passengerCount }, (_, idx) => (
                    <Button
                        key={idx}
                        size="sm"
                        variant={selectedPassenger === idx ? 'default' : 'outline'}
                        onClick={() => setSelectedPassenger(idx)}
                        className="flex items-center gap-1"
                    >
                        <User size={14} />
                        <span>Passenger {idx + 1}</span>
                        {selectedSeats[idx] && (
                            <Badge variant="outline" className="ml-1">
                                {selectedSeats[idx].split('-').pop()?.substring(1)}
                            </Badge>
                        )}
                    </Button>
                ))}
            </div>
        );
    };

    // Render 2D cabin view
    const render2DView = () => {
        const section = getCurrentSection();
        if (!section) return null;

        return (
            <div className="flex flex-col items-center space-y-6 pt-4">
                {/* Aircraft front indicator */}
                <div
                    className={`text-center ${
                        isDark ? 'bg-gray-700' : 'bg-gray-100'
                    } px-6 py-3 rounded-lg`}
                >
                    <div className="flex items-center justify-center">
                        <Plane size={16} className="mr-2 transform -rotate-90" />
                        <span className="font-medium">FRONT OF AIRCRAFT</span>
                    </div>
                </div>

                {/* Main seat map */}
                <ScrollArea className="max-h-[450px] w-full rounded-lg">
                    <div
                        className="flex flex-col items-center gap-4 p-4"
                        style={{
                            transform: `scale(${zoom / 100})`,
                            transformOrigin: 'top center',
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        {section.layout.map((group, groupIndex) => (
                            <motion.div
                                key={group.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: groupIndex * 0.1 }}
                                className={`w-full ${
                                    isDark ? 'bg-gray-800' : 'bg-white'
                                } p-4 rounded-xl shadow-md`}
                            >
                                <div className="mb-2 flex justify-between items-center">
                                    <h3 className={`font-bold ${sectionTheme.text}`}>
                                        {group.name}
                                    </h3>
                                    <Badge variant="outline" className={sectionTheme.text}>
                                        {group.rowLabels[0]} -{' '}
                                        {group.rowLabels[group.rowLabels.length - 1]}
                                    </Badge>
                                </div>

                                <div
                                    className={`grid grid-cols-1 gap-4 ${
                                        isDark ? 'bg-gray-900' : 'bg-gray-50'
                                    } p-4 rounded-lg`}
                                >
                                    {group.layout.map((row, rowIndex) => {
                                        const rowLabel = group.rowLabels[rowIndex];

                                        return (
                                            <div
                                                key={`row-${rowLabel}`}
                                                className="flex items-center"
                                            >
                                                <div className="w-6 text-center font-medium text-sm">
                                                    {rowLabel}
                                                </div>
                                                <div className="flex items-center justify-center gap-1 flex-1">
                                                    {row.map((cell, cellIndex) => {
                                                        if (cell === 'aisle') {
                                                            return (
                                                                <div
                                                                    key={`aisle-${cellIndex}`}
                                                                    className="w-6"
                                                                />
                                                            );
                                                        }
                                                        if (cell === 'empty') {
                                                            return (
                                                                <div
                                                                    key={`empty-${cellIndex}`}
                                                                    className="w-10 h-10"
                                                                />
                                                            );
                                                        }

                                                        // Find the seat in the group's seats
                                                        let seatIndex = 0;
                                                        let targetSeatIndex = -1;

                                                        for (let i = 0; i <= cellIndex; i++) {
                                                            if (row[i] === 'seat') {
                                                                targetSeatIndex = seatIndex;
                                                                seatIndex++;
                                                            }
                                                        }

                                                        if (targetSeatIndex !== -1) {
                                                            const seatRef = `${rowLabel}${String.fromCharCode(
                                                                65 + targetSeatIndex
                                                            )}`;
                                                            const seat = group.seats[seatRef];

                                                            if (seat) {
                                                                return renderSeat(seat, seatRef);
                                                            }
                                                        }

                                                        return (
                                                            <div
                                                                key={`unknown-${cellIndex}`}
                                                                className="w-10 h-10 bg-gray-300 rounded"
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        );
    };

    // Render 3D perspective view
    const render3DView = () => {
        const section = getCurrentSection();
        if (!section) return null;

        return (
            <div className="flex flex-col items-center space-y-6 pt-4">
                <div className="relative w-full max-w-3xl h-[450px] overflow-hidden perspective-[1200px]">
                    <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-start pt-12 origin-center"
                        style={{
                            transform: `rotateX(45deg) rotateY(${rotation}deg) scale(${
                                zoom / 100
                            })`,
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        {/* Aircraft body */}
                        <div
                            className={`relative w-[80%] rounded-t-[100px] ${
                                isDark ? 'bg-gray-700' : 'bg-gray-200'
                            } overflow-hidden shadow-xl border border-gray-400`}
                        >
                            {/* Aircraft nose */}
                            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-b from-gray-300 to-gray-400" />

                            {/* Front indicator */}
                            <div
                                className={`text-center ${
                                    isDark ? 'bg-gray-600' : 'bg-gray-300'
                                } px-6 py-2`}
                            >
                                <div className="flex items-center justify-center">
                                    <Plane size={16} className="mr-2 transform -rotate-90" />
                                    <span className="font-medium text-sm">FRONT</span>
                                </div>
                            </div>

                            {/* Main cabin */}
                            <div className={`p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                                {section.layout.map((group, groupIndex) => (
                                    <motion.div
                                        key={group.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: groupIndex * 0.1 }}
                                        className={`mb-6 last:mb-0 p-3 rounded ${
                                            isDark ? 'bg-gray-900' : 'bg-gray-100'
                                        }`}
                                    >
                                        <h3
                                            className={`text-sm font-bold mb-2 ${sectionTheme.text}`}
                                        >
                                            {group.name}
                                        </h3>

                                        <div className="grid grid-cols-1 gap-2">
                                            {group.layout.map((row, rowIndex) => {
                                                const rowLabel = group.rowLabels[rowIndex];

                                                return (
                                                    <div
                                                        key={`row-${rowLabel}`}
                                                        className="flex items-center"
                                                    >
                                                        <div className="w-5 text-center font-medium text-xs">
                                                            {rowLabel}
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 flex-1">
                                                            {row.map((cell, cellIndex) => {
                                                                if (cell === 'aisle') {
                                                                    return (
                                                                        <div
                                                                            key={`aisle-${cellIndex}`}
                                                                            className="w-4"
                                                                        />
                                                                    );
                                                                }
                                                                if (cell === 'empty') {
                                                                    return (
                                                                        <div
                                                                            key={`empty-${cellIndex}`}
                                                                            className="w-8 h-8"
                                                                        />
                                                                    );
                                                                }

                                                                // Find the seat in the group's seats
                                                                let seatIndex = 0;
                                                                let targetSeatIndex = -1;

                                                                for (
                                                                    let i = 0;
                                                                    i <= cellIndex;
                                                                    i++
                                                                ) {
                                                                    if (row[i] === 'seat') {
                                                                        targetSeatIndex = seatIndex;
                                                                        seatIndex++;
                                                                    }
                                                                }

                                                                if (targetSeatIndex !== -1) {
                                                                    const seatRef = `${rowLabel}${String.fromCharCode(
                                                                        65 + targetSeatIndex
                                                                    )}`;
                                                                    const seat =
                                                                        group.seats[seatRef];

                                                                    if (seat) {
                                                                        // Smaller seats in 3D view
                                                                        return (
                                                                            <div
                                                                                key={`seat-${seatRef}`}
                                                                                className="transform-gpu hover:scale-110 transition-transform"
                                                                            >
                                                                                {renderSeat(
                                                                                    seat,
                                                                                    seatRef,
                                                                                    false
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    }
                                                                }

                                                                return (
                                                                    <div
                                                                        key={`unknown-${cellIndex}`}
                                                                        className="w-8 h-8 bg-gray-300 rounded"
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    };

    // Render cabin interior view
    const renderCabinView = () => {
        const section = getCurrentSection();
        if (!section) return null;

        return (
            <div className="flex flex-col items-center space-y-6 pt-4">
                <div
                    className={`relative w-full max-w-3xl h-[450px] rounded-xl overflow-hidden ${
                        isDark ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg`}
                >
                    {/* Panoramic cabin view - simple interpretation */}
                    <div
                        className={`w-full h-full relative overflow-hidden bg-gradient-to-b ${
                            isDark ? 'from-gray-700 to-gray-900' : 'from-gray-100 to-gray-200'
                        }`}
                    >
                        {/* Cabin ceiling */}
                        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-400 to-transparent"></div>

                        {/* Windows on sides */}
                        <div className="absolute top-12 left-0 bottom-0 w-20 flex flex-col justify-around">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={`window-left-${i}`}
                                    className="w-12 h-12 rounded-full bg-blue-200 opacity-60 ml-2"
                                ></div>
                            ))}
                        </div>

                        <div className="absolute top-12 right-0 bottom-0 w-20 flex flex-col justify-around">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={`window-right-${i}`}
                                    className="w-12 h-12 rounded-full bg-blue-200 opacity-60 mr-2"
                                ></div>
                            ))}
                        </div>

                        {/* Seats section */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/4 w-[70%] flex flex-col items-center">
                            <div
                                className={`mb-4 text-center px-4 py-2 rounded-lg ${sectionTheme.primary} text-white font-bold`}
                            >
                                {section.name} View
                            </div>

                            <div
                                className={`w-full p-4 rounded-lg ${
                                    isDark ? 'bg-gray-800 bg-opacity-80' : 'bg-white bg-opacity-80'
                                }`}
                            >
                                <p className="text-center mb-2">Tap a seat below to select</p>

                                {/* Simplified seat grid for this view */}
                                <div className="grid grid-cols-3 gap-4">
                                    {section.layout[0] &&
                                        section.layout[0].layout[0].map((cell, cellIndex) => {
                                            if (cell !== 'seat') return null;

                                            // Represent seat rows
                                            return (
                                                <div
                                                    key={`col-${cellIndex}`}
                                                    className="flex flex-col items-center gap-2"
                                                >
                                                    {Array.from({
                                                        length: Math.min(4, section.layout[0].rows),
                                                    }).map((_, rowIndex) => {
                                                        const rowLabel =
                                                            section.layout[0].rowLabels[rowIndex];
                                                        let seatIndex = 0;
                                                        let targetSeatIndex = -1;

                                                        // Count seats until this position
                                                        for (let i = 0; i <= cellIndex; i++) {
                                                            if (
                                                                section.layout[0].layout[0][i] ===
                                                                'seat'
                                                            ) {
                                                                targetSeatIndex = seatIndex;
                                                                seatIndex++;
                                                            }
                                                        }

                                                        if (targetSeatIndex !== -1) {
                                                            const seatRef = `${rowLabel}${String.fromCharCode(
                                                                65 + targetSeatIndex
                                                            )}`;
                                                            const seat =
                                                                section.layout[0].seats[seatRef];

                                                            if (seat) {
                                                                // Simplified seat representation
                                                                return (
                                                                    <motion.div
                                                                        key={`seat-${seatRef}`}
                                                                        className="transform-gpu hover:scale-110 transition-transform"
                                                                        style={{
                                                                            perspective: '800px',
                                                                            transformStyle:
                                                                                'preserve-3d',
                                                                        }}
                                                                    >
                                                                        <motion.div
                                                                            className="origin-bottom"
                                                                            style={{
                                                                                transform:
                                                                                    'rotateX(20deg)',
                                                                            }}
                                                                        >
                                                                            {renderSeat(
                                                                                seat,
                                                                                seatRef
                                                                            )}
                                                                        </motion.div>
                                                                    </motion.div>
                                                                );
                                                            }
                                                        }

                                                        return null;
                                                    })}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>

                        {/* Cabin floor */}
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-400 to-transparent"></div>
                    </div>
                </div>
            </div>
        );
    };

    // Render seat information panel
    const renderInfoPanel = () => {
        const currentSeat =
            hoveredSeat || (selectedSeats.length > 0 ? findSeatById(selectedSeats[0]) : null);

        return (
            <Card className="w-full">
                <CardContent className="pt-6">
                    {currentSeat ? (
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {currentSeat.id.split('-').pop()}
                                    </h3>
                                    <p className="text-sm opacity-70">
                                        {getCurrentSection()?.name}
                                    </p>
                                </div>
                                <Badge
                                    variant={
                                        currentSeat.status === 'selected' ? 'default' : 'outline'
                                    }
                                >
                                    {currentSeat.status.charAt(0).toUpperCase() +
                                        currentSeat.status.slice(1)}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="text-2xl font-bold">${currentSeat.price}</div>
                                <div className="flex flex-wrap gap-1">
                                    {(currentSeat.features || []).map((feature, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs">
                                            {feature}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-2 text-sm">
                                <p>
                                    This seat is{' '}
                                    {(currentSeat.features || []).includes('Extra Legroom')
                                        ? 'located in an extra legroom row with '
                                        : 'a standard seat with '}
                                    {(currentSeat.features || []).includes('Window')
                                        ? 'a window view.'
                                        : (currentSeat.features || []).includes('Aisle')
                                        ? 'easy aisle access.'
                                        : 'a middle position.'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-4 text-center">
                            <Info size={24} className="mb-2 opacity-50" />
                            <p>Hover over a seat to see details</p>
                            <p className="text-sm opacity-70">
                                Or select a seat to add it to your booking
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    // Render UI controls
    const renderControls = () => {
        return (
            <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomOut}
                        disabled={zoom <= 70}
                    >
                        <ZoomOut size={16} />
                    </Button>
                    <Slider
                        className="w-24 mx-2"
                        value={[zoom]}
                        min={70}
                        max={150}
                        step={10}
                        onValueChange={values => setZoom(values[0])}
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomIn}
                        disabled={zoom >= 150}
                    >
                        <ZoomIn size={16} />
                    </Button>
                </div>

                {viewMode === '3d' && (
                    <div className="flex items-center">
                        <Button variant="outline" size="sm" onClick={handleRotateLeft}>
                            <RotateCcw size={16} />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-1"
                            onClick={handleRotateRight}
                        >
                            <RotateCcw size={16} className="transform scale-x-[-1]" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-1"
                            onClick={() => setRotation(0)}
                        >
                            <span className="text-xs">Reset</span>
                        </Button>
                    </div>
                )}

                <Button variant="outline" size="sm" onClick={() => setLegends(!legends)}>
                    <Info size={16} className="mr-1" />
                    {legends ? 'Hide' : 'Show'} Legend
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedInfo(expandedInfo ? null : currentSection)}
                    className="ml-auto"
                >
                    <Info size={16} className="mr-1" />
                    Cabin Info
                </Button>
            </div>
        );
    };

    // If aircraft data is not yet loaded
    if (aircraft.length === 0) {
        return (
            <div className="w-full py-12 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <Plane size={48} className="opacity-30 mb-4" />
                    <p>Loading aircraft seating...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Back Navigation */}
            {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
                    <ChevronLeft size={16} className="mr-1" />
                    Back
                </Button>
            )}

            <div className="flex flex-col space-y-4">
                <Card className="overflow-hidden">
                    <div className="px-6 pt-6 pb-2">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                            <div>
                                <h2 className="text-2xl font-bold">Select Your Seats</h2>
                                <p className="opacity-70">
                                    Choose {passengerCount}{' '}
                                    {passengerCount === 1 ? 'seat' : 'seats'} to continue
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="font-medium">
                                    {selectedSeats.length} of {passengerCount} selected
                                </span>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={selectedSeats.length !== passengerCount}
                                >
                                    Confirm Seats
                                </Button>
                            </div>
                        </div>

                        {/* Section Tabs */}
                        <Tabs
                            defaultValue={currentSection}
                            onValueChange={handleSectionChange}
                            className="w-full"
                        >
                            <TabsList className="w-full grid grid-cols-3">
                                {aircraft.map(section => (
                                    <TabsTrigger
                                        key={section.id}
                                        value={section.id}
                                        className="flex items-center gap-1"
                                    >
                                        {section.id === 'business' ? (
                                            <Crown size={16} className="text-amber-500" />
                                        ) : section.id === 'premium' ? (
                                            <Plus size={16} className="text-indigo-500" />
                                        ) : (
                                            <Plane size={16} className="text-sky-500" />
                                        )}
                                        <span>{section.name}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {/* View Mode Tabs */}
                            <div className="flex mt-4 mb-2">
                                <Button
                                    variant={viewMode === '2d' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('2d')}
                                    className="rounded-r-none"
                                >
                                    2D View
                                </Button>
                                <Button
                                    variant={viewMode === '3d' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('3d')}
                                    className="rounded-none border-x-0"
                                >
                                    3D View
                                </Button>
                                <Button
                                    variant={viewMode === 'cabin' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('cabin')}
                                    className="rounded-l-none"
                                >
                                    Cabin View
                                </Button>
                            </div>

                            {renderControls()}

                            {/* Legends */}
                            <AnimatePresence>
                                {legends && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        {renderSeatLegend()}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Expanded Section Info */}
                            <AnimatePresence>
                                {expandedInfo && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden mt-4"
                                    >
                                        {getCurrentSection() && (
                                            <Card className={`border-l-4 ${sectionTheme.border}`}>
                                                <CardContent className="py-4">
                                                    <h3
                                                        className={`font-bold ${sectionTheme.text} mb-1`}
                                                    >
                                                        {getCurrentSection()?.name}
                                                    </h3>
                                                    <p className="text-sm mb-2">
                                                        {getCurrentSection()?.description}
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                                        <div className="flex items-center gap-1">
                                                            <Badge
                                                                variant="outline"
                                                                className={sectionTheme.text}
                                                            >
                                                                Base price
                                                            </Badge>
                                                            <span className="font-medium">
                                                                ${getCurrentSection()?.basePrice}
                                                            </span>
                                                        </div>
                                                        {getCurrentSection()?.priceMultipliers && (
                                                            <>
                                                                <div className="flex items-center gap-1">
                                                                    <Badge
                                                                        variant="outline"
                                                                        className={
                                                                            sectionTheme.text
                                                                        }
                                                                    >
                                                                        Window seat
                                                                    </Badge>
                                                                    <span>
                                                                        +
                                                                        {Math.round(
                                                                            (getCurrentSection()
                                                                                ?.priceMultipliers
                                                                                ?.window || 1) *
                                                                                100 -
                                                                                100
                                                                        )}
                                                                        %
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <Badge
                                                                        variant="outline"
                                                                        className={
                                                                            sectionTheme.text
                                                                        }
                                                                    >
                                                                        Aisle seat
                                                                    </Badge>
                                                                    <span>
                                                                        +
                                                                        {Math.round(
                                                                            (getCurrentSection()
                                                                                ?.priceMultipliers
                                                                                ?.aisle || 1) *
                                                                                100 -
                                                                                100
                                                                        )}
                                                                        %
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <Badge
                                                                        variant="outline"
                                                                        className={
                                                                            sectionTheme.text
                                                                        }
                                                                    >
                                                                        Extra legroom
                                                                    </Badge>
                                                                    <span>
                                                                        +
                                                                        {Math.round(
                                                                            (getCurrentSection()
                                                                                ?.priceMultipliers
                                                                                ?.extraLegroom ||
                                                                                1) *
                                                                                100 -
                                                                                100
                                                                        )}
                                                                        %
                                                                    </span>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {aircraft.map(section => (
                                <TabsContent key={section.id} value={section.id} className="pt-2">
                                    {/* Passenger selection for multiple passengers */}
                                    {renderPassengerSelector()}

                                    {/* Render the correct view based on mode */}
                                    {viewMode === '2d' && render2DView()}
                                    {viewMode === '3d' && render3DView()}
                                    {viewMode === 'cabin' && renderCabinView()}
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </Card>

                {/* Bottom summary and info section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card className="lg:col-span-2">
                        <CardContent className="pt-6">
                            <h3 className="font-bold text-lg mb-2">Selected Seats</h3>

                            {selectedSeats.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {selectedSeats.map((seatId, idx) => {
                                        const seat = findSeatById(seatId);
                                        if (!seat) return null;

                                        const seatLabel = seatId.split('-').pop();
                                        const sectionName =
                                            seatId.split('-')[0].charAt(0).toUpperCase() +
                                            seatId.split('-')[0].slice(1);

                                        return (
                                            <Card
                                                key={seatId}
                                                className={`overflow-hidden border-l-4 ${sectionTheme.border}`}
                                            >
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <div className="flex items-center">
                                                                <h4 className="text-lg font-bold">
                                                                    {seatLabel}
                                                                </h4>
                                                                <Badge
                                                                    variant="outline"
                                                                    className="ml-2"
                                                                >
                                                                    Passenger {idx + 1}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm opacity-70">
                                                                {sectionName}
                                                            </p>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={() => handleSeatClick(seat)}
                                                        >
                                                            <ChevronLeft
                                                                size={16}
                                                                className="rotate-45"
                                                            />
                                                        </Button>
                                                    </div>

                                                    <div className="mt-2">
                                                        <div className="text-xl font-bold">
                                                            ${seat.price}
                                                        </div>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {(seat.features || []).map(
                                                                (feature, idx) => (
                                                                    <Badge
                                                                        key={idx}
                                                                        variant="outline"
                                                                        className="text-xs"
                                                                    >
                                                                        {feature}
                                                                    </Badge>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
                                    <User size={32} className="mb-2 opacity-50" />
                                    <p>No seats selected yet</p>
                                    <p className="text-sm opacity-70">
                                        Choose seats from the seat map above
                                    </p>
                                </div>
                            )}

                            {selectedSeats.length > 0 && (
                                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                    <div>
                                        <p className="text-sm opacity-70">
                                            Total for {selectedSeats.length}{' '}
                                            {selectedSeats.length === 1 ? 'seat' : 'seats'}
                                        </p>
                                        <p className="text-2xl font-bold">${getTotalPrice()}</p>
                                    </div>

                                    <Button
                                        onClick={handleSubmit}
                                        disabled={selectedSeats.length !== passengerCount}
                                    >
                                        Confirm Selection
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Seat info panel */}
                    <div className="lg:col-span-1">{renderInfoPanel()}</div>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
