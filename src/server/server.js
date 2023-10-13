// 用于创建和启动Express服务器，处理CORS设置和监听端口等操作。

// 导入所需模块
const express = require('express');
const app = express();

// 设置CORS（跨域资源共享）相关头部信息
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 导入并使用路由文件
const sendHotList = require('../routes/routes');
sendHotList(app);

// 监听指定端口
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// 导出app对象
module.exports = app;