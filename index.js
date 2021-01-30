require('dotenv').config(); 
const fs = require('fs');
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();

client.on('ready', () => {
  client.user.setPresence({ game: { name: 'with discord.js' }, status: 'idle' })
  console.log(`${client.user.username} is up and running!`);
})

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const prefix = "'";

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if(command === 'ping'){
    message.channel.send(`this bot API latency is ${Math.round(client.ws.ping)}ms.`)
   }else if(command === 'join'){
    if(message.member.voice.channel){
      message.member.voice.channel.join();
      message.react('👍') ;
    } else {
      message.channel.send("you are not in any voice channel");
    }
  }else if(command === 'leave'){
    if(message.member.voice.channel){
      message.member.voice.channel.leave();
      message.react('👍') ;
  }else{
    message.channel.send("there was an error executing that command");
  }
};

  if(!client.commands.has(command)) return;
  
  try {
    client.commands.get(command).execute(message, args);
  } catch (error){
    console.error(error);
    message.reply('there was an error to execute that command');
  }
});


client.on('message', async message => {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  
  if(command === 'urban'){
    /*urban rest api from urban dictionary*/
    if(!args.length){
      return message.channel.send('you need to type what you are looking for');
    }
    const query = querystring.stringify({ term: args.join('')});
    const {list} = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(
      response => response.json()
    );
    if(!list.length){
      return message.channel.send(`no results found for${args.join(' ')}**.`);
    }
    /* embed for urban */
    const trim = (str, max) => ((str.length>max) ? `${str.slice(0, max - 3)}...` : str);
    const [answer] = list;
    const embed = new MessageEmbed()
    .setColor(0x151b54)
    .setTitle(answer.word)
    .setURL(answer.permalink)
    .addFields(
      { name: 'Definition', value: trim(answer.definition, 1024)},
      { name: 'Example', value: trim(answer.example, 1024)},
      { name: 'Rating', value: `👍 ${answer.thumbs_up}. 👎 ${answer.thumbs_down}.`}
    );
    message.channel.send(embed)
  } else {
    return;
  }
  
});

const {Player} = require("discord-player");

const player = new Player(client);

client.player = player

client.player = player;

client.player.on('trackstart', (message, track) => message.channel.send(`Now playing ${track.title}`))

client.on("message", async (message) => {
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if(command === "play"){
    client.player.play(message,args[0]);
  }
});

client.login(process.env.TOKEN);

const http = require('http');
const { trace } = require('console');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);