const moment = require('moment-timezone');

module.exports = {
  name: 'userinfo',
  description: 'Displays information about the user who triggered the command.',
  nashPrefix: false,
  execute(api, event, args, prefix) {
    try {
      const userId = event.senderID;

      api.getUserInfo(userId, (err, result) => {
        if (err) {
          console.error('Error fetching user info:', err);
          api.sendMessage('An error occurred while fetching user information.', event.threadID);
          return;
        }

        const user = result[userId];
        const date = moment().tz("Asia/Manila").format('YYYY-MM-DD');
        const time = moment().tz("Asia/Manila").format('HH:mm:ss');

        const userInfo = `
          •─────⋅☾ User Info ☽⋅─────•
          Name: ${user.name}
          ID: ${userId}
          Profile URL: ${user.profileUrl}
          •─────⋅☾ ☽⋅─────•
          Date: ${date}
          Time: ${time}
          •─────⋅☾ ☽⋅─────•
        `;

        api.sendMessage(userInfo, event.threadID);
      });
    } catch (error) {
      console.error('Error executing command:', error);
      api.sendMessage('An error occurred while executing the command.', event.threadID);
    }
  },
};