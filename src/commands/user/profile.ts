import { ICommand } from "@/types";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { AttachmentBuilder, Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { request } from "undici";
import path = require("path");
import { applyText } from "@/utils/textUtil";
import fs = require("fs");

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('View your profile.'),
    category: 'user',
    execute: async (interaction: CommandInteraction) => {

        const canvas = createCanvas(440, 200);
        const ctx = canvas.getContext('2d');
        const bg = await loadImage(path.join(__dirname, '..', '..', 'assets', 'profile.png'));

        ctx.fillStyle = '#7289DA';
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        const { body } = await request(interaction.user.displayAvatarURL({ extension: 'jpg' }));
        const avatar = await loadImage(body);

         // Reset clipping path to allow full canvas drawing
         ctx.restore();
 
         // Set font and fill style for the text
         ctx.font = '28px sans-serif';
         ctx.fillStyle = '#fff';
 
         // Position the text and draw it on the canvas
         ctx.font = '30px bold sans-serif';
         ctx.fillText('Profile', canvas.width / 2.5, canvas.height / 3);
 
         // Apply text for the username and draw it
         const username = `${interaction.member?.user.username}`;
         ctx.font = applyText(canvas, username);
         ctx.fillText(username, canvas.width / 2.5, canvas.height / 1.8);

        // Start the circular clipping path
        ctx.beginPath();
        ctx.arc(102, 100, 30, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // Draw the avatar image within the circular clipping area
        ctx.drawImage(avatar, 72, 70, 60, 60);

        // Save the image to a file (for testing)
        fs.writeFileSync('profile.png', canvas.toBuffer('image/png'));

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile.png' });

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
