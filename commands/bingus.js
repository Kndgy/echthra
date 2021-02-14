const bingus =["https://media.discordapp.net/attachments/748780918067691582/810331948215566336/6tqnyhodlb861.jpg?width=559&height=552",
 "https://media.discordapp.net/attachments/748780918067691582/810331982743076884/Hi_Bingus.png",
"https://media.discordapp.net/attachments/748780918067691582/810332004439556116/EovwM_CWMAEB_BZ.jpg?width=516&height=552",
"https://media.discordapp.net/attachments/748780918067691582/810332015060451328/l58auzpyw5p51.jpg?width=589&height=551",
"https://media.discordapp.net/attachments/748780918067691582/810332024577196053/gvzyqWI.jpg?width=457&height=552"]

module.exports = {
    name : 'bingus',
    description: 'bingus',
    execute(message, args){
        message.channel.send(bingus[Math.floor(Math.random()*bingus.length)]);
    }
}