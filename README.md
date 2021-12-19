# dis.js
## Installation

**Node.js LTS or newer is required.**  

```sh-session
npm install dis.js
```

## Example usage

```js
const Discord = require("dis.js")
const client = new Discord.Client();

client.login(token).then(() => console.log("I am ready!"));

client.on("message", (message) => {
    if (message.content === "!ping") message.channel.send(new Date() - message.timestamp + "ms");
    if (message.content === "!reply") message.reply("Hello!");
})
```

## Links

- [Documentation](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
- [GitHub](https://github.com/yee-studios/dis.js)
- [npm](https://www.npmjs.com/package/dis.js)
