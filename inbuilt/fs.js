// file system
let fs = require('fs');

///this will overwrite the existing file
// fs.writeFile('mytext.txt','This is 2022',function(err){
//     if(err) throw err;
//     console.log('Task Done')
// })

// this will add the content in same file
fs.appendFile('mycode.txt',`${Math.floor(Math.random()*1000)} Node Code \n`,function(err){
    if(err) throw err;
    console.log('File Appended')
})


