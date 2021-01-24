const topics = require('./topic.json');

module.exports = {
    name : 'topic',
    description: 'gives you random topics',
    execute(message, args){
        message.channel.send(topics.topic[Math.floor(Math.random() * topics.topic.length)]);
    }
}