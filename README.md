一个实时爬取微博热搜的 nodejs 程序，记得点个 `star` 哦

---

### 安装依赖

```bash
npm install
```

### 运行

```bash
npm start
```

### 文件说明

1.  src/server/server.js : 
   - 文件作用：创建和启动Express服务器，处理CORS设置和监听端口等操作。 
   - 目录作用：存放与服务器相关的文件。 
 
2.  src/services/hotSearch.js : 
   - 文件作用：包含获取热搜列表数据的方法 getHotSearchList ，负责发送HTTP请求并解析HTML内容。 
   - 目录作用：存放与业务逻辑相关的文件。 
 
3.  src/routes/routes.js : 
   - 文件作用：包含处理路由的方法 sendHotList ，负责返回热搜列表数据。 
   - 目录作用：存放路由相关的文件。 
 
4.  src/config/pagesConfig.js : 
   - 文件作用：包含页面的配置信息，供 hotSearch.js 使用。 
   - 目录作用：存放配置文件。

### 主要依赖库

- [superagent](https://github.com/visionmedia/superagent)
- [cheerio](https://github.com/cheeriojs/cheerio)
- [node-schedule](https://github.com/node-schedule/node-schedule)
