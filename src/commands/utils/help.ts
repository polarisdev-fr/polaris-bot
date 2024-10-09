import { CustomClient } from "@/client/customClient";
import { ICommand } from "@/types";
import { CommandInteraction, EmbedBuilder, PermissionsBitField } from "discord.js";
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of available commands.'),
    permissions: [PermissionsBitField.Flags.ManageMessages],
    category: 'utils',
    execute: async (interaction: CommandInteraction) => {
        const client = interaction.client as CustomClient;

        // Use a Set to track unique categories
        const uniqueCategories = new Set<string>();

        // Create a select menu with command categories as folders
        const options = client.commands
            .map(command => {
                const category = command.category;
                if (category && !uniqueCategories.has(category)) {
                    uniqueCategories.add(category);
                    return new StringSelectMenuOptionBuilder()
                        .setLabel(category)
                        .setValue(category)
                        .setDescription(`View commands in the ${category} category.`);
                }
                return null; // Return null if category is already added
            })
            .filter(option => option !== null); // Remove null values from the options array

        // Build the select menu
        const select = new StringSelectMenuBuilder()
            .setCustomId('help-menu')
            .setPlaceholder('Make a selection!')
            .addOptions(options);

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.client.user?.username as string, iconURL: interaction.user.displayAvatarURL() })
            .setTitle('Help')
            .setDescription('Select a category to view the available commands.')
            .setColor("Blurple")
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(select);

        interaction.reply({ embeds: [embed], components: [row] });
    }
};

export default command;
