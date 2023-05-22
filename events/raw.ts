import { Events } from 'discord.js'

 const rawEvent = {
	name: Events.Raw,
	execute(packet) {
		  // 确保只处理事件类型
          if (!packet.t) return;

          // 打印事件类型
          console.log('Received event:', packet.t);
	},
};

export default rawEvent;