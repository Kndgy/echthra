const fetch = require('node-fetch');

module.exports = {
    name: 'dog',
    description: 'dog',
    async execute(message, args,){
            const {file} = await fetch('https://dog.ceo/api/breeds/image/random').then(
            response => response.json());
        message.channel.send(file);
    }
}