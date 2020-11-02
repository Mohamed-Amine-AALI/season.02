const events = require('events');

function empty() {
    let event = new events.EventEmitter();
    event.on("hiListener", data => {
        console.log(data);
    });
    event.emit("hiListener", "Hi");
}

function withArgs(arr) {
    arr.forEach(element => {
        let event = new events.EventEmitter();
        event.on("listener", data => {
            console.log(`Here come's a new pirate ->> ${data}`);
        });
        event.emit("listener", element);
    });
}
module.exports = {
    empty,
    withArgs
}