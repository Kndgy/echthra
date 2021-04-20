const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
    client.on("guildMemberAdd", (member) =>{

        var channel = member.client.channels.cache.get('723794736325853209');
        const embed = new MessageEmbed()
        .setColor(0xffabd7)
        .setDescription(`Welcome <@${member.id}> to Yasuragi server.\n\nBefore you continue be sure to check our #main-information and #roles-picker\n\nIf you're learning a language be sure to check these channel bellow for guidance and free books and resources that are available for free for you to download.\n\n<#776435979325931521> for Japanese\n<#776436353155203112> for Korean\n<#776436353155203112>md-starter-guide for Mandarin`)
        .setImage('https://cdn.discordapp.com/attachments/750961109569110028/834135329782104074/ezgif-7-4c77a92839ac.gif')
        channel.send(embed)
    });
}; 

