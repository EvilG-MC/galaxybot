import { GalaxyHandler } from "#galaxy/builders";
import type { Galaxy } from "#galaxy/client";

export class Handlers extends GalaxyHandler {
	private client: Galaxy;

	constructor(client: Galaxy) {
		super();
		this.client = client;
	}

	public async load(): Promise<void> {
		const { client, table } = this;

		const files = await this.loadFiles("handlers");
		if (!files.length) return client.logger.warn("Galaxy doesn't have any handler to load.");

		await Promise.all(
			files.map(async (file) => {
				const GalaxyHandler = await this.import(file);
				const handler: GalaxyHandler = new GalaxyHandler();

				if (!(handler instanceof GalaxyHandler)) return;
				if (!handler) table.addRow("Missing", "Missing handler.");

				await handler.load(client);

				table.addRow(handler.name, "Loaded.");
			}),
		);

		console.log(table.toString());
		client.logger.info(`Client > Loaded: ${files.length} handlers.`);

		return;
	}
}
