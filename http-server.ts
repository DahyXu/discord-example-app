import express, { Request, Response, Application  } from 'express';
import DiscordClient from './discord-client.js';



export default class HttpServerByExpress{
    private app : Application;
    private client : DiscordClient;

    constructor(client : DiscordClient){
        this.app = express();
        this.client = client;
    }

    public async addEvents() {
        this.app.get('/mj/image', async (req: Request, res: Response) => {
            const prompt:string = req.query.prompt as string;
            let url:string;
            try{
                url = await this.client.callMJ(prompt);
            }
            catch(error){
                url = 'Error';
                console.log('fetch image timeout.')
            }
            console.log('url result is ' + url);
            res.send(url);
          });
          
    }

    public async listen(port:number){
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
          });
    }
}