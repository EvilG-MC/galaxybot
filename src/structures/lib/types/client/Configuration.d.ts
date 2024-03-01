interface GalaxyColors {
	misc: number;
	success: number;
	extra: number;
}

export interface GalaxyConfiguration {
	/** The bot token. */
	token: string;
	/** The bot database URL. */
	databaseURL: string;
	/** The bot developer guild(s). */
	guildIds: string[];
	/** The bot developer user id(s). */
	developerIds: string[];
	/** The main bot embed colors. */
	colors: GalaxyColors;
}
