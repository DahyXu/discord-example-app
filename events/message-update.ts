import { Events, Message } from 'discord.js'
import DiscordClient from '../discord-client.js'
import MJReq from '../mjreq.js';

 const messageUpdateEvent = {
	name: Events.MessageUpdate,
	async execute(oldMessage: Message, newMessage:Message, mjReq:MJReq) {
		console.log('msg update!');
		//console.log(oldMessage);
        //console.log(newMessage);
        
	},
};

export default messageUpdateEvent;