const axios = require("axios");

module.exports = {
    name: "chords",
    description: "Get artist name, title, and chords of a song",
    aliases: [],
    cooldown: 5,
    nashPrefix: true,
    execute: async (api, event, args) => {
        const { threadID, messageID } = event;
        const song = args.join(" ");

        if (!song) {
            return api.sendMessage("Please provide a song name.", threadID, messageID);
        }

        const apiUrl = `https://jerai.onrender.com/api/chords?song=${encodeURIComponent(song)}`;

        try {
            const response = await axios.get(apiUrl);
            const { artist, title, chords } = response.data;

            if (!artist || !title || !chords) {
                return api.sendMessage("Song information not found.", threadID, messageID);
            }

            const chordMessage = `Artist: ${artist}\nTitle: ${title}\nChords:\n${chords}`;
            api.sendMessage(chordMessage, threadID, messageID);
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching song information. Please try again later.", threadID, messageID);
        }
    }
};
