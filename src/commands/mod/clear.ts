import { CustomClient } from "@/client/customClient";
import { ICommand } from "@/types";
import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder, TextChannel } from "discord.js";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears messages in a channel.')
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('Amount of messages to clear.')
            .setRequired(false).setMinValue(1)
            .setMaxValue(100)
        ),
    category: 'mod',
    execute: async (interaction: CommandInteraction) => {
        const amount = interaction.options.get('amount', false)?.value as number || 100;
        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'You need to input a number between 1 and 100.', ephemeral: true });
        }

        const channel = interaction.channel as TextChannel;
        const messages = await channel.messages.fetch({ limit: amount });
        await channel.bulkDelete(messages);

        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setDescription(`Cleared ${amount} messages.`);

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
};

export default command;
