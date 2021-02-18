module.exports = {
    name : 'devide',
    description: 'devide',
    aliases:['divide'],
    execute(message, args){
        const numArgs = args.map(x => parseFloat(x));
        const devide = numArgs.reduce((counter, x) => counter /=x);
        message.channel.send(`total ${devide}`)
    }
}