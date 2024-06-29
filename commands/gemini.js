const axios = require('axios');

module.exports = {
  name: 'gemini',
  description: 'Gemini ai text',
  usage: '[prompt]',
  nashPrefix: false,
  execute(api, event, args, prefix) {
    try {
      if (!args.length) {
        api.sendMessage(`Usage: [ 🔮 '${prefix}gemini [prompt]' 🔮 ]\n\nExample: [ 🔮 '${prefix}gemini What will my day be like?' 🌟 ]`, event.threadID);
        return;
      }

      
      const prompt = encodeURIComponent(args.join(' '));
      const apiUrl = `https://nash-rest-api.replit.app/gemini?prompt=${prompt}`;
      
      api.sendMessage('🔮 Please Wait Gemini is Responding...', event.threadID);
      
      axios.get(apiUrl)
        .then(response => {
          const geminiData = response.data;
          
          const geminiResponse = typeof geminiData === 'string' ? geminiData : geminiData.response;
          
          api.sendMessage(`🔮 Gemini's response: ${geminiResponse}`, event.threadID);
        })
        .catch(error => {
          console.error('Error fetching Gemini data:', error);
          api.sendMessage('An error occurred while fetching Gemini data.', event.threadID);
        });
    } catch (error) {
      console.error('Error executing command:', error);
      api.sendMessage('An error occurred while executing the command.', event.threadID);
    }
  },
};