const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3000;

// Create HTTP server.
const server = http.createServer(app);

server.listen(port,function (err) {
    if (err) {
        console.log(err.stack);
    }
    console.log(`Express app is running on port : ${port}`);
});