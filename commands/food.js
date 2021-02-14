const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { brotliDecompressSync } = require('zlib');

module.exports = {
    name:'food',
    description:'random food picts',
    async execute(message, args){
        try {
            const { file } = await fetch('https://www.reddit.com/r/FoodPorn.json?sort=top&t=week')
                
            if (!file.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
            const randomnumber = Math.floor(Math.random() * file.length)
            const embed = new MessageEmbed()
            .setColor(0xffabd7)
            .setTitle(file[randomnumber].data.title)
            .setDescription("Posted by: " + file[randomnumber].data.author)
            .setImage(file[randomnumber].data.url)
            .addField("Other info:", "Up votes: " + file[randomnumber].data.ups + " / Comments: " + file[randomnumber].data.num_comments)
            .setFooter("Memes provided by r/dankmemes")
            message.channel.send(embed)
        } catch(err){
            return console.log(err);
        }
    }
}