module.exports = {
    name : 'sum',
    description: 'sum',
    execute(message, args){
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter +=x);
        message.channel.send(`total ${sum}`)
    }
}