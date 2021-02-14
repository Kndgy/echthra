const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const reddit = require('@elchologamer/random-reddit');

module.exports = {
    name:'food',
    description:'random food picts',
    execute(message, args){
        

        let options = {
           imageOnly: true,
           allowNSFW: true
        };
        
        reddit.getPost('https://www.reddit.com/r/FoodPorn/', options).then(post => { 
            
           var title = post.title
           var content = post.text
           var postURL = post.permalink
           var postAuthor = post.author
           var upvotes = post.upvotes
           var downvotes = post.downvots

           message.channel.send(post);
        })
        
    }
}