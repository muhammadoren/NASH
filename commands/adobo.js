const axios = require("axios");

module.exports = {
    name: "adobo",
    description: "adobong baboy gpt",
    aliases: [],
    cooldown: 5,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const { threadID, messageID } = event;

        if (args.length === 0) {
            return api.sendMessage("Usage: adobo <query>", threadID, messageID);
        }

        const query = encodeURIComponent(args.join(" "));
        const apiUrl = `https://nash-api-end-5swp.onrender.com/adobo/gpt?query=${query}`;

        try {
            api.sendMessage("Adobo is processing your request. Please wait...", threadID, messageID);

            const response = await axios.get(apiUrl);
            const { answer } = response.data;

            if (!answer) {
                return api.sendMessage("No answer received from API.", threadID, messageID);
            }

            api.sendMessage(answer, threadID, messageID);

        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching data. Please try again later.", threadID, messageID);
        }
    }
};
