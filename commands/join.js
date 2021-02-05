module.exports = {
    name: 'join',
    description: 'join a voice channel',
    execute(message, args){
        if(message.member.voice.channel){
            message.member.voice.channel.join();
            message.react('👍') ;
          } else {
            message.channel.send("you are not in any voice channel");
          }
    },
};