import { ISelectMenuHandler } from "@/types";
import { EmbedBuilder } from "discord.js";

const starterSelectHandler: ISelectMenuHandler = {
    customId: 'help-menu',
    async execute(client, interaction) {
        const selectedCategory = interaction.values[0];

        const commandsInCategory = client.commands.filter(command => command.category === selectedCategory);

        if (commandsInCategory.size === 0) {
            await interaction.reply({ content: `No commands found in the ${selectedCategory} category.`, ephemeral: true });
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Commands`)
            .setDescription(commandsInCategory.map(command => `**/${command.data.name}**: ${command.data.description}`).join('\n'))
            .setColor("Blurple")
            .setTimestamp();

        await interaction.deferUpdate();

        await interaction.followUp({ embeds: [embed], ephemeral: true });

        if (interaction.message.deletable) {
            await interaction.message.delete();
        }
    }
};

export default starterSelectHandler;
