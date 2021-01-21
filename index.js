require('dotenv').config(); 
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');
const advicelist = require('./advice.json');
const topics = require('./topic.json');


client.on('ready', () => {
  client.user.setPresence({ game: { name: "bruh" }, status: 'online' })
  console.log(`${client.user.username} is up and running!`);
})

const coint = ["head", "tail"];

client.on('ready', ()=>{
  console.log('true');
});

/*thanks to ema for the advices*/

const prefix = "*";

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.channel.send(`your ping is ${Date.now() - message.createdTimestamp}ms. and this bot API Latency is ${Math.round(client.ws.ping)}ms`);
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
    }
  }else if(command === 'leave'){
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
      { name: 'roll', value: 'rolls dice 1-100'},
      { name: 'flip', value: 'flip a coint' },
      { name: 'monke', value:'flip'},
    )
    .setTimestamp()
    .setFooter('[wip]spotify, playlist, queue list, implement calculator into main file');
    message.channel.send(help);
  }else{
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