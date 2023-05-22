// Require the necessary discord.js classes
import {  Collection, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import {readdirSync} from 'fs'
import * as path from 'path'
import DiscordClient from './discord-client.js'
import { fileURLToPath } from 'url';


// Create a new client instance
const client = new DiscordClient({ intents: [GatewayIntentBits.Guilds|GatewayIntentBits.GuildIntegrations] });


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//load all commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const { default: command } = await import(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


// load all events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const { default: event } = await import(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);