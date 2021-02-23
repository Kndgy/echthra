const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
    client.on("guildMemberAdd", (member) =>{

        var channel = member.client.channels.cache.get('813004160617283586');
        const embed = new MessageEmbed()
        .setColor(0xffabd7)
        .setAuthor('Yasuragi Support Server')
        .setDescription(`Hello <@${member.id}>\n\nThank you for Joining Yasuragi support server.\nI'm sorry that our bot has detected your account as a potential alt account.\n
        Voice verification with our moderator is required for you to access Yasuragi main server.\nIf you're ready to start the verification, you can ping <@&813712228183834655> in <#813003820518998039>, and the currently available admin will reach out to you.
        \nAfter you passed the verification process, you will be granted access to our Main server.\n
        *This message is automatically generated*`)
        .setTimestamp()
        channel.send(embed)
    });
};