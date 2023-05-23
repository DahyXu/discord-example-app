import { Events } from 'discord.js'
import DiscordClient from '../discord-client.js';

 const readyEvent = {
	name: Events.ClientReady,
	once: true,
	execute(client: DiscordClient) {
		console.log(`Ready! Logged in as ${client.user?.tag}`);
	},
};

export default readyEvent;