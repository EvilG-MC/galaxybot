import { GalaxyEvent } from "#galaxy/builders";
import type { Galaxy } from "#galaxy/client";
import { commandsLitener } from "#galaxy/listeners";

import { Events, type Interaction } from "discord.js";

export default class InteractionCreate extends GalaxyEvent<Events.InteractionCreate> {
	constructor() {
		super({ name: Events.InteractionCreate });
	}

	public override async run(client: Galaxy, interaction: Interaction) {
		await commandsLitener(client, interaction);
	}
}
