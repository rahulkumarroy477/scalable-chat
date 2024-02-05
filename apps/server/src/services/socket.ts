import { Server } from "socket.io";
import { Redis } from "ioredis";


const pub = new Redis({
    'host': 'redis-25c830b1-rahulkumarroy477-7701.a.aivencloud.com',
    'port': 27860,
    'username': 'default',
    'password': 'AVNS_trqgehzQQNdbGqppg3k'
});    // publishing message to redis

const sub = new Redis({
    'host': 'redis-25c830b1-rahulkumarroy477-7701.a.aivencloud.com',
    'port': 27860,
    'username': 'default',
    'password': 'AVNS_trqgehzQQNdbGqppg3k'
}
);    // shubscribing message
class SocketService {
    private _io: Server;
    constructor() {
        console.log('Init Socket Service...');
        this._io = new Server(
            {
                cors: {
                    allowedHeaders: ['*'],
                    origin: '*',
                }
            }
        );
        // subscribing to channel name Message
        sub.subscribe("MESSAGES");
    }
    public initListeners() {
        const io = this.io;
        console.log("Init Socket Listeners...");


        io.on('connect', (socket) => {
            console.log(`New Socket Connected`, socket.id);

            socket.on('event:message', async ({ message }: { message: string }) => {
                console.log("New Message received", message);

                // publish this message to redis
                await pub.publish('MESSAGES',JSON.stringify({message}));

            })
        });
        sub.on('message',(channel,message)=>{
            if(channel=="MESSAGES"){
                console.log('new Message from Redis',message);
                io.emit("message",message);
            }
        });

    }
    get io() {
        return this._io;
    }
}
export default SocketService;