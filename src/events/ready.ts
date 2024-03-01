import { GalaxyEvent } from "#galaxy/builders";
import { Events } from "discord.js";

import type { Galaxy } from "#galaxy/client";

export default class ReadyEvent extends GalaxyEvent<Events.ClientReady> {
	constructor() {
		super({
			name: Events.ClientReady,
			once: true,
		});
	}

	public override async run(client: Galaxy) {
		if (!client.user) return;

		client.logger.info(`API > Logged in as: ${client.user.tag}`);

		await client.deployCommands();
	}
}
