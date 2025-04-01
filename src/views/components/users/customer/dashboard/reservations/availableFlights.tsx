import { AvailableFlight } from '@src/views/interfaces/interface'
import AvailableFlightCard from './availableFlightCard'
import { motion, AnimatePresence } from 'framer-motion';

type AvailableFlightProps = {
    flights: AvailableFlight[];
    onFlightViewClick: () => void;
    setSelectedFlight: (flight: AvailableFlight) => void;
}

const refundableBadges = ["partially", "non", "fully"] as const;
const sortOptionBadges = ["recommended", "cheapest", "fastest"] as const;

function getRandomNumber(offset: number, stop: number) {
    return Math.floor(Math.random() * (stop - offset + 1)) + offset;
}

function AvailableFlights(props: AvailableFlightProps) {
  
    return (
        <AnimatePresence>
        
            <ul className='flex flex-col gap-4'>
                {props.flights.map((flight, index) => (
                    <motion.div 
                        key={`${index + 1}-${flight.publicId}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.1
                        }}
                        className={`
                            w-full items-center bg-white border border-gray-200 text-gray-800 
                            rounded-2xl dark:bg-[#202A3A] dark:border-neutral-700 dark:text-white
                        `}
                    >
                        <AvailableFlightCard 
                            onFlightViewClick={props.onFlightViewClick}
                            setSelectedFlight={props.setSelectedFlight}
                            key={index}
                            {...flight}
                            badge={{
                                refundable: refundableBadges[getRandomNumber(0, 2)],
                                sortOption: sortOptionBadges[getRandomNumber(0, 2)]
                            }}                    
                        />
                    </motion.div>
                ))}
            </ul>
        </AnimatePresence>
    )
}

export default AvailableFlights
