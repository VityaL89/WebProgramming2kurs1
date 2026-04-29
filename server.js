const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/favorites', (req, res) => {
    const db = router.db;
    db.set('favorites', req.body).write();
    res.json(req.body);
});

server.post('/cart', (req, res) => {
    const db = router.db;
    db.set('cart', req.body).write();
    res.json(req.body);
});

server.use(router);

server.listen(3000, () => {
    console.log('✅ Сервер запущен на http://localhost:3000');
});