import { GalaxyCommand } from "#galaxy/builders";
import type { Galaxy } from "#galaxy/client";

import { ApplicationCommandType, EmbedBuilder, type ChatInputCommandInteraction } from "discord.js";

export default class PingCommand extends GalaxyCommand<ApplicationCommandType.ChatInput> {
	constructor() {
		super({
			data: {
				type: ApplicationCommandType.ChatInput,
				name: "ping",
				description: "Responde con el ping del bot.",
				dmPermission: false,
			},
			handle: {
				toGuild: true,
			},
		});
	}

	public async run(interaction: ChatInputCommandInteraction, client: Galaxy) {
		const embed = new EmbedBuilder().setColor(client.config.colors.extra).setDescription("[`🌌`] Calculando...").setTimestamp();

		const message = await interaction.reply({ embeds: [embed], fetchReply: true });

		const wsPing = Math.floor(client.ws.ping);
		const clientPing = Math.floor(message.createdTimestamp - interaction.createdTimestamp);

		embed.setColor(client.config.colors.success).setDescription(`[\`🌐\`] Pong! (API: **${wsPing}ms** - CLIENT: **${clientPing}ms**)`);

		await interaction.editReply({ embeds: [embed] });
	}
}
