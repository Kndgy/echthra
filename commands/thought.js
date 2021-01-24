const { Message } = require('discord.js');
const thoughts = require('./thought.json');

module.exports = {
    /*thanks to ema and snowy for many thought contribution*/
    name: 'thought',
    description: 'just thought',
    execute(message, args){
        message.channel.send(thoughts.thought[Math.floor(Math.random()*thoughts.thought.length)]);
    }
}