import { IEvent } from "@/types";
import { createCard } from "@/utils/cardUtil";
import { AttachmentBuilder, EmbedBuilder, Events, GuildMember } from "discord.js";

const event: IEvent = {
    name: Events.GuildMemberAdd,
    once: false,
    execute: async (member: GuildMember) => {

        const card = await createCard(
            'Welcome',
            member.user.username, 
            member.user.displayAvatarURL({ extension: 'jpg' })
        );

        const attachment = new AttachmentBuilder(await card, { name: 'profile.png' });

        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setImage('attachment://profile.png')
            .setFooter({ text: `${member.user.username}#${member.user.discriminator}`, iconURL: member.user.displayAvatarURL() })

        if(member.guild.id === '1272595038680907786')
            member.roles.add('1272640365140377600');
        else if(member.guild.id === '1274137186471776266')
            member.roles.add('1274186656752074794');
        
        member.guild.systemChannel?.send({ embeds: [embed], files: [attachment] });
    },
};

export default event;