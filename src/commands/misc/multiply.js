module.exports = {
    name : 'multiply',
    description: 'multiply integer from given arguments',
    execute(message, args){
        const numArgs = args.map(x => parseFloat(x));
        const multiply = numArgs.reduce((counter, x) => counter *=x);
        message.channel.send(`total ${multiply}`)
    }
}