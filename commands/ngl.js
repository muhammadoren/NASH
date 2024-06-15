const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    name: "ngl",
    description: "total wala naman tong mga credits command ko nakawin muna nahiya kapa",
    aliases: [],
    cooldown: 5,
    nashPrefix: true,
    execute: async (api, event, args) => {
        const { threadID, messageID } = event;
        const [username, message, amount] = args;

        if (!username || !message) {
            return api.sendMessage("Please provide username and message.", threadID, messageID);
        }

        let parsedAmount = parseInt(amount);
        if (isNaN(parsedAmount) || parsedAmount < 1 || parsedAmount > 24) {
            return api.sendMessage("Amount should be a number between 1 and 24.", threadID, messageID);
        }

        const deviceId = uuidv4();
        const apiUrl = `https://nas-api-end.onrender.com/ngl?username=${encodeURIComponent(username)}&message=${encodeURIComponent(message)}&deviceId=${encodeURIComponent(deviceId)}&amount=${encodeURIComponent(parsedAmount)}`;

        try {
            const response = await axios.get(apiUrl);

            if (!response.data) {
                return api.sendMessage("gago walang response.", threadID, messageID);
            }

            setTimeout(() => {
                api.sendMessage("Message sent successfully.", threadID, messageID);
            }, 2000); // 2-second delay
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while sending message. Please try again later.", threadID, messageID);
        }
    }
};