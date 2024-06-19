const axios = require("axios");

module.exports = {
    name: "gemini",
    description: "gemini command are the best",
    nashPrefix: false,
    cooldown: 5,
    execute: async (api, event, args) => {
        const { threadID, messageID } = event;
        const prompt = args.join(" ");

        if (!prompt) {
            return api.sendMessage("Please provide a prompt.", threadID, messageID);
        }

        try {
            api.sendMessage("gemini was responding, please wait...", threadID, messageID);

            const apiUrl = `https://nash-api-end-5swp.onrender.com/gemini?prompt=${encodeURIComponent(prompt)}`;
            const response = await axios.get(apiUrl);
            const answer = response.data;

            api.sendMessage(answer, threadID, messageID);
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching response. Please try again later.", threadID, messageID);
        }
    }
};
