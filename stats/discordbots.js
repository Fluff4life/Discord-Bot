const https = require('https')
module.exports = {
    async execute(bot) {
        const data = JSON.stringify({
            guilds: bot.guilds.cache.size,
            users: bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
        })

        const options = {
            hostname: 'discordbotlist.com',
            port: 443,
            path: '/api/v1/bots/842516423850721300/stats',
            method: 'POST',
            headers: {
                'Authorization': bot.config.stats.discordbots,
                'Content-Type': 'application/json',
            }
        }

        const req = https.request(options)
        req.write(data)
        req.end()
    },
};