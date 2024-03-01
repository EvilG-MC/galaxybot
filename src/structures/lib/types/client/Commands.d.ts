import type {
	ApplicationCommandData,
	ApplicationCommandType,
	Awaitable,
	ChatInputCommandInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
} from "discord.js";
import type { Galaxy } from "#galaxy/client";

import type { Category } from "#galaxy/types";

export interface BaseOptions {
	/** The command category. */
	category: Category;
	/** The command cooldown. */
	cooldown: number;
	/** Send the command to the developer guild(s). */
	toGuild: boolean;

	/** Galaxy will ignore the command. */
	disabled?: boolean;
	/** Only the bot developer can use the command. */
	onlyDeveloper?: boolean;
	/** Obly the guild owner can use the command. */
	onlyOwner?: boolean;
}

export interface Commands<K extends ApplicationCommandType> {
	data: ApplicationCommandData & { type: K };
	handle: HandleOptions;
}

export interface Interactions {
	1: ChatInputCommandInteraction;
	2: UserContextMenuCommandInteraction;
	3: MessageContextMenuCommandInteraction;
}

export interface CommandsWithSub {
	subCommand: string;
}

export type HandleOptions = (BaseOptions & { toGuild: false }) | (Partial<BaseOptions> & { toGuild: true });
