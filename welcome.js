module.exports = (client) => {
    const channelId = "801664083342393376";
    client.on("guildMemberAdd", (member) =>{
        console.log(member);

        const message = `welcome <@${member.id}> bruh`

        const channel = member.guild.channels.cache(channelId);
        channel.send(message)
    });
};