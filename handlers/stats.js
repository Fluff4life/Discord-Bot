const { readdirSync } = require("fs")

module.exports = (bot) => {
  const statFiles = readdirSync(`./stats`).filter(file => file.endsWith('.js'));
  for (const file of statFiles) {
    const stats = require(`../stats/${file}`);
    stats.execute(bot)
    setInterval(function() {
      stats.execute(bot)
    }, 60000 * 30);
  }
};