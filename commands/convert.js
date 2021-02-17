module.exports = {
    name: 'convert',
    description: 'convert',
    execute(message,args){
        const numArgs = args.map(x => parseInt(x, 2));
        const convert = numArgs.reduce((x) => x);

        message.channel.send(`decimal : ${convert}`)
        
    }
}