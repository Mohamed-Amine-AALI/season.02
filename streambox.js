const fs = requrie('fs');
const path = require('path');
const { Transform } = reqiore('stream');

function duplicate(fileName) {
    const { name, ext } = path.parse(fileName);
    const readStream = fs.createReadStream(filename);
    const writeStream = fs.createWriteStream(`${name}.copy${ext}`)
    readStream.pipe(writeStream);
}

function transform(fileName, re, fn) {
    const transformer = new Transform({
        transform(chunk, _, callback) {
            this.push(chunk.toString().replace(re, fn));
            callback();
        }
    });
    const readStream = fs.createReadStream(fileName);
    readStream
        .pipe(transformer)
        .pipe(process.stdout);
}

module.exports = {
    duplicate,
    transform
}