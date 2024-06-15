const axios = require("axios");

module.exports = {
    name: "fact",
    description: "Get a random fact",
    aliases: [],
    cooldown: 5,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const { threadID, messageID } = event;

        const apiUrl = "https://nas-api-end.onrender.com/fact";

        try {
            const response = await axios.get(apiUrl);
            const fact = response.data.fact;

            if (!fact) {
                return api.sendMessage("No fact received from API.", threadID, messageID);
            }

            api.sendMessage(fact, threadID, messageID);
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching fact. Please try again later.", threadID, messageID);
        }
    }
};