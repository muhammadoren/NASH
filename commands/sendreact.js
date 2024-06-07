const axios = require('axios');

const cooldowns = new Map();

function sendReact(link, type, cookie, api, event) {
    console.log(`
  \x1b[0m
  \x1b[97m STATUS : \x1b[92mSENDING
  \x1b[97m REACT  : \x1b[91m${type}
  \x1b[97m POST   : \x1b[91m${link}
  \x1b[0m\n
  `);

    const url = "https://flikers.net/android/android_get_react.php";
    const payload = {
        post_id: link,
        react_type: type,
        version: "v1.7"
    };
    const headers = {
        'User-Agent': "Dalvik/2.1.0 (Linux; U; Android 12; V2134 Build/SP1A.210812.003)",
        'Connection': "Keep-Alive",
        'Accept-Encoding': "gzip",
        'Content-Type': "application/json",
        'Cookie': cookie // corrected from cokie to cookie
    };

    axios.post(url, payload, { headers })
        .then(response => {
            const data = response.data;
            console.log(`  \x1b[1;97mMESSAGE: \x1b[0m${data.message || 'Unknown message'}`);
            const reactionsSent = data.reactions_sent;
            if (reactionsSent !== undefined) {
                console.log(`  \x1b[1;97mALREADY SENT: \x1b[0m${reactionsSent} reactions`);
            }
            api.sendMessage("› Reaction sent successfully.", event.threadID);
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                console.log("\n\x1b[1;91m ERROR: \x1b[0m\x1b[91mInvalid cookie:", error.response.data);
                api.sendMessage("› Invalid cookie. Please check your cookie and try again.", event.threadID);
            } else {
                console.log("\n\x1b[1;91m ERROR: \x1b[0m\x1b[91mHTTP error occurred while sending the request:", error);
                api.sendMessage("› An error occurred while sending the reaction. Please try again later.", event.threadID);
            }
            process.exit(1);
        });
}

module.exports = {
    name: "sendreact",
    description: "Send a reaction to a post.",
    execute: async (api, event, args) => {
        const { threadID, senderID } = event;

        if (cooldowns.has(senderID)) {
            const cooldown = cooldowns.get(senderID);
            const timeLeft = (cooldown - Date.now()) / 1000;
            return api.sendMessage(`› Please wait ${timeLeft.toFixed(1)} more seconds before reusing the \`sendreact\` command.`, threadID);
        }

        cooldowns.set(senderID, Date.now() + 50000);

        setTimeout(() => {
            cooldowns.delete(senderID);
        }, 50000);

        if (args.length < 3) {
            return api.sendMessage("› Missing input. Usage: sendreact [post link] [react type] [cookie]", threadID);
        }

        const link = args[0];
        const type = args[1];
        const cookie = args.slice(2).join(' ');

        sendReact(link, type, cookie, api, event);
    }
};