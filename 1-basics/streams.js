// Import the filesystem module
const fs = require('fs');

// Read from blog3.txt and write to blog4.txt
// Need to specify the encoding format to view the data buffer in readable format
const readStream = fs.createReadStream('./blog3.txt', { encoding: 'utf8'});
const writeStream = fs.createWriteStream('./blog4.txt');

// Event Listener for new data stream
// Will run everytime a new chunk of data is available
readStream.on('data', chunk => {
  console.log('---- NEW CHUNK ----');
  console.log(chunk);
  writeStream.write('\nNEW CHUNK:\n');
  writeStream.write(chunk);
});

// piping
// Shorter code that achieves the same result as above
// Get whatever is read in the readStream and pipe it to writeStream
readStream.pipe(writeStream);