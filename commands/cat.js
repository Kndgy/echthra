const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    description: 'random cat picts',
    async execute(message, args,){
            const {file} = await fetch('https://aws.random.cat/meow').then(
            response => response.json()
        );
        const embed = new MessageEmbed()
        .setTitle("Random Catto")
        .setImage(file)
        message.channel.send(embed);
    }
}