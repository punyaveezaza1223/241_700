//ทำการimportโมดูลhttp
const http = require('http');
const host = 'localhost';
const port = 8000;

//กำหนดค่าserver
const reqestListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello, World!');
}

//Run server
const server = http.createServer(reqestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
