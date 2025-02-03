const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../api/db.json')); // ชี้ไปที่ db.json
const cors = require('cors'); // ใช้ middlewares
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, '../assets/images'), // ชี้ไปที่โฟลเดอร์รูปภาพ
});


server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running at http://localhost:3001/herbs');
});