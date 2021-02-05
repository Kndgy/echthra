require('dotenv').config(); 
const fs = require('fs');
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const prefix = "'";


client.on('ready', () => {
  client.user.setPresence({ game: { name: 'with discord.js' }, status: 'idle' })
  console.log(`${client.user.username} is up and running!`);
  client.setInterval(function(){
    var generalChannel = client.channels.cache.get("723794736325853209"); // Replace with known channel ID
    generalChannel.send("Hello, world!") ;
  }, 10000);
})


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

client.login(process.env.TOKEN);

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);