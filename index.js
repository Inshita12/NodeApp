const http = require('http');
const port = 8000;
const fs = require('fs');
var path = require('path');

function requestHandler(req, res) {
    console.log('url', req.url);
    let filepath = '.' + req.url;
    let contentType = 'text/html';
    switch (req.url) {
        case '/':
            filepath = './index.html';
            break;
        case '/profile':
            filepath = './profile.html';
            break;
        case '/resume':
            filepath = './Resume/index.html';
            break;
        default:
    }
    let extname = path.extname(filepath);
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.ico':
            filepath = './404.html';
            contentType = 'text/html';
            break;
        case '':
            filepath = './404.html';
            contentType = 'text/html';
            break;
    }
    fs.readFile(filepath, function (err, data) {
        if (err) {
            console.log('error', err);
            return res.end('<h1>Error</h1>');
        }
        res.writeHead(200, { 'content-type': contentType });
        return res.end(data);
    });
}

const server = http.createServer(requestHandler);

server.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Server is up and running on port', port);
});