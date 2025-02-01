import { useTheme } from "@src/themeprovider";
import { useEffect } from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import Logger from "./logger";


export default function ThemeToggle() {
  
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        Logger.info("theme:: "+theme);
    }, [theme]);
    
    return (
        <button onClick={toggleTheme} className={"p-2 rounded-lg bg-gray-200 dark:bg-gray-800 transition-colors duration-300"}>
            {theme === "dark" ? <HiSun className={"w-6 h-6 text-yellow-400"} /> : <HiMoon className={"w-6 h-6 text-gray-700 dark:text-gray-200"} />}
        </button>
    );
}
