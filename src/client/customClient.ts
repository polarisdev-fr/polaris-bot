import { Client, Collection } from "discord.js";

export interface CustomClient extends Client {
    commands: Collection<string, any>;
}

export class CustomClient extends Client {
    commands: Collection<string, any>;

    constructor(options: any) {
        super(options);
        this.commands = new Collection();
    }
}