const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
    client.on("guildMemberAdd", (member) =>{

        var channel = member.guild.channels.cache.get('801664083342393376');
        const embed = new MessageEmbed()
        .setColor(0xffabd7)
        .setAuthor('Yasuragi Support Server')
        .addField(
            {name: ' ',  value: `Hello <@${member.id}>`},
            {name:' ',value:" " },
            {name:' ',value: "Thank you for Joining Yasuragi support server. "},
            {name:' ',value:  "I'm sorry that our bot has detected your account as a potential alt account."}
        )
        .setTimestamp()
        channel.send(embed)
    });
};