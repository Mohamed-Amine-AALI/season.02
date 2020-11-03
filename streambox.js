const { cpuUsage } = require('process');
const { Transform } = require('stream');
const fs = require('fs')
const path = require('path')
const readline = require('readline')

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

function csv2json(filename) {
    const input = fs.createReadStream(filename)
    const rl = readline.createInterface({ input })
  
    let headers = []
    let records = []
  
    let lineCount = 0
  
    rl.on('line', (line, i) => {
      if (lineCount === 0) {
        headers = line.split(';')
      } else {
        const record = {}
  
        line.split(';').forEach((value, i) => {
          const key = headers[i]
  
          if (value.includes(',')) {
            record[key] = value.split(',')
          } else {
            record[key] = value
          }
        })
  
        records.push(record)
      }
  
      lineCount++
    })
  
    rl.on('close', () => {
      const { name } = path.parse(filename)
  
      fs.writeFile(`${name}.json`, JSON.stringify(records, null, 2), (err) => {
        if(err) {
          return console.log(err);
        }
  
        console.log(`${filename} converted to json: ${name}.json`)
      })
    })
  }

function WTFIsThisPipe() {
    fs.readdir(__dirname, (error, files) => {
        for (const filename of files.filter(filename => filename.endsWith('.js'))) {
            const input = fs.createReadStream(filename);
            const rl = readline.createInterface({ input });
            rl.on('line', (line) => {
                if (/^[\t ]*function/g.test(line)) {
                    console.log(line.replace('function', 'I ill finish:').slice(0, -2));
                }
            });
        }
    })
}

module.exports = {
    duplicate,
    transform,
    csv2json,
    WTFIsThisPipe
}