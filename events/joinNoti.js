module.exports = {
  name: "joinNoti",
  version: "1.0.0",
  description: "Join notifications",
  author: "Rui",
  async onEvent({ api, event, prefix }) {
    if (
      event.logMessageType === "log:subscribe" &&
      event.logMessageData.addedParticipants?.some(
        (i) => i.userFbId == api.getCurrentUserID(),
      )
    ) {
      api.changeNickname(
        `[ ${prefix} ]: NashBoT`,
        event.threadID,
        api.getCurrentUserID(),
      );

      const threadInfo = await api.getThreadInfo(event.threadID);

      api.sendMessage(
        `› ${botName} connected successfully!\n\nUse ${botPrefix}help to see available commands!`,
        event.threadID,
      );
    } else if (
      event.logMessageType === "log:subscribe" &&
      event.logMessageData.addedParticipants?.some(
        (i) => i.userFbId !== api.getCurrentUserID(),
      )
    ) {
      const { addedParticipants } = event.logMessageData;
      const { threadID, author } = event;

      const authorIno = await api.getUserInfo(author);
      const authorInfo = authorIno[author];

      const threadInfo = await api.getThreadInfo(threadID);
      const msg = `› Welcome ${addedParticipants.map((i) => i.fullName).join(", ")} to ${threadInfo.name}!

Added by: ${authorInfo.name} (${author})`;

      api.sendMessage(msg, event.threadID);
    }
  },
};
