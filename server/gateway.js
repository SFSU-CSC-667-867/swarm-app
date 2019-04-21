const express = require('express');
const server = require('http');
const httpProxy = require('http-proxy');

const app = express();
const appServer = server.createServer(app);
const apiProxy = httpProxy.createProxyServer(app);

const wsProxy = httpProxy.createProxyServer({
  target: process.env.WEBSOCKET_HOST || 'http://localhost:6000',
  ws: true,
});

apiProxy.on('error', (err, req, res) => {
  console.log(err);
  res.status(500).send('Proxy down :(');
});

wsProxy.on('error', (err, req, socket) => {
  console.log(err);
  console.log('ws failed');
  socket.end();
});

const messangerHost = process.env.MESSANGER_HOST || 'http://localhost:5000';
console.log(`Messanger end proxies to: ${messangerHost}`);
app.all('/messanger*', (req, res) => {
  apiProxy.web(req, res, { target: messangerHost });
});

const websocketHost = process.env.WEBSOCKET_HOST || 'http://localhost:6000/websocket';
console.log(`WebSocket end proxies to: ${websocketHost}`);
app.all('/websocket*', (req, res) => {
  console.log('incoming ws');
  apiProxy.web(req, res, { target: websocketHost });
});

appServer.on('upgrade', (req, socket, head) => {
  console.log('upgrade ws here');
  wsProxy.ws(req, socket, head);
});

const fronEndHost = process.env.FRONT_END_HOST || 'http://localhost:3000';
console.log(`Front end proxies to: ${fronEndHost}`);
app.all('/*', (req, res) => {
  // for frontend
  apiProxy.web(req, res, { target: fronEndHost });
});

appServer.listen(4000);
console.log('Gateway started');