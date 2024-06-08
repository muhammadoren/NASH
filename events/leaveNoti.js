module.exports = {
  name: 'leaveNoti',
  description: 'Notifies the user when they leave or get kicked from a group.',
  onEvent: async ({ api, event }) => {
    if (event.type === 'event' && event.logMessageType === 'log:unsubscribe' && event.leftParticipantFbId === api.getCurrentUserID()) {
      try {
        const userInfo = await api.getUserInfo(event.threadID);
        const userName = userInfo[event.threadID].name;
        api.sendMessage(`∘₊✧──────✧₊∘ Goodbye ${userName}! We'll miss you. ∘₊✧──────✧₊∘`, event.threadID);
      } catch (error) {
        console.error('Error retrieving user info:', error);
      }
    }
  },
};