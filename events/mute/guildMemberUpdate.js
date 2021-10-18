const roleSchema = require('../../schemas/role-schema')
const muteSchema = require("../../schemas/mute-schema")

module.exports = {
  name: 'guildMemberUpdate',
  once: false,
  async execute(bot, oldMember, newMember) {

    let GuildRole = await roleSchema.findOne({ GuildID: oldMember.guild.id });
    if (!GuildRole) return;

    if (oldMember._roles.includes(GuildRole.RoleID) && !newMember._roles.includes(GuildRole.RoleID)) {

      const conditional = {
        UserID: oldMember.user.id,
        Current: true,
      }
      await muteSchema.updateMany(conditional, {
        Current: false,
      });
    }
  },
};