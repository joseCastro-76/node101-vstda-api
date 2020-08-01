const server = require('./app');

const port = 8484;

// write your code here
server.listen(port, function() {
    console.log(`Server is listening on http://localhost:${port}`);
})