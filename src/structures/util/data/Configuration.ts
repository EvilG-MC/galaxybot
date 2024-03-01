import type { GalaxyConfiguration } from "#galaxy/types";
import dotenv from "dotenv";

dotenv.config();

export const Configuration: GalaxyConfiguration = {
	developerIds: [
		"391283181665517568", // <--- JustEvil
		"123", // <--- Example user id.
		"456", // <--- Other user id example.
	],
	token: process.env.TOKEN,
	databaseURL: process.env.DATABASE_URL,
	guildIds: [
		"970508955363188736", // <--- JustEvil's Test Server
		"123", // <--- Example guild id.
		"456", // <--- Other guild id example.
	],
	colors: {
		misc: 0x2f3884,
		success: 0x5aaeff,
		extra: 0xd6c6f7,
	},
};
