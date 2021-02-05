module.exports = {
    name: 'leave',
    description: 'leave the voice channel',
    execute(message, args){
        if(message.member.voice.channel){
            message.member.voice.channel.leave();
            message.react('👍') ;
        }else{
          message.channel.send("there was an error executing that command");
        }
    },
};