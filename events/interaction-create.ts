import { Events, Interaction } from 'discord.js'
import DiscordClient from '../discord-client.js'

 const interactionEvent = {
	name: Events.InteractionCreate,
	async execute(interaction:Interaction) {
		if (!interaction.isChatInputCommand()) return;

		if ( !(interaction.client instanceof DiscordClient) ) return;

		const newClient: DiscordClient = interaction.client as DiscordClient;
		const command = newClient.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};

export default interactionEvent;