const express = require('express');
const path = require('path');
// 引入路由
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
// 定义服务端口
const hostname = 'localhost';
const port = 3000;

const app = express();
// 定义模板位置
app.set('views', 'views');
app.set('view engine', 'hbs');

// 静态文件中间件
app.use(express.static('public'));

// 登录中间件
function loggingMiddleware(req, res, next) {
  const time = new Date();
  console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
  next();
}
// 全局使用
app.use(loggingMiddleware);
// 引入路由
app.use('/', indexRouter);
app.use('/api', apiRouter);

// 出错处理
app.use('*', (req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500');
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});