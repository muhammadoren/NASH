const axios = require('axios');

module.exports = {
    name: 'ai',
    description: 'An AI command powered by joshua',
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const input = args.join(' ');

        if (!input) {
            api.sendMessage(
                `Hello there!\n\nI am an AI developed by Joshua Apostol. I am here to assist you with any questions or tasks you may have.\n\nUsage: ai [your question]`,
                event.threadID,
                event.messageID
            );
            return;
        }

        api.sendMessage(`Processing your request...`, event.threadID, event.messageID);

        try {
            const { data } = await axios.get(`https://nas-api-end.onrender.com/gpt4?query=${encodeURIComponent(input)}`);
            
            if (!data || !data.respond) {
                throw new Error('Ayaw mag response ang gago');
            }
            
            const response = data.respond;

            const finalResponse = `✩𝐉𝐎𝐒𝐇𝐁𝐎𝐓✩\n\n${response}`;
            api.sendMessage(finalResponse, event.threadID, event.messageID);
        } catch (error) {
            let errorMessage = 'An error occurred while processing your request, please try sending your question again.';
            
            if (error.response && error.response.data) {
                errorMessage = `API returned an error: ${error.response.data.message}`;
            } else if (error.message) {
                errorMessage = `Error: ${error.message}`;
            }
            
            api.sendMessage(errorMessage, event.threadID, event.messageID);
            console.error(error);
        }
    },
};
