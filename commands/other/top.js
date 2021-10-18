const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Database = require('../../functions/database.js');

module.exports = {
  name: 'top',
  description: 'Shows Ecpe strength and value ammounts for OP factions',
  async execute(interaction, bot) {
    let type = interaction.options.get("leaderboard").value

    let server = new Database(bot.config.mysql)
    let leaderboard = await server.query(`SELECT ${type} FROM Log_OP_Leaderboard`, true);
    server.close()

    let keys = [":first_place:", ":second_place:", ":third_place:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:", ":keycap_ten:"]

    leaderboard = JSON.parse(leaderboard[0][type])
    let args = interaction.options.get("page") ?.value
    let totalPages = Math.ceil(leaderboard.length / 10); let page = 1; let condensedLeaderboard;
    
    if (!args) condensedLeaderboard = leaderboard.slice(0, 10);
    if (args) {
      page = args;
      if (args > totalPages) page = totalPages;
      if (args < 1) page = 1;
      condensedLeaderboard = leaderboard.slice((page * 10) - 10, page * 10);
    }

    function num(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let string = '';
    for (let i = 0; i < condensedLeaderboard.length; i++) {
      let index = leaderboard.indexOf(condensedLeaderboard[i])
      let place = keys[index];
      if (!place) place = `${index + 1}.`;
      let obj = Object.values(condensedLeaderboard[i]);
      string = `${string}${place} ${obj[0]} **${type == 'PlayerLevel' ? `Level ${num(obj[obj.length - 1])}` : `${num(obj[obj.length - 1])} ${type == 'FactionSTR' ? 'STR' : 'Coins'}`}** \n`
    }

    let leaderboardEmbed = new MessageEmbed()
      .setTitle(`OP FACTIONS - ${type == 'FactionSTR' ? 'Strength' : type.split(/(?=[A-Z])/)[1]} Leaderboard`)
      .setDescription(string)
      .setFooter(`Page ${page}/${totalPages}`, interaction.guild.iconURL())
      .setColor(14140103)
      .setTimestamp()

    let ROW = new MessageActionRow()
      .addComponents([
        new MessageButton()
          .setCustomId(`leaderboard-${page - 3}`)
          .setEmoji('863198513160126524')
          .setStyle('PRIMARY')
          .setDisabled(page - 1 < 1),
        new MessageButton()
          .setCustomId(`leaderboard-${page - 1}`)
          .setEmoji('863198512824188929')
          .setStyle('PRIMARY')
          .setDisabled(page - 1 < 1),
        new MessageButton()
          .setCustomId(`leaderboard-${page + 1}`)
          .setEmoji('863198512915939338')
          .setStyle('PRIMARY')
          .setDisabled(page + 1 > totalPages),
        new MessageButton()
          .setCustomId(`leaderboard-${page + 3}`)
          .setEmoji('863198630688981013')
          .setStyle('PRIMARY')
          .setDisabled(page + 1 > totalPages)
      ])

    let message = await interaction.reply({ embeds: [leaderboardEmbed], components: [ROW], fetchReply: true });
    const collector = message.createMessageComponentCollector();

    collector.on('collect', async button => {
      args = button.customId.split('-');
      args.shift();

      if (button.user.id != interaction.user.id) return button.deferUpdate();

      let totalPages = Math.ceil(leaderboard.length / 10); let page = 1; let condensedLeaderboard;
      if (!args) condensedLeaderboard = leaderboard.slice(0, 10);
      if (args) {
        page = parseInt(args[0]);
        if (args[0] > totalPages) page = totalPages;
        if (args[0] < 1) page = 1;
        condensedLeaderboard = leaderboard.slice((page * 10) - 10, page * 10);
      }

      function num(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      let string = '';
      for (let i = 0; i < condensedLeaderboard.length; i++) {
        let index = leaderboard.indexOf(condensedLeaderboard[i])
        let place = keys[index];
        if (!place) place = `${index + 1}.`;
        let obj = Object.values(condensedLeaderboard[i]);
        string = `${string}${place} ${obj[0]} **${type == 'PlayerLevel' ? `Level ${num(obj[obj.length - 1])}` : `${num(obj[obj.length - 1])} ${type == 'FactionSTR' ? 'STR' : 'Coins'}`}** \n`
      }

      button.message.embeds[0].setDescription(string);
      button.message.embeds[0].setFooter(`Page ${page}/${totalPages}`, button.guild.iconURL());
      button.message.embeds[0].setTimestamp();

      button.message.components[0].components.forEach(obj => {
        switch (obj.emoji.name) {
          case 'DoubleArrowLeft':
            obj.customId = `leaderboard-${page - 2}`;
            obj.disabled = page - 1 < 1;
            break;
          case 'ArrowLeft':
            obj.customId = `leaderboard-${page - 1}`;
            obj.disabled = page - 1 < 1;
            break;
          case 'ArrowRIght':
            obj.customId = `leaderboard-${page + 1}`;
            obj.disabled = page + 1 > totalPages;
            break;
          case 'DoubleArrowRight':
            obj.customId = `leaderboard-${page + 2}`;
            obj.disabled = page + 1 > totalPages;
            break;
        }
      });
      await button.update({ embeds: button.message.embeds, components: button.message.components });
    })
  },
};