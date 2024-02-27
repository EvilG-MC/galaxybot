import { GalaxyEvent } from "#galaxy/builders";

export default new GalaxyEvent({ name: "ready", once: true },
    async (client) => {
        if (!client.user) return;

        client.logger.info(`API > Logged in as: ${client.user.tag}`)
    },
);