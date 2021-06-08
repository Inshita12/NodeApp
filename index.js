const http = require('http');

const port = 8000;
const fs = require('fs');

function requestHandler(request, response) {
  console.log(request.url);

  response.writeHead(200, { 'content-type': 'text/html' }); //write Head is function but we can write anyname in place contentt-type

  // response.end('<h1>Hey This is my first server</h1>')

  let filePath;

  switch(request.url){
      case'/':
        filePath='./index.html'
        break;
      case'/profile':
        filePath='./profile.html'  
        break;
      default:
          filePath='./404.html'  
  }
  fs.readFile  
    (filePath,
    function (error, data) {
      if (error) {
        console.log('Error:', error);
        return response.end('<h1>Oops! There is some Error</h1>');
      }
      return response.end(data);
    });
}

const server = http.createServer(requestHandler);

server.listen(port, function (err) {
  if (err) {
    console.log('Error');
    return;
  } else {
    console.log('Server is running on port:', port);
  }
});
