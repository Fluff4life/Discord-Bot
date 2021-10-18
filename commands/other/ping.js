const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: 'ping',
  description: 'Shows uptime and current latency',
  async execute(interaction, bot) {
    let ping = Date.now()

    interaction.channel.send('Pinging..!').then(async m => {
      await m.delete()
      const embed = new MessageEmbed()
        .setColor(776785)
        .setDescription(`<:online:893110391444504607>  **UPTIME:** ${ms(bot.uptime, { long: true })}\n\n<:client:893110587138142259>  **CLIENT PING:** ${ms(bot.ws.ping)}\n\n<:slowmode:585790802979061760>  **MY PING:** ${ms(Date.now() - ping)}`);

      interaction.reply({ content: null, embeds: [embed] });
    })
  },
};