const { Client, Collection, Intents } = require('discord.js');
global.mongoose = require('mongoose');
const { readdirSync } = require('fs')
let bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES] });
bot.config = require('./resources/config.json');
const handlersFiles = readdirSync('./handlers');
for (const file of handlersFiles) {
  bot[file.split('.')[0]] = new Collection()
  require(`./handlers/${file}`)(bot)
}
mongoose.connect(bot.config.mongodb)
bot.login(bot.config.token);
