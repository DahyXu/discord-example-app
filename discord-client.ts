import { Client, ClientOptions, Collection } from 'discord.js';

export default class DiscordClient extends Client {
    public commands : Collection<string, any>;

    constructor(options: ClientOptions){
        super(options);
        this.commands = new Collection<string, any>();
    }
}