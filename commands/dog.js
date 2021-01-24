const fetch = require('node-fetch');

module.exports = {
    name: 'dog',
    description: 'dog',
    async execute(message, args,){
        async function dog(){
            const {file} = await fetch('https://dog.ceo/api/breeds/image/random').then(
            response => response.json()
        );
        return file;
        }
        message.channel.send(dog);
    }
}