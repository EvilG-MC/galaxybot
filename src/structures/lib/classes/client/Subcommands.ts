import type { CommandsWithSub } from "#galaxy/types";
import type { Galaxy } from "#galaxy/client";

import type { Awaitable, ChatInputCommandInteraction } from "discord.js";

export abstract class GalaxySubcommand implements CommandsWithSub {
	/** Set the subcommand to listen. Ex: (`command.sub` or `command.group.sub`) */
	abstract subCommand: string;

	/**
	 *
	 * The subcommand run callback.
	 * @param interaction
	 * @param client
	 */
	public abstract run(interaction: ChatInputCommandInteraction, client: Galaxy): Awaitable<any>;
}
