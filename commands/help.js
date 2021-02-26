const {prefix} = require('../config.json')

module.exports = {
    name:'help',
    description:'help',
    execute(message, args) {
        const data = [];
        const {commands} = message.client;
        
        if(!args.length){
            data.push('Here\'s a list of all my commands: ');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nyou can send\`${prefix}help[command name]\`to get info on a specific command`)

            return message.channel.send(data, {split: true})
            
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command){
            return message.reply('that\'s not a valid command');
        }

        data.push(`**name:**${command.name}`);

        if (command.aliases) data.push(`**aliases:**${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:**${command.description}`);
        if (command.usage) data.push(`**usage:**${prefix}${command.name} ${command.usage}`);

        data.push(`**cooldown:**${command.cooldown || 3} second(s)`);

        message.channel.send(data,{split:true})
    },
};