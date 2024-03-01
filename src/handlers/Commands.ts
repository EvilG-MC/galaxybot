import { GalaxyHandler, type GalaxyCommand, GalaxySubcommand } from "#galaxy/builders";
import type { Galaxy } from "#galaxy/client";

import { ApplicationCommandType } from "discord.js";

export default class Slash extends GalaxyHandler {
	public async load(client: Galaxy) {
		const { table } = this;

		client.removeAllListeners();

		const files = await this.loadFiles("commands/interaction");
		if (!files.length) table.addRow("No commands.", "Empty.");

		await Promise.all(
			files.map(async (file) => {
				const GalaxyCommand = await this.import(file);
				const command: GalaxyCommand<ApplicationCommandType.ChatInput> = new GalaxyCommand();

				if (command instanceof GalaxySubcommand) return client.commands.subCommand.set(command.subCommand, command);

				if (!command) return table.addRow("Missing", "Missing event.");
				if (!command.data.name) return table.addRow("Missing", "Missing event name.");

				if (command.data.type !== ApplicationCommandType.ChatInput) return table.addRow(command.data.name, "Invalid command type.");
				if (command.handle.disabled) return table.addRow(command.data.name, "Disabled.");

				if (!command.data.description) return table.addRow(command.data.name, "Missing command description.");

				client.commands.interaction.set(command.data.name, command);
				table.addRow(command.data.name, "Loaded.");
			}),
		);

		return console.log(table.toString());
	}
}
