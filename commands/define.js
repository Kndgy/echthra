const { MessageEmbed } = require("discord.js");
const http = require("https");
const https = require("https");


module.exports = {
    name:'define',
    aliases:['def', 'df'],
    description:'define word from oxford dictionary',
    execute(message, args){
        if(!args.length){
            return message.channel.send('you need to add what youre looking for')
        }
            

const app_id = process.env.app_id; 
const app_key = process.env.app_key; 
const word = args[0];

const options = {
  host: 'od-api.oxforddictionaries.com',
  port: '443',
  path: `/api/v2/entries/en-gb/${word}?fields=definitions&strictMatch=false`,
  method: "GET",
  headers: {
    'app_id': app_id,
    'app_key': app_key
  }
};

http.get(options, (resp) => {
    let data = '';
    resp.on('data', (d) => {
        data += d;
    });
    
    resp.on('end', () => {
        let {results} = JSON.parse(data)
        const [answer] = results;
        const link = `https://www.lexico.com/definition/${word}`
        const embed = new MessageEmbed()
        .setColor(0xffabd7)
        .setTitle(word)
        .setURL(link)
        .addFields(
            {name: 'Part of Speech', value: (answer.lexicalEntries[0].lexicalCategory.text)},
            {name: 'Definition', value: (answer.lexicalEntries[0].entries[0].senses[0].definitions[0])}
        )
        .setFooter('retreived from oxford dictionary')
        message.channel.send(embed);
    });

});
        
    }
}