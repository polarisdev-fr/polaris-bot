import { createCanvas, loadImage } from "@napi-rs/canvas";
import { request } from "undici";
import path = require("path");
import { BufferResolvable } from "discord.js";
import { applyText } from "./textUtil";

export async function createCard(s: string, username: string, displayAvatarURL: string): Promise<BufferResolvable> {
    const canvas = createCanvas(440, 200);
    const ctx = canvas.getContext('2d');
    const bg = await loadImage(path.join(__dirname, '..', 'assets', 'profile.png'));

    ctx.fillStyle = '#7289DA';
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    const { body } = await request(displayAvatarURL);
    const avatar = await loadImage(body);

    ctx.restore();
 
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#fff';
 
    ctx.font = '30px bold sans-serif';
    ctx.fillText(s, canvas.width / 2.5, canvas.height / 3);
 
    ctx.font = applyText(canvas, username);
    ctx.fillText(username, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(102, 100, 30, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatar, 72, 70, 60, 60);

    return canvas.encode('png');
}