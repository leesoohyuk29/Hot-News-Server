/*
 * nodejs定时爬取微博实时热搜
 */
const express = require('express');
const app = express();

// 设置 CORS 头部
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 设置允许所有域名的请求
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 设置允许的 HTTP 方法
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // 设置允许的请求头
  next();
});

const cheerio = require("cheerio"); // HTML解析库
const superagent = require("superagent"); // 发送HTTP请求的库
// const fs = require("fs"); // 文件操作库
// const nodeSchedule = require("node-schedule");   // 定时任务调度库

// 获取访问页面的URL等信息
const pagesConfig = require('./pagesConfig');

function sendHotList() {
  try {
    return new Promise((resolve, reject) => {
      app.get("/hotList", async (req, res) => {
        const { name } = req.query;
        const hotList = await getHotSearchList(name);
        console.log("请求成功！", Date.now());
        res.send(hotList);
      }
      );
      resolve();
    });
  } catch (error) {
    console.log('ʕ̡̢̡ʘ̅͟͜͡ʘ̲̅ʔ̢̡̢🚀 ~ sendHotList ~ error:', error);
  }
}

/**
 * 获取热搜列表数据方法
 */
function getHotSearchList(pageName) {
  return new Promise((resolve, reject) => {
    // 页面的配置信息项，包含页面地址、热搜地址、cookie、DOM中热搜数据层级地址
    const pageInfo = pagesConfig[pageName];
    superagent.get(pageInfo.pageURL + pageInfo.hotSearchURL).set("cookie", pageInfo.hotSearchCookies).end((err, res) => {
      if (err) reject("request error");
      const $ = cheerio.load(res.text); // 使用cheerio解析HTML内容
      let hotList = [];
      $(pageInfo.DOMSpan).each(function (index) {
        const $td = $(this).children().eq(1);
        const link = pageInfo.pageURL + $td.find("a").attr("href"); // 热搜链接
        const text = $td.find("a").text(); // 热搜文本
        const hotValue = $td.find("span")?.text()
          ? $td.find("span")?.text()
          : $(this).children().eq(2).text(); // 热度值（今日热榜热搜信息中，第二个td中的数据为热搜值）
        const icon = $td.find("img")?.attr("src") // 图标链接
          ? "https:" + $td.find("img").attr("src")
          : "";
        hotList.push({
          index,
          link,
          text,
          hotValue,
          icon,
        });
      });
      hotList.length ? resolve(hotList) : reject("error"); // 如果热搜列表不为空，返回列表；否则，返回错误信息
    });
  })
  .catch(error => {
    console.error(error); // 打印错误信息
    throw error; // 抛出错误，以便上层调用栈也可以捕获和处理错误
  });
}


sendHotList();

// 防止服务报错就服务终止
// 监听 uncaughtException 事件
process.on('uncaughtException', (err) => {
  console.error(`Caught exception: ${err}`);
});

// 监听 unhandledRejection 事件
process.on('unhandledRejection', (reason, p) => {
  console.error(`Unhandled Rejection at: Promise ${p}, reason: ${reason}`);
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

/**
 * 每分钟第30秒定时执行爬取任务
 */
// nodeSchedule.scheduleJob("30 * * * * *", async function () {
//   try {
//     const hotList = await getHotSearchList(); // 获取热搜列表数据
//     await fs.writeFileSync(
//       `${__dirname}/hotSearch.json`,
//       JSON.stringify(hotList),
//       "utf-8"
//     ); // 将热搜列表数据写入JSON文件
//     if (hotList.length) sendHotList(hotList);
//     console.log("写入成功", Date.now()); // 打印写入成功的消息和当前时间戳
//   } catch (error) {
//     console.error(error);
//   }
// });
