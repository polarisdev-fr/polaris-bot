import { IEvent } from "@/types";
import { Events } from "discord.js";

const event: IEvent = {
    name: Events.ClientReady,
    once: true,
    execute: () => {
        console.log("Bot is ready!");
    },
};

export default event;