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
            
            const url = await this.client.callMJ(prompt);
            res.send(url);
          });
          
        this.app.post('/api/users', (req: Request, res: Response) => {
            const user = req.body;
            res.json({ message: 'User created', user });
          });
    }

    public async listen(port:number){
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
          });
    }
}