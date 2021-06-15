const { MessageEmbed } = require("discord.js")

module.exports = {
    name:'info',
    description:'info about Echthra Bot',
    execute(message){
        message.channel.send(`**Echthra Discord Bot**
This bot mainly just for fun.(supposedly exclusive for a server)
Use 'help command to see more what Echthra can do
Echthra is open source and currently being developed by \`Kan#9015\` feel free to dm me if you have any questions about Echthra or want to suggest ideas.
if you would like to contribute and make changes, go ahead to (https://github.com/Kndgy/echo) feel free to open issues or/and pr.
A side project i maintain to learn more about node.js`)
    }
}