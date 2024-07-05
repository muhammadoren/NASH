
const axios = require('axios');

module.exports = {
    name: 'Ara',
    description: 'Talk to SimSimi',
    aliases: [], // Add any aliases if needed
    cooldown: 2,
    nashPrefix: false,

    async execute(api, event, args) {
        const input = args.join(' ');

        if (!input) {
            api.sendMessage('Please type a message...', event.threadID, event.messageID);
            return;
        }

        api.sendMessage('Processing your request...', event.threadID, event.messageID);

        try {
            const { data } = await axios.get(`https://simsimi.site/api/v2/?mode=talk&lang=en&message=${encodeURIComponent(input)}&filter=false`);
            const response = data.success; // Extract only the 'success' field

            if (data.error) {
                api.sendMessage(`Error: ${data.error}`, event.threadID, event.messageID);
            } else {
                api.sendMessage(response, event.threadID, event.messageID);
            }
        } catch (error) {
            api.sendMessage('An error occurred while fetching the data.', event.threadID, event.messageID);
            console.error(error);
        }
    },
};
