import { ICommand } from "@/types";
import { AttachmentBuilder, Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { createCard } from "@/utils/cardUtil";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('View your profile.'),
    category: 'user',
    execute: async (interaction: CommandInteraction) => {

        const card = await createCard(
            'Profile',
            interaction.user.username, 
            interaction.user.displayAvatarURL({ extension: 'jpg' })
        );

        const attachment = new AttachmentBuilder(card, { name: 'profile.png' });

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.client.user?.username as string, iconURL: interaction.user.displayAvatarURL() })
            .addFields(
                {
                    name: 'User Profile',
                    value: `Username: ${interaction.user.username}\nDiscriminator: ${interaction.user.discriminator}\nID: ${interaction.user.id}`,
                },
                {
                    name: 'User Created',
                    value: `Account created on ${interaction.user.createdAt.toUTCString()}`,
                }
            )
            .setImage('attachment://profile.png')
            .setColor(Colors.Blurple)
            .setTimestamp();

        interaction.reply({ embeds: [embed], files: [attachment] });
    }
};

export default command;
