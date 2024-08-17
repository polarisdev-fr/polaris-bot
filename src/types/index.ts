import { CustomClient } from "@/client/customClient";
import { Events, SlashCommandBuilder } from "discord.js";

interface ICommand {
    data: SlashCommandBuilder;
    execute: (...args: any[]) => void;
}

interface IEvent {
    name: Events;
    once: boolean;
    execute: (...args: any[]) => void;
}

export type { ICommand, IEvent };