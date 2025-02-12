import FeatureCard from "../components/reusables/featureCard"
import TextBlock from "../components/typography/textBlock"
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaChartBar } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
// import { Icon } from "@iconify-icon/";


const Features = () => {


    return (
        <div className="relative">
            
            {/* Three Column Container */}
            <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-10 max-w-screen-xl mx-auto my-24 flex-wrap">
                <TextBlock 
                    className={"w-full h-full items-center"} 
                    text={"Our Services"} 
                    subText={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                />

                {/* Column */}
                <div className={"w-full h-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"}>
                    
                    <FeatureCard
                        title={"Dynamic Pricing Engine"}
                        content={"Enjoy smart pricing that adjusts automatically based on demand, seat type, and seasonal trends for optimal value."}
                        icon={<TbCurrencyNaira />}
                        className={"w-full max-h-svh flex flex-col gap-6 justify-evenly items-center rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105"}
                        textBlockClassName={"flex flex-col items-center gap-4 md:gap-6"}
                        iconClassName={"w-10 h-10 text-[#2563eb]"}
                    />

                    <FeatureCard
                        title={"Advanced Itinerary Management"}
                        content={"Easily create, modify, or cancel reservations with real-time notifications and seamless itinerary updates."}
                        // icon={<Icon icon={'carbon:flight-roster'} />}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32">
                                <path fill="currentColor" fillRule="evenodd" d="M26 6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h8v-2H8V6h16v6h2Z"></path>
                                <path fill="currentColor" d="M10 18h6v2h-6zm0-4h12v2H10z"></path>
                                <path fill="currentColor" fillRule="evenodd" d="M22 10v2H10v-2zm3 13l5 2v-2l-5-2.5V18a1 1 0 0 0-2 0v2.5L18 23v2l5-2v3.5L21 28v1l3-1l3 1v-1l-2-1.5z"></path>
                            </svg>
                        }
                        className={"w-full max-h-svh flex flex-col gap-6 justify-evenly items-center rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105"}
                        textBlockClassName={"flex flex-col items-center gap-4 md:gap-6"}
                        iconClassName={"w-10 h-10 text-[#2563eb]"}
                    />

                    <FeatureCard
                        title={"Secure Multi-Currency Payment"}
                        content={"Benefit from secure, integrated payment gateways that support multiple currencies and payment methods—online or in person."}
                        icon={<RiSecurePaymentFill />}
                        className={"w-full max-h-svh flex flex-col gap-6 justify-evenly items-center rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105"}
                        textBlockClassName={"flex flex-col items-center gap-4 md:gap-6"}
                        iconClassName={"w-10 h-10 text-[#2563eb]"}
                    />

                    <FeatureCard
                        title={"Customizable Flight Search"}
                        content={"Easily filter and sort flights by price, duration, and other criteria to find the best flight for your needs."}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 9.63l1.35 2.59c.6-1.05 1.51-1.91 2.6-2.48l-.77-3.29l3.89-3.89c.58-.59.58-1.56 0-2.122s-1.54-.586-2.12 0L10.61 4.33l-9.2-2.12L0 3.62L7.43 7.5l-3.89 3.9l-2.48-.35L0 12.11l3.18 1.76l1.77 3.19L6 16l-.34-2.5zM16.5 11c2.5 0 4.5 2 4.5 4.5c0 .88-.25 1.71-.69 2.4l3.08 3.1L22 22.39l-3.12-3.07c-.69.43-1.51.68-2.38.68c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0 0 5a2.5 2.5 0 0 0 0-5"></path></svg>}
                        className={"w-full max-h-svh flex flex-col gap-6  justify-evenly items-center rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105"}
                        textBlockClassName={"flex flex-col items-center gap-4 md:gap-6"}
                        iconClassName={"w-10 h-10 text-[#2563eb]"}
                    />

                    <FeatureCard
                        title={"Intuitive Flight Scheduling"}
                        content={"Instantly view live seat availability and flight schedules, ensuring you book the best option available."}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32"><path fill="currentColor" fillRule="evenodd" d="m25 23l5 2v-2l-5-2.5V18a1 1 0 0 0-2 0v2.5L18 23v2l5-2v3.5L21 28v1l3-1l3 1v-1l-2-1.5Z"></path><path fill="currentColor" fillRule="evenodd" d="M26 4h-4V2h-2v2h-8V2h-2v2H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h10v-2H6V6h4v2h2V6h8v2h2V6h4v7h2V6a2 2 0 0 0-2-2"></path></svg>}
                        className={"w-full max-h-svh flex flex-col gap-6 justify-evenly items-center rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105"}
                        textBlockClassName={"flex flex-col items-center gap-4 md:gap-6"}
                        iconClassName={"w-10 h-10 text-[#2563eb]"}
                    />
                    {/* icon: "icon-[memory--chart-bar]", */}
                    <FeatureCard 
                        title={"Comprehensive Analytics Dashboard"}
                        content={"Access detailed analytics on booking trends, flight performance, and revenue to make informed business decisions."}
                        icon={<FaChartBar />}
                        className={"w-full max-h-svh flex flex-col justify-evenly gap-6 items-center rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105"}
                        textBlockClassName={"flex flex-col items-center gap-4 md:gap-6"}
                        iconClassName={"w-10 h-10 text-[#2563eb]"}
                    />
                </div>
                
            </div>
        </div>
    )
}

export default Features