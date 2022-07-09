const http = require('http');

const PORT = 4999;

const ip = 'localhost';

// const server = http.createServer((request, response) => {
//   console.log(
//     `http request method is ${request.method}, url is ${request.url}`
//   );
//   response.writeHead(200, defaultCorsHeader);
//   response.end('hello mini-server sprints');
// });

// 서버 구동
const server = http.createServer((request, response) => {
  const { method, url } = request;
  // if: 메소드가 options 인 경우
  if (method === "OPTIONS") {
    response.writeHead(200, defaultCorsHeader);
    response.end();
  }
  // if: 메소드가 POST url이 /upper 인 경우
  else if (method == "POST") {
    let data = "";
    request
      .on("data", (chunk) => {
        // console.log(chunk);
        data = data + chunk;
      })
      .on("end", () => {
        if (url === "/upper") {
          data = data.toUpperCase();
          response.writeHead(201, defaultCorsHeader);
          response.end(data);
        } else if (url === "/lower") {
          data = data.toLowerCase();
          response.writeHead(201, defaultCorsHeader);
          response.end(data);
        } else {
          response.writeHead(404, defaultCorsHeader);
          response.end("not found");
        }
      }).on("error", err => console.log(err));
  } else {
    response.writeHead(400, defaultCorsHeader);
    response.end("bad reqeust");
  } 
});

server.listen(PORT, ip, () => {
  console.log(`http server listen on ${ip}:${PORT}`);
});

const defaultCorsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Max-Age': 10
};
