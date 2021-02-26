const { MessageEmbed } = require("discord.js")

module.exports = {
    name:'info',
    description:'info',
    execute(message){
        const embed = new MessageEmbed()
        .setTitle('Fumiko Bot info')
        .setColor(0xffabd7)
        .setDescription(`**Fumiko Discord Bot**\n
        This bot mainly only for fun.(supposedly exclusive for a server)\n
        What can fumiko do: \n 
        -Random Vocabulary in 4 languages with 1hr interval. (wip and currently use picts as resources).\n
        -Fumiko can gives you random topic, advice, thought.\n
        -Fumiko also can gives you random Cat, Dog and Stars picts.
        \n
        Use 'help command to see more what fumiko can do
        \n
        Fumiko is open source and currently being developed by Kan#9015, if you would like to contribute and make changes go ahead to (https://github.com/Kndgy/echo) feel free to open issues or/and pr.
        \n
        feel free to dm me if you have any questions about fumiko or want to suggest ideas.`)
        .setFooter('A side project for me to learn more about node.js')
        message.channel.send(embed)
    }
}