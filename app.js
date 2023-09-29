/*
 * @Author: Peanut
 * @Description:  nodejs定时爬取微博实时热搜
 * @Date: 2020-05-01 21:51:33
 * @Last Modified by: Peanut.ZhangHuan
 * @Last Modified time: 2023-01-28 10:23:02
 * 程序员导航站：https://iiter.cn
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
const fs = require("fs"); // 文件操作库
const nodeSchedule = require("node-schedule");   // 定时任务调度库

const weiboURL = "https://s.weibo.com"; // 微博的URL
const hotSearchURL = weiboURL + "/top/summary?cate=realtimehot"; // 实时热搜URL
const hotSearchCookies = `_s_tentry=passport.weibo.com; Apache=4950475133032.61.1638282900861; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9WWoggCvDOxY-vXVGiYzJfVc; ULV=1638283021540:1:1:1:4950475133032.61.1638282900861:; SINAGLOBAL=4950475133032.61.1638282900861; SUB=_2AkMW-rguf8NxqwJRmfoWy2_lb4V0yQvEieKgpkn1JRMxHRl-yj9jqkEstRB6PXqWwYYhR1PFXzQX0RwK4Xny_dUzd9p3`;
/**
 * 获取热搜列表数据方法
 */
function getHotSearchList() {
  return new Promise((resolve, reject) => {
    superagent.get(hotSearchURL).set("cookie", hotSearchCookies).end((err, res) => {
      if (err) reject("request error");
      const $ = cheerio.load(res.text); // 使用cheerio解析HTML内容
      let hotList = [];
      $("#pl_top_realtimehot table tbody tr").each(function (index) {
        if (index !== 0) { // 排除第一行表头
          const $td = $(this).children().eq(1);
          const link = weiboURL + $td.find("a").attr("href"); // 热搜链接
          const text = $td.find("a").text(); // 热搜文本
          const hotValue = $td.find("span").text(); // 热度值
          const icon = $td.find("img").attr("src") // 图标链接
            ? "https:" + $td.find("img").attr("src")
            : "";
          hotList.push({
            index,
            link,
            text,
            hotValue,
            icon,
          });
        }
      });
      hotList.length ? resolve(hotList) : reject("errer"); // 如果热搜列表不为空，返回列表；否则，返回错误信息
    });
  });
}

function sendHotList(hotList) {
  return new Promise((resolve, reject) => {
    if (!hotList.length) return;
    app.get("/hotList", (req, res) => {
      res.send(hotList);
      console.log("/hotList", Date.now());
    }
    );
    resolve();
  });
}

// 启动服务器
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

/*
 * schedule

*    *    *    *    *    *    
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

 */
/**
 * 每分钟第30秒定时执行爬取任务
 */
nodeSchedule.scheduleJob("30 * * * * *", async function () {
  try {
    const hotList = await getHotSearchList(); // 获取热搜列表数据
    await fs.writeFileSync(
      `${__dirname}/hotSearch.json`,
      JSON.stringify(hotList),
      "utf-8"
    ); // 将热搜列表数据写入JSON文件
    if (hotList.length) sendHotList(hotList);
    console.log("写入成功", Date.now()); // 打印写入成功的消息和当前时间戳
  } catch (error) {
    console.error(error);
  }
});
