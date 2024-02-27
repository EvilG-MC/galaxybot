import { GalaxyConfiguration } from "#galaxy/types";
import dotenv from "dotenv";

dotenv.config();

export const Configuration: GalaxyConfiguration = {
    token: process.env.TOKEN,
    databaseURL: process.env.DATABASE_URL,
};