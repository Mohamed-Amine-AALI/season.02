const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

function duplicate(fileName) {
    const { name, ext } = path.parse(fileName);
    console.log(name);
    console.log(ext);
    const readStream = fs.createReadStream(fileName);
    const writeStream = fs.createWriteStream(`${name}.copy${ext}`)
    readStream.pipe(writeStream);
}

function transform(fileName, re, fn, std_out) {
    const transformer = new Transform({
        transform(chunk, _, callback) {
            this.push(chunk.toString().replace(re, fn));
            callback();
        }
    });
    const readStream = fs.createReadStream(fileName);
    if (std_out) {
        readStream
            .pipe(transformer)
            .pipe(process.stdout);
    }
    else {
        const writeStream = fs.createWriteStream('./output.txt');
        readStream
            .pipe(transformer)
            .pipe(writeStream);
    }
}

module.exports = {
    duplicate,
    transform
}