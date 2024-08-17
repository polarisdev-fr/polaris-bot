import { CustomClient } from "@/client/customClient";
import { IEvent } from "@/types";
import { Events } from "discord.js";

const event: IEvent = {
    name: Events.ClientReady,
    once: true,
    execute: (client: CustomClient) => {
        console.log(`Logged in as ${client.user?.tag}!`);
    },
};

export default event;