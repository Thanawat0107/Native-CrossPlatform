const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'images')
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running at http://localhost:3000');
});
