const bingus =["https://media.discordapp.net/attachments/748780918067691582/810331948215566336/6tqnyhodlb861.jpg?width=559&height=552",
 "https://media.discordapp.net/attachments/748780918067691582/810331982743076884/Hi_Bingus.png",
"https://media.discordapp.net/attachments/748780918067691582/810332004439556116/EovwM_CWMAEB_BZ.jpg?width=516&height=552",
"https://media.discordapp.net/attachments/748780918067691582/810332015060451328/l58auzpyw5p51.jpg?width=589&height=551",
"https://media.discordapp.net/attachments/748780918067691582/810332024577196053/gvzyqWI.jpg?width=457&height=552",
"https://media.discordapp.net/attachments/775500327079903252/810349102097104897/image0.png?width=489&height=552",
"https://media.discordapp.net/attachments/775500327079903252/810349102357282816/image1.png?width=573&height=552",
"https://cdn.discordapp.com/attachments/775500327079903252/810349102659010580/image2.png",
"https://media.discordapp.net/attachments/775500327079903252/810348912690855946/image0.png",
"https://media.discordapp.net/attachments/775500327079903252/810349855238389780/image0.png?width=572&height=552",
"https://media.discordapp.net/attachments/775500327079903252/810350131386908712/image0.png?width=581&height=552",
"https://media.discordapp.net/attachments/775500327079903252/810350131941474324/image1.png?width=584&height=552",
"https://media.tenor.co/videos/f0870b1ec2ff020ed3a2f41438617d42/mp4",
"https://media.tenor.co/videos/d51510fe78a434d7e5ae79e7b4e32a76/mp4"
]
module.exports = {
    name : 'bingus',
    description: 'bingus',
    execute(message, args){
        message.channel.send(bingus[Math.floor(Math.random()*bingus.length)]);
    }
}