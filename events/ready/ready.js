const localCommands = require("../../resources/commands.json");

module.exports = {
  name: 'ready',
  once: true,
  async execute(bot) {

    bot.user.setStatus('idle').then(stat => {
      bot.user.setStatus('dnd')
    })
    console.log(`Online | ${bot.user.tag} is now online in ${(bot.guilds.cache.size)} guild(s)!`);

    let num = 0
    const activities = [
      { name: 'For /help', type: 'WATCHING' },
      { name: `In ${bot.guilds.cache.size} Servers`, type: 'PLAYING' },
      { name: `${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Users`, type: 'LISTENING' }
    ];

    setInterval(function () {
      if (num == 3) num = 0
      bot.user.setActivity(activities[num])
      num++
    }, 30000);

    let location
    let DEV_GUILD

    if (!DEV_GUILD) {
      location = bot.application
    } else {
      location = await bot.guilds.cache.get(DEV_GUILD)
    }

    let guildCommands = await location?.commands?.fetch();

    for (let i = 0; i < localCommands.length; i++) {
      let focusedCommand = guildCommands?.find(cmd => cmd.name === localCommands[i]?.name);

      if (!focusedCommand) {
        console.log(`INFO | Updated slash commands (ready.js)`)
        return location?.commands?.set(localCommands);
      }

      if (guildCommands.size > localCommands.length) {
        console.log(`INFO | Updated slash commands (ready.js)`)
        return location?.commands?.set(localCommands);
      }

      const NameDiffrentce = focusedCommand?.name != localCommands[i]?.name;

      const DescriptionNameDiffrentce = focusedCommand?.description != localCommands[i]?.description;

      const OptionsDiffrentce = JSON.stringify(focusedCommand.options) != JSON.stringify(localCommands[i]?.options);

      if (NameDiffrentce || DescriptionNameDiffrentce || OptionsDiffrentce) {
        console.log(`INFO | Updated slash commands (ready.js)`)
        return location?.commands?.set(localCommands);
      }
    }
  },
};
