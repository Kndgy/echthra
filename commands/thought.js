const { Message } = require('discord.js');
const thoughts = require('./thought.json');

module.exports = {
    /*thanks to ema and snowy for many thought contribution*/
    name: 'thought',
    aliases:['tought, thout, thougt, tougt'],
    description: 'just thought',
    execute(message){
        message.channel.send(thoughts.thought[Math.floor(Math.random()*thoughts.thought.length)]);
    }
}