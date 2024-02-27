import { Galaxy } from "#galaxy/client";
import { validateEnv } from "#galaxy/utils/functions/validateEnv.js";

validateEnv();

const client = new Galaxy();

export default client;
