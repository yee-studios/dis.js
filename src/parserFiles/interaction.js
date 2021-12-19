const Fetcher = require("../Fetcher");

module.exports = async (client, interaction) => {
    const fetcher = new Fetcher(client);
    let chInfo = await fetcher.getChannelInfo(interaction.channel_id) || {};
    let parentInfo = await fetcher.getChannelInfo(chInfo.parent_id);
    return {
        author: interaction.member.user,
		member: interaction.member,
        channel: {
            id: interaction.channel_id,
            send: (content) => {
                fetcher.send(interaction.channel_id, content)
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
            fetcher.interactionReply(interaction.id, interaction.token, content)
        },
        guild: {
            id: interaction.guild_id
        },
        options: interaction.data.options,
		name: interaction.data.name,
		id: interaction.data.id
    }
}