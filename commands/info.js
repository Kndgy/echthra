const { MessageEmbed } = require("discord.js")

module.exports = {
    name:'info',
    description:'info about Fumiko Bot',
    execute(message){
        message.channel.send(`**Fumiko Discord Bot**
This bot mainly just for fun.(supposedly exclusive for a server)
Use 'help command to see more what fumiko can do
Fumiko is open source and currently being developed by \`Kan#9015\` feel free to dm me if you have any questions about fumiko or want to suggest ideas.
if you would like to contribute and make changes, go ahead to (https://github.com/Kndgy/echo) feel free to open issues or/and pr.
A side project i maintain to learn more about node.js`)
    }
}