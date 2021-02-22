const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
module.exports ={
    name:'star',
    description:'night sky',
    async execute(message, args){
            message.channel.send({embed:{
                color:0xffabd7,
                title:"random night sky and stars",
                description:'random night sky and stars pict from unsplash API',
                image:{
                    url : "https://source.unsplash.com/featured?stars" +Math.random()
                }
            }})
    }
}