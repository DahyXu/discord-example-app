import { Events, Message } from 'discord.js'
import DiscordClient from '../discord-client.js'

 const messageUpdateEvent = {
	name: Events.MessageUpdate,
	async execute(oldMessage: Message, newMessage:Message) {
		console.log('msg update!');
		//console.log(oldMessage);
        //console.log(newMessage);
        
	},
};

export default messageUpdateEvent;