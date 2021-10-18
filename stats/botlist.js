const https = require('https')
module.exports = {
    async execute(bot) {
        const data = JSON.stringify({
            guilds: bot.guilds.cache.size
        })

        const options = {
          hostname: 'api.botlists.com',
          port: 443,
          path: '/bot/842516423850721300',
          method: 'PATCH',
          headers: {
            'Authorization': bot.config.stats.botlist,
            'Content-Type': 'application/json',
          }
        }
        const req = https.request(options)

        req.write(data)
        req.end()
    },
};