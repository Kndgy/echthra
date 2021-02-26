const advicelist = require('./advice.json');

module.exports = {
    name : 'advice',
    description: 'gives you random and *useful* advice',
    execute(message){
        message.channel.send(advicelist.advice[Math.floor(Math.random() * advicelist.advice.length)]);
    },
};