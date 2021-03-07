const {MessageEmbed} = require ('discord.js');
const https = require("https");

module.exports={
    name:'define',
    description:'define',
    execute(message,args){
        
        if(!args.length){
            message.channel.send("Please specify the word you would like to define! :smile:");
          }

    const http = {
    getDefinition: (word, callback) => {
    const app_id = process.env.app_id;
    const app_key = process.env.app_key
    const options = {
      hostname: "od-api.oxforddictionaries.com",
      path: `/api/v2/entries/en-gb/${word}?fields=definitions`,
      headers: {
        app_id,
        app_key
      }
    };

    https.get(options, res => {
      let data = "";

      res.on("data", chunk => {
        data += chunk;
      });

      res.on("end", () => {
        http.handleResponse(res.statusCode, data, callback);
      });

      res.on("error", e => {
        callback({
          status: res.statusCode,
          message: "There was an error with your request :thinking:",
          data: {}
        });
      });
    });
  },

  handleResponse: (statusCode, data, callback) => {
    switch (statusCode) {
      case 404:
        callback({
          status: statusCode,
          message: "I couldn't find the word you were looking for :cry:",
          data: {}
        });
        break;

      case 200:
        const entry = http._getFirstEntry(data);

        callback({
          status: statusCode,
          message: "",
          data: {
            definition: http._capitaliseDefinition(
              http._parseDefinition(entry)
            ),
            lexicalCategory: http._parseLexicalCategory(entry)
          }
        });
        break;

      default:
        callback({
          status: 403,
          message: "There was an error with your request :thinking:",
          data: {}
        });
    }
  },

  _getFirstEntry: data =>
    JSON.parse(data).results[0].lexicalEntries.find(lex =>
      lex.hasOwnProperty("entries")
    ),

  _parseDefinition: data => data.entries[0].senses[0].definitions[0],

  _parseLexicalCategory: data => data.lexicalCategory.text,

  _capitaliseDefinition: data => data.charAt(0).toUpperCase() + data.slice(1)
};


            const word = args[0];
      
            http.getDefinition(word, ({ data = {}, message = "", status }) => {
              if (status === 404) {
                message.channel.send(message);
      
                return;
              }
      
              if (status === 200) {
      
                const embed = new MessageEmbed()
                .setTitle('Definiton')
                .addFields(`${word} - ${data.lexicalCategory}`, data.definition);
                message.channel.send(embed);
              } else {
                message.channel.send(message);
              }
            });
           
    }
}