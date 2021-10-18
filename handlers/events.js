const { readdirSync } = require("fs")

module.exports = (bot) => {
  const eventFolders = readdirSync('./events')

  for (const folder of eventFolders) {
    const eventFiles = readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
      const event = require(`../events/${folder}/${file}`);
      if (event.once) {
        bot.once(event.name, (...args) => event.execute(bot, ...args));
      } else {
        bot.on(event.name, (...args) => event.execute(bot, ...args));
      }
    }
  }
};