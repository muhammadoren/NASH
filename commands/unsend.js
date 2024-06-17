module.exports = {
    name: "unsend",
    version: "1.0.0",
    role: 0,
    nashPrefix: false,
    aliases: ['unsent', 'remove', 'rm'],
    usage: 'Unsent [reply]',
    description: "Unsend bot's message",
    credits: 'Developer',
    cooldown: 0,
    execute: async (api, event) => {
        if (event.type !== "message_reply") {
            return api.sendMessage("Reply to a bot message to unsend.", event.threadID, event.messageID);
        }

        if (event.messageReply.senderID !== api.getCurrentUserID()) {
            return api.sendMessage("I can't unsend messages from other users.", event.threadID, event.messageID);
        }

        api.unsendMessage(event.messageReply.messageID, (err) => {
            if (err) {
                return api.sendMessage("Something went wrong while unsending the message.", event.threadID, event.messageID);
            }
        });
    }
};