const http = require('http');

const server = http.createServer((request, response) => {

    const envVarKeys = Object.keys(process.env)
        .filter(key => typeof request[key] != 'object')
        .filter(key => !key.match(/npm_/g))
        .sort();

    const envArgs = envVarKeys.reduce((agg, key) => `${agg}\r${key}: ${process.env[key]}`, "ENVIRONMENT VARS:")

    const reqArgKeys = Object.keys(request)
        .filter(key => typeof request[key] != 'object')
        .sort();

    const reqArgs = reqArgKeys.reduce((agg, key) => `${agg}\r${key}: ${request[key]}`, "REQUEST:")

    const today = new Date();

    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    const headMsg = `Hello World from Version 1. Its ${time}! `

    const msg = `${headMsg}\r\r${envArgs}\r\r${reqArgs}`;

    response.end(msg);

    response.writeHead(200, { "Content-Type": "text/plain" });

    console.log(headMsg);
});

const port = process.env.PORT || 1337;

server.listen(port);