import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

 const pingCmd = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction:ChatInputCommandInteraction) {
		//await interaction.reply('Pong!');
		await interaction.reply('Pong!');
	},
};

export default pingCmd;