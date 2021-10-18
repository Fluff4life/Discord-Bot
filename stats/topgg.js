const https = require('https')
module.exports = {
  async execute(bot) {
    const data = JSON.stringify({
      server_count: bot.guilds.cache.size
    })

    const options = {
      hostname: 'top.gg',
      port: 443,
      path: '/api/bots/842516423850721300/stats',
      method: 'POST',
      headers: {
        'Authorization': bot.config.stats.topgg,
        'Content-Type': 'application/json',
      }
    }

    const req = https.request(options)
    req.write(data)
    req.end()
  },
};