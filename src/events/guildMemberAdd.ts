import { IEvent } from "@/types";
import { applyText } from "@/utils/textUtil";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { AttachmentBuilder, EmbedBuilder, Events, GuildMember } from "discord.js";
import path = require("path");
import { request } from "undici";

const event: IEvent = {
    name: Events.GuildMemberAdd,
    once: false,
    execute: async (member: GuildMember) => {
        const canvas = createCanvas(440, 200);
        const ctx = canvas.getContext('2d');
        const bg = await loadImage(path.join(__dirname, '..', 'assets', 'profile.png'));

        ctx.fillStyle = '#7289DA';
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        const { body } = await request(member.user.displayAvatarURL({ extension: 'jpg' }));
        const avatar = await loadImage(body);

        ctx.beginPath();
        ctx.arc(102, 100, 30, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(avatar, 72, 70, 60, 60);

        ctx.restore();


        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';

        ctx.fillText('Profile', 0, 0);

        // Position the text and draw it on the canvas
        ctx.font = '30px bold sans-serif';
        ctx.fillText('Welcome !', canvas.width / 2.5, canvas.height / 3);

        // Apply text for the username and draw it
        const username = `${member?.user.username}`;
        ctx.font = applyText(canvas, username);
        ctx.fillText(username, canvas.width / 2.5, canvas.height / 1.8);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile.png' });

       const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setImage('attachment://profile.png')
        .setFooter({ text: `${member.user.username}#${member.user.discriminator}`, iconURL: member.user.displayAvatarURL() })

        member.roles.add('1274186656752074794');
        
        member.guild.systemChannel?.send({ embeds: [embed], files: [attachment] });
    },
};

export default event;