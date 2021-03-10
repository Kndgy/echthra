var pixabay = require('pixabay-api')
var key = process.env.pixabay;

module.exports = {
    name: 'search',
    description: 'search for images from pixabay',
    async execute(message, args){
        let search = args;
        search = []
        var r = await pixabay.searchImages(key, search)
        message.channel.send(r.hits[Math.floor(Math.random()*r.hits.length)].largeImageURL)
    }
}