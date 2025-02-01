import TextBlock from "../components/typography/textBlock";
import earthLogo from "@assets/images/png/plane-round-the-globe.png"
import HeroSearchFlight from "./heroSearchFlight";


const Hero = () => {



    return (
        <section className="relative">
            {/* Two Column */}
            <div className="flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24">
                {/* Left Column */}
                <div className={"relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left"}>
                    <TextBlock
                        text={"Seamless Airline Operations, Effortless Bookings!"}
                        subText={"A next-generation airline management system that simplifies flight reservations, crew scheduling, and seamless travel experiences."}
                    />

                    {/* Actions */}
                    <div className={"flex flex-col items-center sm:flex-row justify-center gap-8 lg:justify-start mt-8"}>
                        <button className={"font-bold px-8 lg:px-10 py-3 rounded bg-[#2563eb] dark:bg-[#1e40af] dark:text-gray-100 focus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300"}>Book a Flight</button>
                        <button className={"font-bold px-8 lg:px-10 py-3 rounded bg-[#2563eb] dark:bg-[#1e40af] dark:text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300"}>Our Services</button>
                    </div>
                </div>
                {/* Right Column */}
                <div className={"relative mt-12 lg:mt-0 flex flex-col justify-center"}>
                    <img src={earthLogo} alt="Hero Image" className="w-full object-cover" />
                </div>
            </div>

            {/* Search Flight */}
            <HeroSearchFlight/>
        </section>
    );
}

export default Hero