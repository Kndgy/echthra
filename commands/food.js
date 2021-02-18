const fetch = require('node-fetch')

module.exports = {
    name: 'food',
    description: 'fooods',
    async execute(message, args){
        try {
            const { body } = await fetch('https://www.reddit.com/r/foodporn.json?sort=top&t=week').then(
                response => response.json());
              
            
            message.channel.send(body)
        } catch (err) {
            return console.log(err);
        }
    }
}