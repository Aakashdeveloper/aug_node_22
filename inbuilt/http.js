let http = require('http');

// > req > what we pass to server(params,query,body)
// > res > what server responsed

let server = http.createServer(function(req, res){
    res.write('<h1>This is Node Server</h1>')
    res.end()
})

server.listen(6777);