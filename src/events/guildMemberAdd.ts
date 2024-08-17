import { IEvent } from "@/types";
import { EmbedBuilder, Events, GuildMember } from "discord.js";

const event: IEvent = {
    name: Events.GuildMemberAdd,
    once: true,
    execute: async (member: GuildMember) => {
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
        .setFooter({ text: `${member.user.username}#${member.user.discriminator}`, iconURL: member.user.displayAvatarURL() })
        
        member.guild.systemChannel?.send({ embeds: [embed] });
    },
};

export default event;