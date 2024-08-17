// write slashCommands handler here
import path = require("path");
import fs = require("fs");
import { CustomClient } from "@/client/customClient";
import { REST, Routes } from "discord.js";
import { ICommand } from "@/types";

export async function loadSlashCommands(client: CustomClient) {
    const commands = [];

    const foldersPath = path.join(__dirname, "..", 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const commandModule = await import(filePath);
            const command: ICommand = commandModule.default;
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(process.env.BOT_TOKEN as string);

    // and deploy your commands!
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID as string),
                { body: commands },
            );

            console.log(`Successfully reloaded application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
} 

