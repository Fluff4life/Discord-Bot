const banSchema = require('../schemas/ban-schema');
const muteSchema = require('../schemas/mute-schema');
const roleSchema = require('../schemas/role-schema');

module.exports = (bot) => {
  const conditional = {
    Expires: { $lt: new Date() },
    Current: true,
  }

  async function mutes() {
    const results = await muteSchema.find(conditional);

    if (results && results.length) {
      for (const result of results) {
        const guild = await bot.guilds.fetch(result.GuildID);
        const member = await guild.members.fetch(result.UserID);

        const role = await roleSchema.findOne({ GuildID: guild.id });
        member.roles.remove(role.RoleID);
      }
      await muteSchema.updateMany(conditional, {
        Current: false,
      });
    }
    setTimeout(mutes, 1000 * 60)
  }
  async function bans() {
    const results = await banSchema.find(conditional);

    if (results && results.length) {
      for (const result of results) {
        const guild = await bot.guilds.fetch(result.GuildID);
        guild.members.unban(result.UserID);
      }
      await banSchema.updateMany(conditional, {
        Current: false,
      });
    }
    setTimeout(bans, 1000 * 60)
  }
  bans()
  mutes()
};