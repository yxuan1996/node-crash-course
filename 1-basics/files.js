// Import Filesystem module
const fs = require('fs');

//reading files
fs.readFile('./blog.txt', (err, data) => {
    if (err) {
      console.log(err);
    }  
    console.log(data.toString());
});


// writing files
// Second parameter is what to write
fs.writeFile('./blog2.txt', 'hello, again', () => {
    console.log('file was written');
});


// directories
// Create Directory assets if it does not exist. Else, delete it. 
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', err => {
      if (err) {
        console.log(err);
      }
      console.log('folder created');
    });
  } else {
    fs.rmdir('./assets', err => {
      if (err) {
        console.log(err);
      }
      console.log('folder deleted');
    });
  }


// deleting files
// Delete file if it exists. 
if (fs.existsSync('./deleteme.txt')) {
    fs.unlink('./deleteme.txt', err => {
      if (err) {
        console.log(err);
      }
      console.log('file deleted');
    });
  }