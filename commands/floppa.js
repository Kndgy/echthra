const floppa = [
    "https://media.discordapp.net/attachments/775500327079903252/810352140925141032/image0.jpg?width=552&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810352141252165632/image1.jpg?width=314&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810352141490716722/image2.jpg?width=710&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810352141750501376/image3.jpg",
    "https://media.discordapp.net/attachments/775500327079903252/810352141985120296/image4.png?width=552&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810352142460125184/image5.png?width=368&height=552"
]

module.exports = {
    name : 'floppa',
    description: 'floppa',
    execute(message, args){
        message.channel.send(floppa[Math.floor(Math.random()*floppa.length)]);
    }
}