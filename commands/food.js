const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { brotliDecompressSync } = require('zlib');

module.exports = {
    name:'food',
    description:'random food picts',
    async execute(message, args){
        try {
            const { body } = await fetch('https://www.reddit.com/r/FoodPorn.json?sort=top&t=week')
                
            const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
            const randomnumber = Math.floor(Math.random() * allowed.length)
            const embed = new MessageEmbed()
            .setColor(0xffabd7)
            .setTitle(allowed[randomnumber].data.title)
            .setDescription("Posted by: " + allowed[randomnumber].data.author)
            .setImage(allowed[randomnumber].data.url)
            .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
            .setFooter("Memes provided by r/dankmemes")
            message.channel.send(embed)
        } catch(err){
            return console.log(err);
        }
    }
}