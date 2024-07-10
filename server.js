// See https://github.com/typicode/json-server#module
const cors = require('cors');
const jsonServer = require('json-server')
const server = jsonServer.create()
const auth = require("json-server-auth");
const db = require("./db.json");
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

// const port = process.env.PORT || 3000;

const rules = auth.rewriter({
  // 將所有以 /api/ 開頭的路徑重寫為去掉 /api/ 的路徑
  '/api/*': '/$1',

  // 權限規則
  users: 600,
  // 其他規則
  // '/posts/:category': '/posts?category=:category',
})

server.use(cors())
server.use(middlewares)
// server.use(jsonServer.bodyParser)

server.db = router.db;

// 當接收到 /login 相關方法時執行
server.use('/api/login', (req, res, next) => {
  console.log('/api/login!');
  
  // 模擬一個錯誤
  // const isError = true;
  // if (isError) {
  //   return res.status(400).json({
  //     error: '自訂的錯誤訊息：登入失敗，請檢查您的帳號和密碼。',
  //   });
  // }
  
  next();
})

server.use(rules);
server.use(auth);
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running on:', 3000)
})

// Export the Server API
module.exports = server