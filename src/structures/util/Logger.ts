import { inspect } from "node:util";
import chalk from "chalk";
import { InvalidHexColor } from "./Errors.js";

const customColor = "#5aaeff";

type Colors = "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "grey" | "black";

export class Logger {
    // ------------------------------------------ //
    //             Taken from Ganyu.
    /**
     *
     * Send a `ascii art` with the `GALAXY` text.
     * @returns
     */
    getWatermark(): void {
        console.log(
            chalk.hex(customColor)(`

             ██████╗  █████╗ ██╗      █████╗ ██╗  ██╗██╗   ██╗
            ██╔════╝ ██╔══██╗██║     ██╔══██╗╚██╗██╔╝╚██╗ ██╔╝
            ██║  ███╗███████║██║     ███████║ ╚███╔╝  ╚████╔╝ 
            ██║   ██║██╔══██║██║     ██╔══██║ ██╔██╗   ╚██╔╝  
            ╚██████╔╝██║  ██║███████╗██║  ██║██╔╝ ██╗   ██║   
             ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝                              
            
               ${chalk.italic(`>>   ${this.getRandomText()}`)}
        `),
        );
    }

    /**
     *
     * Get a random text to make it more lively...?
     * @returns
     */
    private getRandomText(): string {
        const texts = [
            "Starlight!",
            "Galaxy's guide!",
            "Space helper!",
            "Cosmic aid!",
            "Supernova!",
            "Stellar friend!",
            "Nebula guide!",
            "Celestial support!",
            "Interstellar ally!",
            "Planetary aid!",
            "Astronomical help!",
            "Orbiting support!",
            "Cosmic counselor!",
            "Stardust friend!",
            "Moonlight mentor!",
            "Constellation aid!",
            "Galactic guide!",
            "Interplanetary pal!",
            "Supernova friend!",
            "Cosmic companion!",
        ];

        return texts[Math.floor(Math.random() * texts.length)];
    }
    // ------------------------------------------ //

    /**
     *
     * Add padding to the log to make it more stylished.
     * @param label The label to add padding.
     * @returns
     */
    private addPadding(label: string): string {
        const maxLength = 6;
        const bar = "|";

        const spacesToAdd = maxLength - label.length;

        if (spacesToAdd <= 0) return bar;

        const spaces = " ".repeat(spacesToAdd);

        return spaces + bar;
    }
    // ------------------------------------------ //

	/**
	 * Get the locale time.
	 * @returns
	 */
	get getTime(): string {
		return new Date().toLocaleTimeString();
	}

	/**
	 * Get the locale date.
	 * @returns
	 */
	get getDate(): string {
		return new Date().toLocaleDateString();
	}

    /**
     * Return a custom `time format`.
     * @returns
     */
	get timeFormat(): string {
		return `${this.getDate} | ${this.getTime}`;
	}

	/**
	 *
	 * Send a custom console message.
	 * @param text Text to log.
	 * @returns
	 */
	public info(text: string): void {
		const label = "INFO";
		console.log(`[${chalk.grey(`${this.timeFormat}`)}] 🌌 [${chalk.hex(customColor)(label)}]${this.addPadding(label)} ${text}`);
	}

	/**
	 *
	 * Send a custom console message.
	 * @param text Text to log.
	 * @returns
	 */
	public warn(text: string): void {
		const label = "WARN";
		console.log(`[${chalk.grey(`${this.timeFormat}`)}] ✨ [${chalk.yellow(label)}]${this.addPadding(label)} ${text}`);
	}

	/**
	 *
	 * Send a custom console message.
	 * @param text Text to log.
	 * @returns
	 */
	public error(text: string): void {
		const label = "ERROR";
		console.log(`[${chalk.grey(`${this.timeFormat}`)}] 💀 [${chalk.red(label)}]${this.addPadding(label)} ${text}`);
	}

	/**
	 *
	 * @param label The label.
	 * @param emoji The emoji.
	 * @param color The color.
	 * @param text The text to log.
	 * @returns
	 */
	public custom(label: string, emoji: unknown, color: Colors, text: string): void {
		console.log(`[${chalk.grey(`${this.timeFormat}`)}] ${emoji} [${chalk[color](label)}]${this.addPadding(label)} ${text}`);
	}

	/**
	 *
	 * @param label The label.
	 * @param emoji The emoji.
	 * @param color The hex color.
	 * @param text The text to log.
	 * @returns
	 */
	public customHex(label: string, emoji: unknown, color: string, text: string): void {
		if (!color.startsWith("#") || !color.includes("#")) color = `#${color}`;

		const hexReg = /^(#)?([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
		if (!hexReg.test(color)) throw new InvalidHexColor(`"${color}" is not a valid hex color.`);

		console.log(`[${chalk.grey(`${this.timeFormat}`)}] ${emoji} [${chalk.hex(color)(label)}]${this.addPadding(label)} ${text}`);
	}
}

/**
 *
 * Represent an object in a legible form.
 * @param error - The error (?)
 * @returns
 */
export const getDepth = (error: any) => inspect(error, { depth: 0 });