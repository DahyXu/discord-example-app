import { Events, Message } from 'discord.js'
import DiscordClient from '../discord-client.js'

 const messageCreateEvent = {
	name: Events.MessageCreate,
	async execute(msg:Message) {
		console.log('msg created!');
		//console.log(msg);
		if ( !(msg.client instanceof DiscordClient) ) return;
        
	},
};

export default messageCreateEvent;