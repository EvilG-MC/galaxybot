import type { Galaxy } from "#galaxy/client";
import { getDepth } from "#galaxy/utils/Logger.js";
import { Colors, type Interaction } from "discord.js";

export async function commandsLitener(client: Galaxy, interaction: Interaction) {
	const { developerIds } = client.config;

	if (interaction.isAutocomplete()) {
		const { commandName, guild, user } = interaction;

		const command = client.commands.interaction.get(commandName);
		if (!command || !guild || !command.autocomplete || !interaction.inCachedGuild()) return;

		if (command.handle?.onlyDeveloper && !developerIds.includes(user.id)) return;
		if (command.handle?.onlyOwner && guild.ownerId !== user.id) return;

		try {
			await command.autocomplete(interaction, client);
		} catch (error) {
			if (error instanceof Error) {
				return client.logger.error(`Error > ${getDepth(error)}`);
			}
		}
	} else if (interaction.isChatInputCommand()) {
		const { commandName, guild, user, options } = interaction;

		const command = client.commands.interaction.get(commandName);
		if (!command || !guild || !interaction.inCachedGuild()) return;

		const subCmd = options.getSubcommand(false);
		const subCmdGroup = options.getSubcommandGroup(false);

		const subCommand =
			client.commands.subCommand.get(`${commandName}.${subCmd}`) ??
			client.commands.subCommand.get(`${commandName}.${subCmdGroup}.${subCmd}`);

		if (command.handle?.onlyDeveloper && !developerIds.includes(user.id))
			return interaction.reply({
				embeds: [{ description: "[`❌`] Solo el desarrollador del bot puede usar esto.", color: Colors.Red }],
				ephemeral: true,
			});
		if (command.handle?.onlyOwner && guild.ownerId !== user.id)
			return interaction.reply({
				embeds: [{ description: "[`❌`] Solo el dueño del servidor puede ejecutar esto.", color: Colors.Red }],
				ephemeral: true,
			});

		try {
			if (subCommand && !command.run) await subCommand.run(interaction, client);
			else if (!subCommand && command.run) await command.run(interaction, client);
		} catch (error) {
			if (error instanceof Error) {
				return client.logger.error(`Error > ${getDepth(error)}`);
			}
		}
	}
}
