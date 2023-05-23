// Require the necessary discord.js classes
import {  GatewayIntentBits } from 'discord.js';
import DiscordClient from './discord-client.js'



// Create a new client instance
const client = new DiscordClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.loadCommand();
client.loadEvents();
// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

console.log('Discord client is ok!');
