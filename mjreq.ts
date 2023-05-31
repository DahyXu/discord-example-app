import * as uuid from 'uuid';
import axios from 'axios';
import 'dotenv/config';
import { EventEmitter } from 'events';

const DISCORD_INTERACTIONS_URL="https://discord.com/api/v9/interactions"
const INPUT_TICKET_PREFIX = "@MJR"
const LOG_PREFIX = "[MJR-log]"
const MJR_TARGET_MATCH = "$MJR"


function mjRandomRef(): string {
    return `${INPUT_TICKET_PREFIX}-${uuid.v4().replace("-", "").substring(0, 8)}@`;
}

function buildBasePayload(): Record<string, any> {
    return {
      "guild_id": process.env.DISCORD_SERVER_ID,
      "channel_id": process.env.DISCORD_CHANNEL_ID,
      "application_id": process.env.MJD_APP_ID,
      "session_id": mjRandomRef(),
      "nonce": mjRandomRef(),
      "extras": {},
      "message_flags": 0
    };
}

export async function imagine(prompt: string): Promise<any> {
    const basePayload = buildBasePayload();
    const nonce = basePayload.nonce || mjRandomRef();
    const payload = {
        ...basePayload,
        "type": 2,
        "data": {
            "version": process.env.MJD_COMMAND_VERSION_ID ,
            "id": process.env.MJD_DATA_COMMAND_ID,
            "name": "imagine",
            "type": 1,
            "options": [
                {
                "type": 3,
                "name": "prompt",
                "value": `${nonce}\n${prompt}`
                }
            ],
            "application_command": {
                "id": process.env.MJD_DATA_COMMAND_ID,
                "application_id": process.env.MJD_APP_ID,
                "version": process.env.MJD_COMMAND_VERSION_ID,
                "default_permission": true,
                "default_member_permissions": null,
                "type": 1,
                "nsfw": false,
                "name": "imagine",
                "description": "Create images with Midjourney",
                "dm_permission": true,
                "options": [
                    {
                        "type": 3,
                        "name": "prompt",
                        "description": "The prompt to imagine",
                        "required": true
                    }
                ]
            },
            "attachments": []
        }
    };

    const header = {
        'authorization': process.env.IMPERSONATOR_TOKEN
    };

    const response = await axios.post(DISCORD_INTERACTIONS_URL, payload, { headers: header });
    console.log(`status:${response.status}, ${response.statusText}, data:${response.data}`);
    return response.data;
}

export async function logToDiscord(channel: any, s: string) {
    await channel.send(`${LOG_PREFIX} ${s}`);
}
  
export function upscale(index: number, message_id: string, message_hash: string) {
    const payload = {
      ...buildBasePayload(),
      type: 3,
      message_id: message_id,
      data: {
        component_type: 2,
        custom_id: `MJ::JOB::upsample::${index}::${message_hash}`
      }
    };
  
    const header = {
      authorization: process.env.IMPERSONATOR_TOKEN
    };
  
    return axios.post(DISCORD_INTERACTIONS_URL, payload, { headers: header });
}
  
function upscaleMax(message_id: string, message_hash: string) {
  const payload = {
    ...buildBasePayload(),
    type: 3,
    message_id: message_id,
    data: {
      component_type: 2,
      custom_id: `MJ::JOB::upsample_max::1::${message_hash}::SOLO`
    }
  };

  const header = {
    authorization: process.env.IMPERSONATOR_TOKEN
  };

  return axios.post(DISCORD_INTERACTIONS_URL, payload, { headers: header });
}

function reroll(message_id: string, message_hash: string) {
  const payload = {
    ...buildBasePayload(),
    type: 3,
    message_id: message_id,
    data: {
      component_type: 2,
      custom_id: `MJ::JOB::reroll::0::${message_hash}::SOLO`
    }
  };

  const header = {
    authorization: process.env.IMPERSONATOR_TOKEN
  };

  return axios.post(DISCORD_INTERACTIONS_URL, payload, { headers: header });
}

function variate(index: number, message_id: string, message_hash: string) {
  const payload = {
    ...buildBasePayload(),
    type: 3,
    message_id: message_id,
    data: {
      component_type: 2,
      custom_id: `MJ::JOB::variation::${index}::${message_hash}`
    }
  };

  const header = {
    authorization: process.env.IMPERSONATOR_TOKEN
  };

  return axios.post(DISCORD_INTERACTIONS_URL, payload, { headers: header });
}
  
export default class MJReq extends EventEmitter {
  
  constructor(){
    super();
  }

  public imagine(prompt:string){
    imagine(prompt);
  }

  public onImagineRes(result:string|undefined){

    let ret:boolean = true;
    let url:string = "";

    if ( result === undefined){
      ret = false;
      url = "error";
    }
    else if(result.startsWith('http')){
      ret = true;
      url = result;
    }
    else{
      ret = false;
      url = `something error:${result}`;
    }
    this.emit('onImagineRes', ret, url);
    
  }
} 
  
  