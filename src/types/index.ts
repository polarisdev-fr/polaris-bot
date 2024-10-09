import { CustomClient } from "@/client/customClient";
import { Events, PermissionsBitField, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, StringSelectMenuInteraction } from "discord.js";

interface ICommand {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
    category: string;
    permissions: bigint[];
    execute: (...args: any[]) => void;
}

interface IEvent {
    name: Events;
    once: boolean;
    execute: (...args: any[]) => void;
}

interface ISelectMenuHandler {
    customId: string;
    execute: (client: CustomClient, interaction: StringSelectMenuInteraction) => Promise<void>;
}

export type { ICommand, IEvent, ISelectMenuHandler };