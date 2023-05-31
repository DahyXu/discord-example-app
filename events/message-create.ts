import { Events, Message } from 'discord.js'
import DiscordClient from '../discord-client.js'
import MJReq from '../mjreq.js';

const INPUT_TICKET_PREFIX = "@MJR";
const FINAL_OUTPUT_MESSAGE_SUFFIXES: [string, string] = ["(relaxed)", "(fast)"];



 const messageCreateEvent = {
	name: Events.MessageCreate,
	async execute(msg:Message, mjReq:MJReq) {
		console.log('msg created!');
		
		if ( !(msg.client instanceof DiscordClient) ) return;
        
		if (msg.content.startsWith(`**${INPUT_TICKET_PREFIX}`) &&
			FINAL_OUTPUT_MESSAGE_SUFFIXES.some(suffix => msg.content.endsWith(suffix)) &&
      		msg.attachments) {
			console.log(msg.attachments.first());
    		mjReq.onImagineRes(msg.attachments.first()?.url);
		}
	},
};

export default messageCreateEvent;