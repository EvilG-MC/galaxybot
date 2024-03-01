import { type ApplicationCommandType, Client, Collection } from "discord.js";
import type { GalaxyConfiguration } from "#galaxy/types";

import { Configuration } from "#galaxy/utils/data/Configuration.js";
import { Logger, getDepth } from "#galaxy/utils/Logger.js";
import { Handlers } from "./modules/Handlers.js";

import type { GalaxyCommand, GalaxySubcommand } from "#galaxy/builders";

export class Galaxy extends Client {
	readonly config: GalaxyConfiguration;

	public logger: Logger;
	public handlers: Handlers;

	public commands: {
		interaction: Collection<string, GalaxyCommand<ApplicationCommandType.ChatInput>>;
		subCommand: Collection<string, GalaxySubcommand>;
	};

	constructor() {
		super({
			intents: ["Guilds"],
		});

		this.config = Configuration;

		this.logger = new Logger();
		this.handlers = new Handlers(this);

		this.commands = {
			interaction: new Collection(),
			subCommand: new Collection(),
		};

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

	/**
	 *
	 * Deploy the commands on `application` and `guilds`.
	 * @returns
	 */
	public async deployCommands(): Promise<void> {
		if (!this.application) return;

		this.logger.warn("API > Attemping to refresh commands...");

		// idk, i just wanna test it, so.
		const commands = [...this.commands.interaction.values()];
		const appArray = commands.filter(({ handle }) => !handle.toGuild).map(({ data }) => data);
		const devArray = commands.filter(({ handle }) => handle.toGuild).map(({ data }) => data);

		try {
			await this.application.commands.set(appArray);

			const guildIds = this.config.guildIds.filter(String);
			if (guildIds.length >= 1) {
				for (const guildId of guildIds) {
					const guild = await this.guilds.fetch(guildId).catch(() => null);
					if (guild) {
						await guild.commands.set(devArray);
						this.logger.info(`API > Commands deployed on: ${guild.name}.`);
					}
				}
			} else {
				this.logger.warn("API > No developer guild(s) found. Ignoring...");
			}

			this.logger.info("Client > Commands refreshed.");
		} catch (error) {
			this.logger.error(`API > ${getDepth(error)}`);
		}
	}
}
