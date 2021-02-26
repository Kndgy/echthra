const floppa = [
    "https://media.discordapp.net/attachments/775500327079903252/810352140925141032/image0.jpg?width=552&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810352141252165632/image1.jpg?width=314&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810352141490716722/image2.jpg?width=710&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810352141750501376/image3.jpg",
    "https://media.discordapp.net/attachments/775500327079903252/810352141985120296/image4.png?width=552&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810352142460125184/image5.png?width=368&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617177723371530/image0.png?width=453&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617178067959868/image1.png?width=452&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617178470481950/image2.png?width=445&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617178923204648/image3.png?width=453&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617179359019008/image4.png?width=473&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617179741487144/image5.png?width=463&height=551",
    "https://media.discordapp.net/attachments/775500327079903252/810617180047147038/image6.png?width=552&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617180395405332/image7.png?width=1016&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617180806184960/image8.png?width=550&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617181057581096/image9.png?width=531&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617181057581096/image9.png?width=531&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617196337168445/image0.png?width=584&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617196685688873/image1.png?width=670&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617197130809375/image2.png?width=560&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/810617197500039218/image3.png?width=563&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/811855828222214145/k1t6xac6k7u51.png?width=552&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/811855940730486795/Ehpdoe4X0AAltSR.png?width=508&height=552",
    "https://media.discordapp.net/attachments/775500327079903252/814346440293875763/image0.png?width=592&height=562",
    "https://tenor.com/view/big-floppa-floppa-huge-floppa-darkar1357-dodonation-gif-19981490",
    "https://tenor.com/view/floppa-jakecord-floppacord-sadlynut-sadnut-gif-18885442",
    "https://cdn.discordapp.com/attachments/405550360749539328/812896805191680030/52xusnsudoi61.png"
]

module.exports = {
    name : 'floppa',
    description: 'random floppa colelctions picts',
    execute(message){
        message.channel.send(floppa[Math.floor(Math.random()*floppa.length)]);
    }
}