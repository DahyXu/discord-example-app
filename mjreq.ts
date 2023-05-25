import * as uuid from 'uuid';
import axios from 'axios';
import 'dotenv/config';

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

export default async function imagine(prompt: string): Promise<any> {
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


  
  
  
  