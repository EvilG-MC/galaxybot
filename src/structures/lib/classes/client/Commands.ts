import type { Commands, HandleOptions, Interactions } from "#galaxy/types";
import type { Galaxy } from "#galaxy/client";

import type { ApplicationCommandData, ApplicationCommandType, AutocompleteInteraction, Awaitable } from "discord.js";

export abstract class GalaxyCommand<K extends ApplicationCommandType> implements Commands<K> {
	readonly data: ApplicationCommandData & { type: K };
	readonly handle: HandleOptions;

	constructor(command: Commands<K>) {
		this.data = command.data;
		this.handle = command.handle;
	}

	/**
	 *
	 * The command run callback.
	 * @param interaction
	 * @param client
	 */
	public run?(interaction: Interactions[K], client: Galaxy): Awaitable<any>;
	/**
	 *
	 * The command autocomplete callback.
	 * @param interaction
	 * @param client
	 */
	public autocomplete?(interaction: AutocompleteInteraction, client: Galaxy): Awaitable<any>;
}
