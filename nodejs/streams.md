# Nodejs Streams

Nodejs streams are a builtin feature desinged to handle reading and writing data efficiently by processing it chunk by chunk rather the loading entire file into memory at once.

This makes them crucial for building scalable, performance driven applications that handle large files, video streaming or real-time network communications.

## Why use Streams?
- **Memory Efficiency:** Instead of buffering a massive 2 GB file entirely in RAM before processing, stream break it down into small chunks(e.g., 64KB), drastically reducing the memory footprint.

- **Time Efficiency:** Data processing can begin almost immediately as first chunk arrive, rather then waiting for the entire payload to transfer.

- **Composability:** You can easily chain multiple streams together(e.g., read a file &rarr; compress it &rarr; ecrypt it &rarr; write it).

## The 4 Core Type of Streams
All stream instances in NodeJs are built on top of EventEmmiter class, allowing them to emit events like `data`, `end`, and `error`.

1. Readable
A source from which data can be consumed.
fs.createReadStream, http.IncomingMessage

2. Writable
A destination to which data is written.
fs.createWriteStream,
http.ServerResponse

3. Duplex
A stream that is both Readable and Writable simultaneously (e.g., a two way channel).

4. Transform
A specialized Duplex stream that modifies or transform the data as it passes through.
zlib.createGzip()(compression),
crypto ciphers.

## Consuming Streams: Reading and Writing
Here is a practical look at how to use built in fs (File System) module to consume streams.

### 1. Reading from a Readable Stream

Readable Streams operates in 2 primary modes:
Paused(pull style, waiting for manual calls) and
Flowing (push style, automatically firing events).
Listing to the `data` event puts a stream into flowing mode:
```JavaScript
const fs = require('node:fs');

// Create a readable stream
const readStream = fs.createReadStream(',/large-inpuot.txt', { encoding: 'utf8' });

// Triggered every time a new chunk of data is ready
readStream.on('data', (chunk) => {
    console.log(`Received chunk of ${chunk.length} bytes.`);

});

// Triggered when the entire file has been read
readStream.on('end', () => {
    console.log('Finished reading file.');
})

// Crucial: Always handle stream errors
readStream.on('error', (err) => {
    console.error('An error occured:', err.message);
})
```

### 2. Writing to a Writable Stream
```JavaScript
const fs = require('node:fs')

const writeStream = fs.createWriteStream('./output.txt');

// Write data sequentially
writeStream.write('First chunk of data. \n');
writeStream.write('Second chunk of data. \n');

// Tell stream you are done writing
writeStream.end();

writeSteam.on('finish', () => {
    console.log('All data has been flushed to the file.');
});

```

## Connecting Streams: Piping & Pipelines

### The .pipe() Method
The easiest way to cosume data from a readable stream and send it directly to a writeable stream is via .pipe():

```JavaScript
const fs = require('node:fs');
const readStream = fs.createReadStream('input.txt')
const writeStream = fs.createWriteStream('output.txt')

// Copies input.txt straight into output.txt
readStream.pipe(writeStream);
```

### The Modern Approach:  stream.pipeline
While `.pipe()` is convenient, it **does not automatically clean up or handle errors properly**. Which can lead to memory leaks if a stream fails mid-transit. The recommended production standard is `stream.pipeline`, which safely destroys all streams in the chain if an error occurs:

```JavaScript
const { pipeline } = require('node:stream');
const fs = require('node:fs');
const zlib = require('node:zlib');

pipeline(
    fs.createReadStream('archive.txt'),
    zlib.createGzip(),
    fs.createWriteStream('archive.txt.gz'),
    (err) => {
        if(err) {
            console.error('Pipeline failed:', err.message);
        } else {
            console.log('Pipeline succeeded! File zipped successfully.');
        }
    }
)
```

## Key Concept: BackPressure
**BackPressure** can occur when a readable stream pushed data much faster than the writable destination can process it.

Node.js manages it internally via the `highWaterMark` option (a buffer limit threshold).
When a writable stream's internal buffer fillsup, `.write()` return `false`, signaling the readable stream to pause. Once the writable stream clears its buffer, it emits a 'drain' event, telling the readable stream it can safely resume.

Methods like .pipe() and pipeline automatically manage backpressure for you under the hood.