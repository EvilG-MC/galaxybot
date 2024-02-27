import { Client } from "discord.js";
import type { GalaxyConfiguration } from "#galaxy/types";
import { Configuration } from "#galaxy/utils/data/Configuration.js";
import { Logger } from "#galaxy/utils/Logger.js";
import { Handlers } from "./modules/Handlers.js";

export class Galaxy extends Client {
	readonly config: GalaxyConfiguration;

	public logger: Logger;
	public handlers: Handlers;

	constructor() {
		super({
			intents: ["Guilds"],
		});

		this.config = Configuration;

		this.logger = new Logger();
		this.handlers = new Handlers(this);

		this.start();
	}

	/**
	 *
	 * Start the main bot process.
	 * @returns
	 */
	private async start(): Promise<"🌌"> {
		this.logger.getWatermark();

		await this.handlers.load();
		await this.login(this.config.token);

		this.token = "💀";

		return "🌌";
	}
}
