// logger.ts
import chalk from 'chalk';
import { format } from 'date-fns';

/**
 * Logger utility to handle different logging styles.
 */
class Logger {
    private static readonly TIMESTAMP_FORMAT = 'yyyy-MM-dd HH:mm:ss';

    private static getTimestamp(): string {
        return format(new Date(), this.TIMESTAMP_FORMAT);
    }

    static error(message: string): void {
        console.log(
            `${chalk.bgRed.black.bold(' ERROR ')} ${chalk.gray(this.getTimestamp())} - ${chalk.red(
                message
            )}`
        );
    }

    static info(message: string): void {
        console.log(
            `${chalk.bgBlue.black.bold(' INFO  ')} ${chalk.gray(
                this.getTimestamp()
            )} - ${chalk.blue(message)}`
        );
    }

    static warning(message: string): void {
        console.log(
            `${chalk.bgYellow.black.bold(' WARN  ')} ${chalk.gray(
                this.getTimestamp()
            )} - ${chalk.yellow(message)}`
        );
    }

    static success(message: string): void {
        console.log(
            `${chalk.bgGreen.black.bold(' SUCCESS ')} ${chalk.gray(
                this.getTimestamp()
            )} - ${chalk.green(message)}`
        );
    }

    static debug(message: string): void {
        console.log(
            `${chalk.bgMagenta.black.bold(' DEBUG ')} ${chalk.gray(
                this.getTimestamp()
            )} - ${chalk.magenta(message)}`
        );
    }
}

export default Logger;
