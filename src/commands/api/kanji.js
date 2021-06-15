const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name:'fumi',
    description:'search kanji from fumiko',
    async execute(message, args){

        if(!args.length){
            return message.channel.send('you need to type what you are looking for');
        }
        const query = args;
        const encoded = encodeURI(query.join(' '))
        const {data} = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encoded}`).then(
            response => response.json()
        );
        if(!data.length){
            return message.channel.send(`no results for ${query}`);
        }

        const [a] = data;
        const link = `https://jisho.org/search/${query}`
        const embed = new MessageEmbed()
        .setColor(0xffabd7)
        .setTitle(decodeURI(query))
        .setURL(link)
        .addFields(
            {name: 'word', value:(a.slug)},
            {name: 'english', value:(a.senses[0].english_definitions[0])}
        )
        message.channel.send(embed)
    }
}