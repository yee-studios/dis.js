const EventEmitter = require('events');
const WebSocket = require("ws");
const ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json")
const Parser = require("./Parser");
const eventEmitter = new EventEmitter()
const { Message, Channel } = require("./structures/");

class Client {
    
    interval;

    /**
     * Logins into Discord
     * @param {String} token 
     */

    async login(token = this.token) {
        this.token = token;

        // the payload is information about the client
        // that discord recieves to establish the connection
        /**@private */
        this.payload = {
            op: 2,
            d: {
                token,
                intents: 32509, // all except privileged intents

                // these properties are for the discord client
                properties: {
                    $os: "linux",
                    $browser: "chrome",
                    $device: "linux"
                }
            }
        }

        ws.on("open", () => {
            // when the client connects, it sends the payload to discord
            // the payload is defined above
            ws.send(JSON.stringify(this.payload))
            return true;
        })

        ws.on("message", async (data) => {

            // DATA (from the docs)
            // op, integer: opcode for the payload
            // d, json: event data
            // s, integer: sequence number, used for resuming sessions and heartbeats
            // t, string: the event name for this payload

            // receiving discord events
            let p = JSON.parse(data);
            // p: payload
            switch (p.op) {
                // opcode 10 is "Hello": Sent immediately after connecting, contains the heartbeat_interval to use.
                case 10:
                    // sends information constantly so the connection persists
                    this.interval = heartbeat(p.d.heartbeat_interval)
                    break;
            }

            switch (p.t) {
                case "MESSAGE_CREATE":
                    // emits the message create event
                    eventEmitter.emit("message", new Message(this, p.d))
                    break;
                case "READY":
                    console.log(p.d)
                    eventEmitter.emit("ready", true)
                    break;
                case "INTERACTION_CREATE":
                    eventEmitter.emit("interactionCreate", await Parser.parseInteraction(this, p.d))
                    break;
                default:
                    console.log(p.t)
                    eventEmitter.emit(p.t, p.d)
                    break;
            }
        })

        // this is for the connection heartbeat
        function heartbeat(ms) {
            return setInterval(() => ws.send(JSON.stringify({ op: 1, d: null })), ms)
            // sends opcode 1 "Heartbeat": Fired periodically by the client to keep the connection alive.
        }
    }
    
    /**
     * @param {"interactionCreate" | "message" | "ready"} eventName
     * @param {function} callback 
     */
    on(eventName, callback) {
        eventEmitter.on(eventName, callback)
    }

    emit(eventName, ...data) {
        eventEmitter.emit(eventName, ...data)
    }

}

module.exports = Client;
