const EventEmitter = require("events");
// class emitter extends EventEmitter{}
const myEmitter=new EventEmitter();
myEmitter.on("event",()=>{
    console.log('event has been called')
})
myEmitter.emit("event")