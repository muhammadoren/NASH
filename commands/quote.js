const axios = require("axios");

module.exports = {
    name: "quote",
    description: "Get a random quote",
    aliases: [],
    cooldown: 5,
    nashPrefix: true,
    execute: async (api, event, args) => {
        const { threadID, messageID } = event;

        const apiUrl = "https://nas-api-end.onrender.com/quote";

        try {
            const response = await axios.get(apiUrl);
            const { text, author } = response.data;

            if (!text || !author) {
                return api.sendMessage("No quote received from API.", threadID, messageID);
            }

            const quoteMessage = `“${text}”\n- ${author}`;
            api.sendMessage(quoteMessage, threadID, messageID);
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching quote. Please try again later.", threadID, messageID);
        }
    }
};