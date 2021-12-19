const Fetcher = require("../Fetcher");

module.exports = async (client, message) => {
    const fetcher = new Fetcher(client);
    let chInfo = await fetcher.getChannelInfo(message.channel_id) || {};
    let parentInfo = await fetcher.getChannelInfo(chInfo.parent_id);
    return {
        author: message.author,
        channel: {
            id: message.channel_id,
            send: (content) => {
                fetcher.send(message.channel_id, content)
            },
            name: chInfo.name,
            topic: chInfo.topic,
            lastMessage: chInfo.last_message_id,
            nsfw: chInfo.nsfw,
            position: chInfo.position,
            type: chInfo.type,
            parent: parentInfo
        },
        reply: (content) => {
            fetcher.send(message.channel_id, content, { message_id: message.id, guild_id: message.guild_id })
        },
        guild: {
            id: message.guild_id
        },
        timestamp: new Date(message.timestamp),
        content: message.content,
    }
}