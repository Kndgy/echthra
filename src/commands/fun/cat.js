const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    description: 'random cat picts from aws',
    async execute(message){
            const {file} = await fetch('https://aws.random.cat/meow').then(
            response => response.json()
        );
        const embed = new MessageEmbed()
        .setTitle("Random Catto")
        .setImage(file)
        .setColor(0xffabd7)
        message.channel.send(embed);
    }
}