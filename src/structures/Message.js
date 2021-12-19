const Fetcher = require("../Fetcher");

class Message {

    author;
    channel;
    reply;
    guild;
    timestamp;
    content;

    constructor(client, message) {
        const fetcher = new Fetcher(client);
        this.author = message.author;
        this.channel = {
            id: message.channel_id,
            send: (content) => {
                fetcher.send(message.channel_id, content)
            }
        };
        this.reply = (content) => {
            fetcher.send(message.channel_id, content, { message_id: message.id, guild_id: message.guild_id })
        };
        this.guild = message.guild;
        this.timestamp = new Date(message.timestamp);
        this.content = message.content;
    }
}

module.exports = Message;