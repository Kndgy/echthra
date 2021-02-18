module.exports = {
    name : 'subtract',
    description: 'subtract',
    aliases:['substract','subtracts','substracts'],
    execute(message, args){
        const numArgs = args.map(x => parseFloat(x));
        const substract = numArgs.reduce((counter, x) => counter -=x);
        message.channel.send(`total ${substract}`)
    }
}