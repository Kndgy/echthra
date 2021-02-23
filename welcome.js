const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
    client.on("guildMemberAdd", (member) =>{

        var channel = member.guild.channels.cache.get('813004160617283586');
        const embed = new MessageEmbed()
        .setColor(0xffabd7)
        .setAuthor('Yasuragi Support Server')
        .addField(
            {name: ' ',  value: `Hello <@${member.id}>`},
            {name:' ',value:" " },
            {name:' ',value: "Thank you for Joining Yasuragi support server. "},
            {value:  "I'm sorry that our bot has detected your account as a potential alt account."},
            {value: "" },
            {value: "Voice verification with our moderator is required for you to access Yasuragi main server."},
            {value: `If you're ready to start the verification, you can ping <@&813712228183834655> in <#813003820518998039>, and the currently available admin will reach out to you.`},
            {value: "After you passed the verification process, you will be granted access to our Main server."},
            {value: ""},
            {value: "*This message is automatically generated*"},
        )
        .setTimestamp()
        channel.send(embed)
    });
};