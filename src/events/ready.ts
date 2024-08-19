import { CustomClient } from "@/client/customClient";
import { IEvent } from "@/types";
import { ActivityType, Events } from "discord.js";

const event: IEvent = {
    name: Events.ClientReady,
    once: true,
    execute: (client: CustomClient) => {
        console.log(`Logged in as ${client.user?.tag}!`);
        client.user?.setBanner('https://media.discordapp.net/attachments/1274209364667793469/1275141111114891325/Polaris_Logo-3.png?ex=66c4cf33&is=66c37db3&hm=a826f853c3accf30dbacd1eec9612dd082effa1ec538ce684bffb873d8fed1ab&=&format=webp&quality=lossless&width=2102&height=780');
        client.user?.setActivity(client.guilds.cache.get('1274137186471776266')?.memberCount + ' users', { type: ActivityType.Watching });
    },
};

export default event;