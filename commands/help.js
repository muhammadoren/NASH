module.exports = {
  name: "help",
  description: "Lists all available commands.",
  execute(api, event, args, prefix) {
    let message = "Available Commands:\n\n";
    global.NashBoT.commands.forEach((cmd, name) => {
      message += `•─────⋅☾ ${prefix}${name} ☽⋅─────•\nDescription: ${cmd.description}\n\n`;
    });
    message += "•─────⋅☾ Credits ☽⋅─────•\n";
    message += "Bot created by joshua Apostol.\n";
    message += "Powered by NashBoT.\n";
    api.sendMessage(message, event.threadID);
  },
};