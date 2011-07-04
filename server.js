var sys = require("sys"),  
    http = require("http"),  
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");


http.createServer(function(request, response) {  
  var uri = url.parse(request.url).pathname;  
  if (uri == '/') {
    var filename = path.join(process.cwd(), '/app.html');  
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {  
        response.sendHeader(500, {"Content-Type": "text/plain"});  
        response.write(err + "\n");  
        response.end();
        return;  
      }  

      response.writeHead(200, {'content-type': 'text/html'});
      response.write(file);
      response.end();
    });  
  } else {
    response.sendHeader(500, {"Content-Type": "text/plain"});  
    response.write("Dude, I have no idea what a " + uri + " is.");  
    response.end();
  };  
}).listen(8080);  

sys.puts("Server running at http://localhost:8080/");  

