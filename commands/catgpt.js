const axios = require('axios');

module.exports = {
  name: 'catgpt',
  description: 'cat gpt meow',
  usage: '[query]',
  nashPrefix: false,
  execute(api, event, args, prefix) {
    try {
      if (!args.length) {
        api.sendMessage(`Usage: [ 🐾 '${prefix}catgpt [query]' 🐾 ]\n\nExample: [ 🐱 '${prefix}catgpt How are you, CatGPT?' 🐱 ]`, event.threadID);
        return;
      }
      
      const query = encodeURIComponent(args.join(' '));
      const apiUrl = `https://nash-rest-api.replit.app/catgpt?q=${query}`;
      
      api.sendMessage('🐾 Fetching response from CatGPT...', event.threadID);

      
      axios.get(apiUrl)
        .then(response => {
          const catgptData = response.data;

          
          const catgptResponse = typeof catgptData === 'string' ? catgptData : catgptData.catgpt;

          
          api.sendMessage(`🐱 CatGPT says: ${catgptResponse}`, event.threadID);
        })
        .catch(error => {
          console.error('Error fetching CatGPT data:', error);
          api.sendMessage('An error occurred while fetching CatGPT data.', event.threadID);
        });
    } catch (error) {
      console.error('Error executing command:', error);
      api.sendMessage('An error occurred while executing the command.', event.threadID);
    }
  },
};