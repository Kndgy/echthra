var pixabay = require('pixabay-api')
var key = "20235915-ae4a7fd433d4ee7b7823ec7b5"
const {MessageEmbed} = require ('discord.js');

module.exports = {
    name: 'raccoon',
    description: 'racoon',
    async execute(message){
        var r = await pixabay.searchImages(key, 'raccoon')
        const embed = new MessageEmbed()
        .setTitle("RACCOOOOOOOOOON")
        .setImage(r.hits[Math.floor(Math.random()*r.hits.length)].largeImageURL)
        .setColor(0xffabd7)
        message.channel.send(embed);
    }
}