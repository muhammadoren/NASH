const axios = require('axios');

module.exports = {
  name: 'ngl',
  description: 'Send message to API with random device ID',
  usage: '<username> <message> <amount>',
  nashPrefix: false,
  execute(api, event, args, prefix) {
    try {
      if (args.length < 3 || isNaN(args[args.length - 1])) {
        api.sendMessage(`Usage: [ 📬 '${prefix}ngl <username> <message> <amount>' 📬 ]\n\nExample: [ 📬 '${prefix}ngl John Hello World 15' 📬 ]`, event.threadID);
        return;
      }

      let amount = parseInt(args[args.length - 1], 10);
      const username = args[0];
      const message = args.slice(1, -1).join(' ');

      
      if (amount > 15) {
        api.sendMessage('The maximum amount allowed is 15.', event.threadID);
        return;
      }

      const randomDeviceId = Math.floor(Math.random() * 100000);
      
      const apiUrl = 'https://nash-rest-api.replit.app/ngl';

      const requestData = {
        username,
        message,
        deviceId: randomDeviceId,
        amount
      };

      api.sendMessage('📬 Sending message...', event.threadID);

      axios.get(apiUrl, { params: requestData })
        .then(response => {
          if (response.data && response.data.message && response.data.developedBy) {
            api.sendMessage(`📬 ${response.data.message} - Developed by: ${response.data.developedBy}`, event.threadID);
          } else {
            throw new Error('Invalid response format from API');
          }
        })
        .catch(error => {
          console.error('Error sending message:', error.message || error);
          api.sendMessage('An error occurred while sending the message.', event.threadID);
        });
    } catch (error) {
      console.error('Error executing command:', error.message || error);
      api.sendMessage('An error occurred while executing the command.', event.threadID);
    }
  },
};