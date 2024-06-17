const { exec } = require("child_process");

module.exports = {
    name: "restart",
    role: 2, // Assuming role 2 is required for administrative actions
    credits: "Your Name",
    description: "Restarts the bot.",
    nashPrefix: true, // Adjust based on your bot framework's configuration
    cooldown: 0, // Adjust cooldown as needed
    execute: async (api, event, args) => {
        // Check if the sender has the required role (role 2 in this example)
        if (event.senderID !== "100088690249020") {
            return api.sendMessage("You do not have permission to use this command.", event.threadID, event.messageID);
        }

        // Command to fetch bot's process name from PM2
        exec("pm2 list", (error, stdout, stderr) => {
            if (error) {
                console.error(`Error fetching PM2 processes: ${error}`);
                return api.sendMessage("An error occurred while fetching PM2 processes.", event.threadID, event.messageID);
            }

            // Extracting bot process name from PM2 output
            const lines = stdout.split("\n").filter(line => line.includes("your-bot-name")); // Replace with your bot's unique identifier
            if (lines.length === 0) {
                return api.sendMessage("Bot process not found in PM2.", event.threadID, event.messageID);
            }
            const botProcessName = lines[0].split(/\s+/)[2]; // Assuming process name is in the third column

            // Restart the bot process
            exec(`pm2 restart ${botProcessName}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error during restart: ${error}`);
                    return api.sendMessage("An error occurred while restarting the bot.", event.threadID, event.messageID);
                }
                console.log(`Restarting bot: ${stdout}`);
                api.sendMessage("Bot is restarting...", event.threadID);
            });
        });
    }
};