import { Events } from 'discord.js'

 const readyEvent = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};

export default readyEvent;