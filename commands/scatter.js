const fs = require("fs");
const userDataPath = "./user_data.json";

function loadUserData() {
  try {
    const data = fs.readFileSync(userDataPath);
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function saveUserData(userData) {
  fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 2));
}

module.exports = {
  name: "scatter",
  description: "Scatter items for users to collect.",
  execute(api, event, args, prefix) {
    const userData = loadUserData();
    const userId = event.senderID;

    let isNewUser = false;
    if (!userData[userId]) {
      userData[userId] = { currency: 100, hasLoan: false };
      isNewUser = true;
    }

    const items = ["🌟", "💎", "🍀", "🌺", "🍄", "🦄", "🌈", "🎁", "💰"];
    const collectedItems = [];
    let outcomeMessage = "";

    let betAmount = 0;
    if (args.length === 1 && !isNaN(args[0])) {
      betAmount = parseInt(args[0]);
    }

    if (betAmount <= 0 || betAmount > userData[userId].currency) {
      if (userData[userId].currency === 0 && !userData[userId].hasLoan) {
        userData[userId].currency += 2000;
        userData[userId].hasLoan = true;
        api.sendMessage("You received a loan of 2000 currency.", event.threadID);
      } else {
        api.sendMessage("Invalid bet amount or you already have a loan.", event.threadID);
        return;
      }
    }

    const outcome = Math.random();
    if (outcome < 0.2) {
      const winnings = betAmount * 2;
      userData[userId].currency += winnings;
      outcomeMessage = `You won ${winnings} currency!`;
    } else {
      userData[userId].currency -= betAmount;
      outcomeMessage = `You lost ${betAmount} currency.`;
    }

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * items.length);
      const item = items[randomIndex];
      collectedItems.push(item);
    }

    saveUserData(userData);

    let message = `Scattered items: ${collectedItems.join(" ")}\n${outcomeMessage}\nYour current currency: ${userData[userId].currency}`;

    if (isNewUser) {
      message = `Welcome! You received a starting bonus of 100 currency.\n${message}`;
    }

    api.sendMessage(message, event.threadID);
  },
};