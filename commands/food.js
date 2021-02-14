const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name:'food',
    description:'random food picts',
    async execute(message, args){
        try {
            const { file } = await fetch('https://www.reddit.com/r/FoodPorn.json?sort=top&t=week')
            
            const random = Math.floor(Math.random() * file)
            const embed = new MessageEmbed()
            .setColor(0xffabd7)
            .setTitle(file[random].data.title)
            .setDescription("Posted by: " + file[random].data.author)
            .setImage(file[random].data.url)
            .addField("Up votes: " + file[random].data.ups + " / Comments: " + file[random].data.num_comments)
            .setFooter("Memes provided by r/dankmemes")
            message.channel.send(embed)
        } catch(err){
            return console.log(err);
        }
    }
}