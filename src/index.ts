import { ActivityType, Collection, IntentsBitField, Partials } from "discord.js";
import { config } from "dotenv";
import { CustomClient } from "./client/customClient";
import { loadEvents } from "./handlers/events";
import { loadSlashCommands } from "./handlers/slashCommands";
import { loadSelectMenuHandlers } from "./handlers/selectMenu";

config();

const client = new CustomClient(
    {
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.MessageContent,
            IntentsBitField.Flags.GuildPresences,
        ],
        partials: [
            Partials.Channel,
            Partials.GuildMember,
            Partials.Message,
        ],
    }
);

client.commands = new Collection();
  
loadEvents(client);
loadSlashCommands(client);
loadSelectMenuHandlers(client);

client.login(process.env.BOT_TOKEN);


