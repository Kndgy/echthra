module.exports = (client) => {
    client.on("guildMemberAdd", (member) =>{
        var channel = member.guild.channels.cache.get('813004160617283586')
        channel.send(`Hello <@${member.id}>`)
        channel.send("")
        channel.send("Thank you for Joining Yasuragi support server. ",)
        channel.send("I'm sorry that our bot has detected your account as a potential alt account.")
        channel.send("")
        channel.send("Voice verification with our moderator is required for you to access Yasuragi main server.")
        channel.send(`If you're ready to start the verification, you can ping <@&813712228183834655> in <#813003820518998039>, and the currently available admin will reach out to you.`)
        channel.send("After you passed the verification process, you will be granted access to our Main server.")
        channel.send("")
        channel.send("After you passed the verification process, you will be granted access to our Main server.")
        channel.send("*This message is automatically generated*")
    });
};