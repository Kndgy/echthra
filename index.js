require('dotenv').config(); 
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');
const advicelist = require('./advice.json');
const topics = require('./topic.json');
const thoughts = require('./thought.json');
const fetch = require('node-fetch');
const querystring = require('querystring');

client.on('ready', () => {
  client.user.setPresence({ game: { name: 'with discord.js' }, status: 'idle' })
  console.log(`${client.user.username} is up and running!`);
})

const coint = ["head", "tail"];

client.on('ready', ()=>{
  console.log('true');
});

const prefix = "'";

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.channel.send(`this bot API Latency is ${Math.round(client.ws.ping)}ms.`);
    return;
  }else if(command === 'monke'){
    const embed = new MessageEmbed()
    .setTitle('flip')
    .setColor(0x151b54)
    .setDescription('monke flip');
    message.channel.send(embed);
  }else if ( command === "tes"){
    message.channel.send('tis');
  }else if(command === "advice"){
    /*thanks to ema for the advices*/
    message.channel.send(advicelist.advice[Math.floor(Math.random() * advicelist.advice.length)]);
  }else if(command === "topic"){
    message.channel.send(topics.topic[Math.floor(Math.random() * topics.topic.length)]);
  }else if(command === "roll"){
    message.channel.send("rolls (1-100)....");
    message.channel.send(Math.floor(Math.random()*100));
  }else if(command === "flip"){
    message.channel.send(coint[Math.floor(Math.random() * coint.length)]);
  } else if(command === 'join'){
    if(message.member.voice.channel){
      message.member.voice.channel.join();
      message.react('👍') ;
    } else {
      message.member.send("you are not in any voice channel");
    }
  }else if(command === 'thought'){
    message.channel.send(thoughts.thought[Math.floor(Math.random() * thoughts.thought.length)]);
  } else if(command === 'leave'){
    if(message.member.voice.channel){
      message.member.voice.channel.leave();
      message.react('👍') ;
  }
  }else if(command === 'help'){
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
      { name: 'monke', value:'flip'},
      { name: 'cat', value: 'gives you cets picture'},
      { name: 'urban ', value: 'search for urban dictionary, ex: urban bruh'}
    )
    .setTimestamp()
    .setFooter('[wip]spotify, playlist, queue list, implement calculator into main file');
    message.channel.send(help);
  }else{
    return;
  }
});


client.on('message', async message => {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  /*cat rest api from aws*/
  if (command === 'cat'){
    const {file} = await fetch('https://aws.random.cat/meow').then(
      response => response.json());
    message.channel.send(file);
  }else if(command === 'urban'){
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

const queue = new Map();

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    message.react('👍') ;
    execute(message, serverQueue);
    return;
  }else if (message.content.startsWith(`${prefix}skip`)) {
    message.react('👍') ;
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    message.react('👍') ;
    stop(message, serverQueue);
    return;
  } else {
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "you are not on any voice channel"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "i have no permission to join voice channel"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      filter: 'audioonly',
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} song added to the queue`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "you are not on any voice channel"
    );
  if (!serverQueue)
    return message.channel.send("there's no song on queue");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "you are not on any vocice channel"
    );
    
  if (!serverQueue)
    return message.channel.send("there's no song on queue");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url, {filter:'audioonly'}))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`playing: **${song.title}**`);
}

client.login();

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);