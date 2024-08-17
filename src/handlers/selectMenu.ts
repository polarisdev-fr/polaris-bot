import { CustomClient } from "@/client/customClient";
import path = require("path");
import fs = require("fs");
import { ISelectMenuHandler } from "@/types/";

export function loadSelectMenuHandlers(client: CustomClient) {
    const handlersPath = path.join(__dirname, "..", 'selectMenues');
    const handlerFiles = fs.readdirSync(handlersPath).filter(file => file.endsWith('.ts'));

    for (const file of handlerFiles) {
        const filePath = path.join(handlersPath, file);
        const handler: ISelectMenuHandler = require(filePath).default;

        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isStringSelectMenu()) return;
            if (interaction.customId === handler.customId) {
                try {
                    await handler.execute(client, interaction);
                } catch (error) {
                    console.error(`Error executing select menu handler ${handler.customId}:`, error);
                    await interaction.reply({ content: 'There was an error while processing your request!', ephemeral: true });
                }
            }
        });
    }
}
