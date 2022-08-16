// operating system
let os = require('os');
console.log("hiiiiiii") 
console.log(os.platform()) // platform darwin
console.log(os.arch()) //x64
console.log(os.cpus().length+" core") //4 core
console.log(os.freemem()) //129888256 byte
console.log(os.hostname())
console.log(os.uptime()) //297876 sec