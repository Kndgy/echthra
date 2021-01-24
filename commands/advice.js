const advicelist = require('./advice.json');

module.exports = {
    name : 'advice',
    description: 'gives you random advice',
    execute(message, args){
        message.channel.send(advicelist.advice[Math.floor(Math.random() * advicelist.advice.length)]);
    },
};