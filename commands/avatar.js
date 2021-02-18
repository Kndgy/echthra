const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'avatar',
	aliases:['icon','pfp','av'],
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	execute(message) {
		if (!message.mentions.users.size) {
			const embed = new MessageEmbed()
            .setTitle("Your avatar: ")
            .setImage(message.author.displayAvatarURL({ size: 2048 }))
            .setColor(0xffabd7)
            message.channel.send(embed)
		}
		message.mentions.users.map(user => {
			const embed = new MessageEmbed()
            .setTitle(`${user.username}'s avatar: `)
            .setImage(user.displayAvatarURL({ size: 2048 }))
            .setColor(0xffabd7)
			return message.channel.send(embed);
		});

		
	},
};