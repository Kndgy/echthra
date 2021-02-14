const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { brotliDecompressSync } = require('zlib');

module.exports = {
    name:'food',
    description:'random food picts',
    async execute(message, args){
        try{
            const {file} = await fetch('https://www.https://www.reddit.com/r/FoodPorn.json?sort=top&t=week')
            MediaQueryList({limit:800});
            const allowed = message.channel.nsfw ? brotliDecompressSync.data.children : brotliDecompressSync.data.children.filter(post => !post.data.over_18);
            if(!allowed.length) 
            return message.channel.send
            ('it seems theres no food on tabl');
            const random = Math.floor(Math.random()*allowed.length)
            const embed = new MessageEmbed()
            .setColor(0xffabd7)
            .setTitle(allowed[random].data.title)
            .setDescription("Posted by: "+ allowed[random].data.author)
            .setImage(allowed[random].data.url)
            .addField("Up votes:"+allowed[random].data.ups+"/ comments: "+ allowed[random].data.num_comments)
            .setFooter("provided by /FoodPorn")
            message.channel.sen(embed) 
        } catch(err){
            return console.log(err);
        }
    }
}