const { AboutRow, About } = require("../../resources/embeds.json");

module.exports = {
  name: 'about',
  description: 'Information about the bot and it\'s authors',
  async execute(interaction, bot) {
    interaction.reply({ embeds: [About], ephemeral: true, components: [AboutRow] });
  },
};