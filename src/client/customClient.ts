import { ICommand } from "@/types";
import { Client, Collection } from "discord.js";

export interface CustomClient extends Client {
    commands: Collection<ICommand, any>;
}

export class CustomClient extends Client {
    commands: Collection<ICommand, any>;

    constructor(options: any) {
        super(options);
        this.commands = new Collection();
    }
}