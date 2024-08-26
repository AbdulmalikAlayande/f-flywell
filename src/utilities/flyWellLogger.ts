import { format } from "date-fns";
import chalk from "chalk";


export const FlyWellLogger = {
	info: (message: string) => {
		const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
		console.log(chalk.blue(`[${timestamp}] INFO: ${message}`));
	},
	error: (message: string, error: Error | any) => {
		const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
		console.log(chalk.red(`[${timestamp}] ERROR: ${message}`), error);
	},
	warn: (message: string) => {
		const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
		console.log(chalk.yellow(`[${timestamp}] WARN: ${message}`));
	},
	debug: (message: string) => {
		const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
		console.log(chalk.magenta(`[${timestamp}] DEBUG: ${message}`));
	},
};