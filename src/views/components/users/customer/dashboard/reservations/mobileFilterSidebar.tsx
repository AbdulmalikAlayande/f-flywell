import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
    ChevronDown,
} from 'lucide-react';

export const MobileFilterSidebar: React.FC = () => {
    const [priceRange, setPriceRange] = useState([100, 1000]);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setExpandedSection(current => 
            current === section ? null : section
        );
    };

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 space-y-6">
            {/* Stops Filter */}
            <FilterSection 
                title="Stops" 
                expanded={expandedSection === 'stops'}
                onToggle={() => toggleSection('stops')}
            >
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="direct-stop" />
                        <Label htmlFor="direct-stop">Direct</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="one-stop" />
                        <Label htmlFor="one-stop">1 Stop</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="multiple-stops" />
                        <Label htmlFor="multiple-stops">2+ Stops</Label>
                    </div>
                </div>
            </FilterSection>

            {/* Time Filter */}
            <FilterSection 
                title="Departure Time" 
                expanded={expandedSection === 'time'}
                onToggle={() => toggleSection('time')}
            >
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="morning" />
                        <Label htmlFor="morning">Morning (6 AM - 12 PM)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="afternoon" />
                        <Label htmlFor="afternoon">Afternoon (12 PM - 6 PM)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="evening" />
                        <Label htmlFor="evening">Evening (6 PM - 12 AM)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="night" />
                        <Label htmlFor="night">Night (12 AM - 6 AM)</Label>
                    </div>
                </div>
            </FilterSection>

            {/* Price Range Filter */}
            <FilterSection 
                title="Price Range" 
                expanded={expandedSection === 'price'}
                onToggle={() => toggleSection('price')}
            >
                <div className="space-y-4">
                    <Slider 
                        defaultValue={priceRange}
                        min={0}
                        max={2000}
                        step={50}
                        onValueChange={(value) => setPriceRange(value)}
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </FilterSection>
        </div>
    );
};

const FilterSection: React.FC<{
    title: string;
    children: React.ReactNode;
    expanded?: boolean;
    onToggle: () => void;
}> = ({ title, children, expanded, onToggle }) => {
    return (
        <div className="border-b border-gray-200 dark:border-neutral-700 pb-4">
            <button 
                onClick={onToggle}
                className="w-full flex justify-between items-center text-left font-semibold"
            >
                {title}
                <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                        expanded ? 'rotate-180' : ''
                    }`} 
                />
            </button>
            {expanded && (
                <div className="mt-4">
                    {children}
                </div>
            )}
        </div>
    );
};
