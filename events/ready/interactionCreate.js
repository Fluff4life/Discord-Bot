const Embeds = require('../../resources/embeds.json')
const muteSchema = require('../../schemas/mute-schema')
const banSchema = require('../../schemas/ban-schema')
const roleSchema = require('../../schemas/role-schema')
const kickSchema = require('../../schemas/kick-schema')

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(bot, interaction) {
    if (!interaction.isCommand()) return;
    if (!bot.commands.has(interaction.commandName)) return;

    interaction.channel = await bot.channels.fetch(interaction.channel.id);
    interaction.guild = await bot.guilds.fetch(interaction.guild.id);

    let db = new Object()
    db.muteSchema = muteSchema
    db.banSchema = banSchema
    db.roleSchema = roleSchema
    db.kickSchema = kickSchema

    try {
       await bot.commands.get(interaction.commandName).execute(interaction, bot, db);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: null, embeds: [Embeds.CommandError], ephemeral: true });
    }
  },
};