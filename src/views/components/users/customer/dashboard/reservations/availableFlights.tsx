import { AvailableFlight } from '@src/views/interfaces/interface'
import AvailableFlightCard from './availableFlightCard'

type AvailableFlightProps = {

    openFlightDetailsViewPage: () => void; 
    flights: AvailableFlight[];
}

const refundableBadges = ["partially", "non", "fully"] as const;
const sortOptionBadges = ["recommended", "cheapest", "fastest"] as const;

function getRandomNumber(offset: number, stop: number) {
    return Math.floor(Math.random() * (stop - offset + 1)) + offset;
}

function AvailableFlights(props: AvailableFlightProps) {
  
    return (
        <ul className='flex flex-col gap-4'>
            {props.flights.map((flight, index) => (
                <li 
                    key={`${index + 1}-${flight.publicId}`}
                    className={`
                        w-full items-center bg-white border border-gray-200 text-gray-800 
                        rounded-2xl dark:bg-[#202A3A] dark:border-neutral-700 dark:text-white
                    `}
                >
                    <AvailableFlightCard 
                        openFlightDetailsViewPage={props.openFlightDetailsViewPage}
                        key={index}
                        {...flight}
                        badge={{
                            refundable: refundableBadges[getRandomNumber(0, 2)],
                            sortOption: sortOptionBadges[getRandomNumber(0, 2)]
                        }}                    />
                </li>
            ))}
        </ul>
    )
}

export default AvailableFlights
