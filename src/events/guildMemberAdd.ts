import { IEvent } from "@/types";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { AttachmentBuilder, EmbedBuilder, Events, GuildMember } from "discord.js";
import path = require("path");
import { request } from "undici";

const event: IEvent = {
    name: Events.GuildMemberAdd,
    once: true,
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

        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';

        ctx.fillText('Profile', 0, 0);

        const username = `${member?.user.username}!`;
        ctx.font = '20px sans-serif';
        ctx.fillText(username, 0, 0);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile.png' });

       const embed = new EmbedBuilder()
        .addFields({
            name: 'Welcome!',
            value: `Welcome to the server, ${member.user.username}!`,
        },
        {
            name: 'User Joined',
            value: `User ${member.user.username}#${member.user.discriminator} has joined the server.`,
        })
        .setColor('Blurple')
        .setImage('attachment://profile.png')
        .setFooter({ text: `${member.user.username}#${member.user.discriminator}`, iconURL: member.user.displayAvatarURL() })

        member.roles.add('1274186656752074794');
        
        member.guild.systemChannel?.send({ embeds: [embed], files: [attachment] });
    },
};

export default event;