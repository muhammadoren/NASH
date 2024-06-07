module.exports = new Object({
  name: "leaveNoti",
  description: "cool leaveNoti",
  author: "Rui",
  onEvent: async ({ api, event }) => {
    if (
      event.logMessageType === "log: unsubscribe" &&
      event.logMessageData.leftParticipantFbId
    ) {
      const uid = event.logMessageData.leftParticipantFbId;
      const { uid: userInfo } = await api.getUserInfo(uid);
      const threadInfo = await api.getThreadInfo(event.threadID);

      if (
        event.logMessageData.leftParticipantFbId ===
        event.logMessageData.kickedParticipantFbId
      ) {
        api.sendMessage(
          `User: ${userInfo.name} got kicked by admins from group: ${threadInfo.name}`,
          event.threadID,
          event.messageID,
        );
      } else {
        api.sendMessage(
          `User: ${userInfo.name} left group: ${threadInfo.name}`,
        );
      }
    }
  },
});
