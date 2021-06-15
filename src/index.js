require('dotenv').config(); 
const fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./src/commands');

for (const folder of commandFolders){
  const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

const prefix = "'";

client.on('ready', () => {
  client.user.setPresence({ game: { name: 'with discord.js' }, status: 'idle' })
  console.log(`true`)
})

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if(commandName === "ping"){
    message.channel.send(`this bot API latency is ${Math.round(client.ws.ping)}ms.`);
  }

 const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

 if(!command) return

  try {
   command.execute(message, args);
  } catch (error){
    console.error(error);
    message.reply('there was an error to execute that command');
  }
});

client.login(process.env.TOKEN);

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);