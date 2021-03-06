/**
 * 独立服务，独立域名，方便整合及移除
 */

 process.env.NODE_ENV = 'development';

 const http = require('http');
 const path = require('path');
 const express = require('express');
 const mockjs = require('express-mockjs');

 const port = 8090;
 const app = express();
 const server = http.createServer(app);

 app.use('/api', mockjs(path.join(__dirname, 'mocks')));

 server.listen(port);
 server.on('listening', () => {
   console.log(`listening on http://localhost:${port}/api`);
 });