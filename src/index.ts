import { Collection, IntentsBitField, Partials } from "discord.js";
import { config } from "dotenv";
import { CustomClient } from "./client/customClient";
import { loadEvents } from "./handlers/events";
import { loadSlashCommands } from "./handlers/slashCommands";

config();

const client = new CustomClient(
    {
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.MessageContent,
        ],
        partials: [
            Partials.Channel,
            Partials.GuildMember,
            Partials.Message,
        ]
    }
);

client.commands = new Collection();

loadEvents(client);
loadSlashCommands(client);

client.login(process.env.BOT_TOKEN);


