import { type GalaxyEvent, GalaxyHandler } from "#galaxy/builders";
import type { Galaxy } from "#galaxy/client";

import type { ClientEvents } from "discord.js";

export default class Events extends GalaxyHandler {
	public async load(client: Galaxy) {
		const { table } = this;

		client.removeAllListeners();

		const files = await this.loadFiles("events");
		if (!files.length) table.addRow("No events.", "Empty.");

		await Promise.all(
			files.map(async (file) => {
				const GalaxyEvent = await this.import(file);
				const event: GalaxyEvent<keyof ClientEvents> = new GalaxyEvent();

				if (!event) return table.addRow("Missing", "Missing event.");
				if (!event.data.name) return table.addRow("Missing", "Missing event name.");

				if (event.data.disabled) return table.addRow(event.data.name, "Disabled.");

				const execute = (...args: []) => event.run(client, ...args);

				if (event.data.once) client.once(event.data.name, execute);
				else client.on(event.data.name, execute);

				table.addRow(event.data.name, "Loaded.");
			}),
		);

		return console.log(table.toString());
	}
}
