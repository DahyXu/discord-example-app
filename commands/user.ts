import { ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js'

const userCmd = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${(interaction.member as GuildMember).joinedAt}.`);
	},
};

export default userCmd;