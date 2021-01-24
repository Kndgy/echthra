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
   }

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