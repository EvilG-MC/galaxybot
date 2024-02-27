import type { EventData, EventRunFn, Events } from "#galaxy/types";
import type { ClientEvents } from "discord.js";

export class GalaxyEvent<K extends keyof ClientEvents> implements Events<K> {
	readonly data: EventData<K>;
	readonly run: EventRunFn<K>;

	constructor(data: EventData<K>, run: EventRunFn<K>) {
		this.data = data;
		this.run = run;
	}
}
