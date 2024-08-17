import { CustomClient } from "@/client/customClient";
import { ICommand } from "@/types";
import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of available commands.'),
    execute: async (interaction: CommandInteraction) => {
        const client = interaction.client as CustomClient;

        const embed = new EmbedBuilder()
            .setAuthor({ name: client.user?.username as string, iconURL: interaction.user.displayAvatarURL() })
            .setTitle('Command List')
            .setDescription('Here is a list of available commands.')
            .setColor(Colors.Blurple)
            .setTimestamp();

        client.commands.forEach((command) => {
            embed.addFields({
                name: command.data.name,
                value: command.data.description
            });
        });

        interaction.reply({ embeds: [embed] });
    }
};

export default command;
