module.exports = {
  name: 'guildCreate',
  once: false,
  async execute(bot, guild) {
    guild.members.cache.get(bot.user.id).setNickname("Darling");
  },
};