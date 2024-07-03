const config = require('../config.json');

module.exports = {
  name: 'author',
  description: 'Displays information about the script\'s usage policy and author.',
  nashPrefix: true,
  execute(api, event, args, prefix, commands) {
    const { author, description } = config;
    
    const message = `
━━━━━━━━━━━━━━━━━━━━━
📜 𝗖𝗼𝗽𝘆𝗿𝗶𝗴𝗵𝘁 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 📜
━━━━━━━━━━━━━━━━━━━━━
𝗔𝘂𝘁𝗵𝗼𝗿: ${author}
𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${description}
━━━━━━━━━━━━━━━━━━━━━
    `;
    
    api.sendMessage(message.trim(), event.threadID);
  },
};