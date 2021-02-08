const riddles = require('./riddle.json');

module.exports = {
    name : 'riddle',
    description: 'riddle me this',
    execute(message, args){
        message.channel.send('Riddle me this');
        message.channel.send(riddles.riddle[Math.floor(Math.random()*riddles.riddle.length)]);
    }
}