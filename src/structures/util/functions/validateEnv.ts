import { InvalidVariable } from "#galaxy/errors";

/**
 * Validate the environment variables localed in the `.env` file.
 */
export function validateEnv(): void {
    if (!process.env.TOKEN) throw new InvalidVariable("The variable: 'TOKEN' in the '.env' file is invalid.");
    if (!process.env.DATABASE_URL) throw new InvalidVariable("The variable: 'DATABASE_URL' in the '.env' file is invalid.");
};