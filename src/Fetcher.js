const fetch = require("node-fetch");

class Fetcher {

    constructor(client) {
        this.client = client;
    }

    send(channelID, content, replyTo) {
        return fetch(`https://discord.com/api/v8/channels/${channelID}/messages`, {
            method: 'post',
            body: JSON.stringify({ content, message_reference: replyTo || "" }),
            headers: {
                'Authorization': `Bot ${this.client.token}`,
                'Content-Type': 'application/json'
            }
        }).then(d => d.json());
    }

    getChannelInfo(channelID) {
        return fetch(`https://discord.com/api/v8/channels/${channelID}`, {
            headers: {
                'Authorization': `Bot ${this.client.token}`,
                'Content-Type': 'application/json'
            }
        }).then(d => d.json());
    }

	interactionReply(interactionID, interactionTOKEN, content) {
		return fetch(`https://discord.com/api/v8/interactions/${interactionID}/${interactionTOKEN}/callback`, {
			method: 'post',
            body: JSON.stringify({ data: { content }, type: 4 }),
            headers: {
                'Authorization': `Bot ${this.client.token}`,
                'Content-Type': 'application/json'
            }
		})
	}

}

module.exports = Fetcher;