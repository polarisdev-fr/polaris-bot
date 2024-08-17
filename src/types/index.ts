import { CustomClient } from "@/client/customClient";
import { Events, SlashCommandBuilder, StringSelectMenuInteraction } from "discord.js";

interface ICommand {
    data: SlashCommandBuilder;
    category: string;
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