module.exports = (client) => {
    const channelId = '813004160617283586';
    client.on("guildMemberAdd", (member) =>{
        console.log(member);

        const message = [
            `Hello <@${member.id}>`,
            "",
            "Thank you for Joining Yasuragi support server. ",
            "I'm sorry that our bot has detected your account as a potential alt account.",
            "",
            "Voice verification with our moderator is required for you to access Yasuragi main server.",
            `If you're ready to start the verification, you can ping <@${813712228183834655}> , and the currently available admin will reach out to you. `,
            "After you passed the verification process, you will be granted access to our Main server.",
            "",
            "*This message is automatically generated*",
        ]
        

        const channel = member.guild.channels.cache.get(channelId);
        channel.send(message)
    });
};