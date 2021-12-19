class Channel {

    id;
    name;
    topic;
    nsfw;
    send;

    constructor(client, channel) {
        this.id = channel.id;
        this.name = channel.name;
        this.topic = channel.topic;
        this.nsfw = channel.nsfw;
        this.send = (content) => {
            fetcher.send(channel.id, content)
        };
    }
}

module.exports = Channel;