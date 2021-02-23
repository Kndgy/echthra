const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
    client.on("guildMemberAdd", (member) =>{

        var channel = member.guild.channels.cache.get('813004160617283586');
        const embed = new MessageEmbed()
        .setColor(0xffabd7)
        .setAuthor("Yasuragi Support Server")
        .setDescription(`Hello <@${member.id}>`)
        .setDescription()
        .setDescription("Thank you for Joining Yasuragi support server. ")
        .setDescription("I'm sorry that our bot has detected your account as a potential alt account.")
        .setDescription()
        .setDescription( "Voice verification with our moderator is required for you to access Yasuragi main server.")
        .setDescription(`If you're ready to start the verification, you can ping <@&813712228183834655> in <#813003820518998039>, and the currently available admin will reach out to you.`)
        .setDescription("After you passed the verification process, you will be granted access to our Main server.")
        .setDescription()
        .setDescription("*This message is automatically generated*",
        "test",
        "test") 
        .setTimestamp()
        channel.send(embed)
    });
};