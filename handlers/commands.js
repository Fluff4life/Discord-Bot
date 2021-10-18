const { readdirSync } = require("fs")

module.exports = (bot) => {
  const commandFolders = readdirSync('./commands');
  
  for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);
      bot.commands.set(command.name, command);
    }
  }
};