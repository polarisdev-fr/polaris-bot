import { CustomClient } from "@/client/customClient";
import { ICommand } from "@/types";
import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    category: 'utils',
    execute: async (interaction: CommandInteraction) => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.client.user?.username as string, iconURL: interaction.user.displayAvatarURL() })
            .addFields(
                {
                    name: '🏓 Pong!',
                    value: `Latency is ${Date.now() - interaction.createdTimestamp}ms.`,
                },
                {
                    name: ':robot: API Latency',
                    value: `API Latency is ${Math.round(interaction.client.ws.ping)}ms.`,
                }
            )
            .setColor(Colors.Blurple)
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
};

export default command;
