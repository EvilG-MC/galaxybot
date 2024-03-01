import type { EventData, Events } from "#galaxy/types";
import type { Galaxy } from "#galaxy/client";

import type { Awaitable, ClientEvents } from "discord.js";

export abstract class GalaxyEvent<K extends keyof ClientEvents> implements Events<K> {
	readonly data: EventData<K>;

	constructor(data: EventData<K>) {
		this.data = data;
	}

	/**
	 *
	 * The event run callback.
	 * @param client
	 * @param args
	 */
	public abstract run(client: Galaxy, ...args: ClientEvents[K]): Awaitable<any>;
}
