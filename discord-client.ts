import { Client, ClientOptions, Collection } from 'discord.js';
import { fileURLToPath } from 'url';
import * as path from 'path'
import {readdirSync} from 'fs'
import 'dotenv/config';
import { TextChannel } from 'discord.js';

export default class DiscordClient extends Client {
    public commands : Collection<string, any>;

    private dirname : string;

    constructor(options: ClientOptions){
        super(options);
        this.commands = new Collection<string, any>();
        const filenname = fileURLToPath(import.meta.url);
        this.dirname = path.dirname(filenname);
    }

    public async loadCommand():Promise<void>{
        //load all commands
        const commandsPath = path.join(this.dirname, 'commands');
        const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const { default: command } = await import(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    public async loadEvents() : Promise<void> {
        // load all events
        const eventsPath = path.join(this.dirname, 'events');
        const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const { default: event } = await import(filePath);
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args));
            } else {
                this.on(event.name, (...args) => event.execute(...args));
            }
        }
    }

    public callMJ(prompt : string) {
        console.log(`mj image prompt:${prompt}`);
        const channel = this.channels.cache.get('1087994103091961908') as TextChannel;
        channel.send({
            content: prompt,
            allowedMentions: { users: ['936929561302675456'] },
        });
        
    }
}