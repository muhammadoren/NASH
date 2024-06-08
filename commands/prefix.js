module.exports = {
  name: 'prefix',
  description: 'Replies with the prefix',
  nashPrefix: false,
  execute(api, event, args, prefix) {
    try {
      api.sendMessage(`my prefix is: ${prefix}`, event.threadID);
    } catch (error) {
      console.error('Error executing command:', error);
      api.sendMessage('An error occurred while executing the command.', event.threadID);
    }
  },
};