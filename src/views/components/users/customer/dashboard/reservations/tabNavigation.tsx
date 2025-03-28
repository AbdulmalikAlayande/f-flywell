import { Icon } from '@iconify-icon/react';
import { motion } from "framer-motion";
import React from "react";
import {AvailableFlight} from "@/views/interfaces/interface.ts";


interface TabNavigationProps {
    tabs: {id: number; label: string; icon: string}[]
    activeTab: {id: number; label: string; icon: string};
    setActiveTab: (tab: {id: number; label: string; icon: string}) => void;
    onTabSelect: () => AvailableFlight[];
}

export const TabNavigation = React.memo(({ tabs, activeTab, setActiveTab }: TabNavigationProps) => {
    
    return (

        <nav className="sticky top-0 z-10 bg-white dark:bg-[#202A3A] rounded-xl mb-4">
        
            <div className="flex items-center h-20 w-full font-medium">
                <ul className="relative list-none h-full w-full lg:w-1/2 flex items-center justify-start overflow-x-auto">
                    {tabs.map((tab) => (
                        <motion.li 
                            key={tab.id} 
                            className="flex flex-col md:flex-row items-center gap-4 dark:text-white px-4 pt-4 md:pt-0 w-full h-full relative cursor-pointer select-none text-[#0f1115]"
                            onClick={() => setActiveTab(tab)}
                            initial={false}
                            layout
                            animate={{
                                opacity: 1
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30
                            }}
                        >
                            
                            <Icon icon={tab.icon} />
                            <p className="whitespace-nowrap">{tab.label}</p>
                            
                            {tab === activeTab && (
                                <motion.span
                                    className="ml-2 md:mr-0 absolute bg-[#2563eb] bottom-0 left-0 right-0 h-1"
                                    layoutId="underline"
                                    // transition={{
                                    // type: "spring",
                                    // stiffness: 500,
                                    // damping: 30
                                    // }}
                                />
                            )}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </nav>
    );
  }); 