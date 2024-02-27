import { Galaxy } from "#galaxy/client";
import { Awaitable, ClientEvents } from "discord.js";

export type EventRunFn<K extends keyof ClientEvents> = (client: Galaxy, ...args: ClientEvents[K]) => Awaitable<any>;

export interface EventData<K extends keyof ClientEvents> {
    /** The event name. */
    name: K;
    /** Emit the event only one time. */
    once?: boolean;
    /** The handler will ignore the event. */
    disabled?: boolean;
};

export interface Events<K extends keyof ClientEvents> {
    /** The event data. */
    data: EventData<K>;
    /** The event run function. */
    run: EventRunFn<K>;
};