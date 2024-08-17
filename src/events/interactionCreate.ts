import { IEvent } from "@/types";
import { Events } from "discord.js";

const event: IEvent = {
    name: Events.InteractionCreate,
    once: true,
    execute: async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                console.error(`Error while executing command ${interaction.commandName}: ${error}`);
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                console.error(`Error while executing command ${interaction.commandName}: ${error}`);
            }
        }
    },
};

export default event;