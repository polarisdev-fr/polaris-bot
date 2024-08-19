import { RedisClient } from "@/lib/redis";
import { ICommand } from "@/types";
import { Client, Collection } from "discord.js";

export interface CustomClient extends Client {
    commands: Collection<ICommand, any>;
}

export class CustomClient extends Client {
    commands: Collection<ICommand, any>;
    // make client.redis available
    redis: RedisClient;    
    constructor(options: any) {
        super(options);
        this.commands = new Collection();
        this.redis = new RedisClient();
    }
}