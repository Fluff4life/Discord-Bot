const banSchema = require("../../schemas/ban-schema")
module.exports = {
  name: 'guildBanRemove',
  once: false,
  async execute(bot, ban) {

    const conditional = {
      UserID: ban.user.id,
      Current: true,
    }
    await banSchema.updateMany(conditional, {
      Current: false,
    });
  },
};