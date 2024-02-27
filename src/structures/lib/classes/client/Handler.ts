import type { Awaitable } from "discord.js";
import { AsciiTable3 } from "ascii-table3";
import type { Galaxy } from "#galaxy/client";
import { InvalidImport } from "#galaxy/errors";

import { pathToFileURL } from "node:url";
import { readdir } from "node:fs/promises";
import { resolve, join } from "node:path";

export abstract class GalaxyHandler {
	/**
	 * The handler name.
	 */
	readonly name: string = this.constructor.name;
	/**
	 * The handler ascii-table to send.
	 */
	readonly table: AsciiTable3 = new AsciiTable3(this.name).setStyle("unicode-single");

	/**
	 *
	 * Get the file name from a path.
	 * @param file The file path.
	 * @returns
	 */
	private getFilename(file: string): string {
		return file.split(/[\\/]/).pop() ?? "---";
	}

	/**
	 *
	 * Load files from a specific directory.
	 * @param directory The directory to load.
	 * @returns
	 */
	protected async loadFiles(directory: string): Promise<string[]> {
		directory = resolve("dist", directory);

		const files: string[] = [];

		try {
			const searchFiles = await readdir(directory, { withFileTypes: true });
			if (!searchFiles.length) return files;

			for (const file of searchFiles) {
				const finalPath = join(directory, file.name);

				if (file.isFile()) files.push(finalPath);
				else if (file.isDirectory()) files.push(...(await this.loadFiles(finalPath)));
			}

			return files;
		} catch (_error) {
			return files;
		}
	}

	/**
	 *
	 * Import files, that's all.
	 * @param file The file path.
	 * @returns
	 */
	protected async import(file: string): Promise<any> {
		const result = (await import(`${pathToFileURL(file)}?updated=${Date.now()}`)).default;
		if (!result) throw new InvalidImport(`File: '${this.getFilename(file)}' is not exported as default or it's empty.`);
		return result;
	}

	/**
	 *
	 * Galaxy will execute this method
	 * When the handler is loaded.
	 */
	abstract load(client: Galaxy): Awaitable<void>;
}
