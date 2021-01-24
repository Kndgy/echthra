module.exports = {
    name : 'roll',
    description: 'rolls random number 1-100',
    execute(message, args){
        message.channel.send(Math.floor(Math.random()*100));
    }
}
