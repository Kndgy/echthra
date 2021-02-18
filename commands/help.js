const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    value: 'help command',
    execute(message){
    const help = new MessageEmbed()
    .setColor(0x151b54)
    .setTitle('help')
    .setDescription('list of available command')
    .addFields(
      { name: 'ping', value: 'information about bot and API latency'},
      { name: 'join', value: 'join a voice channel'},
      { name: 'play "youtube url"', value:'play a song from youtube, without quotation'},
      { name: 'skip', value:'skip a song'},
      { name: 'stop', value:'remove queue and disconnect bot from voice channel'},
      { name: 'leave', value:'disconenct bot from voice channel'},
      { name: 'advice', value:'gives you random and *useful* advices'},
      { name: 'topic', value: 'gives you random topics as conversation starter'},
      { name: 'thought', value: 'just thought'},
      { name: 'roll', value: 'rolls dice 1-100'},
      { name: 'flip', value: 'flip a coint' },
      { name: 'cat', value: 'gives you cets picture'},
      { name: 'urban ', value: 'search for urban dictionary, ex: urban bruh'}
    )
    .setTimestamp()
    .setFooter('[wip]spotify, playlist, queue list, implement calculator into main file');
    message.channel.send(help);
    }
}