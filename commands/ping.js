const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
    name: 'ping',
    description: 'ping the bot',
    execute(message, args){
        message.channel.send(`this bot API latency is ${Math.round(client.ws.ping)}ms.`)
    }
}