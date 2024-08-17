import { CustomClient } from "@/client/customClient";
import path = require("path");
import fs = require("fs");
import { IEvent } from "@/types";

export function loadEvents(client: CustomClient) {
    const eventsPath = path.join(__dirname, "..", 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event: IEvent = require(filePath).default;
        if (event.once) {
            client.once(event.name as any, (...args) => event.execute(...args));
        } else {
            client.on(event.name as any, (...args) => event.execute(...args));
        }
    }
}