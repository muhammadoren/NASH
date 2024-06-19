const axios = require("axios");

module.exports = {
    name: "gemini",
    description: "Get a response from the Gemini API",
    aliases: [],
    cooldown: 5,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const { threadID, messageID } = event;
        const prompt = args.join(" ");

        if (!prompt) {
            return api.sendMessage("Please provide a prompt.", threadID, messageID);
        }

        const apiUrl = `https://nash-api-end-5swp.onrender.com/gemini?prompt=${encodeURIComponent(prompt)}`;

        try {
            const response = await axios.get(apiUrl);
            const geminiResponse = response.data;

            if (!geminiResponse) {
                return api.sendMessage("No response received from Gemini API.", threadID, messageID);
            }

            api.sendMessage(geminiResponse, threadID, messageID);
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching data from Gemini API. Please try again later.", threadID, messageID);
        }
    }
};
