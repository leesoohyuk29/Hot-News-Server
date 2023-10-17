// 此文件包含获取热搜列表数据的方法 getHotSearchList ，它负责发送HTTP请求并解析HTML内容。

const cheerio = require("cheerio");
const superagent = require("superagent");
const pagesConfig = require('../config/pagesConfig');
const parseHotSearchInfo = require('./parseHotSearch');

// const fs = require("fs"); // 文件操作库
// const nodeSchedule = require("node-schedule");   // 定时任务调度库

function getHotSearchList(pageName) {
  return new Promise((resolve, reject) => {
    const pageInfo = pagesConfig[pageName]; // 页面的配置信息项，包含页面地址、热搜地址、cookie、DOM中热搜数据层级地址
    const { pageURL, hotSearchURL, hotSearchCookies } = pageInfo ?? {};
    superagent.get(pageURL + hotSearchURL).set("cookie", hotSearchCookies).end((err, res) => {
      const $ = cheerio.load(res.text); // 使用cheerio解析HTML内容
      const hotList = parseHotSearchInfo($, pageInfo); // 使用parseHotSearchInfo函数解析热搜信息
      hotList.length ? resolve(hotList) : reject(`request error：${err}`); // 如果热搜列表不为空，返回列表；否则，返回错误信息
    });
  })
  .catch(error => {
    console.error(error); // 打印错误信息
    throw error; // 抛出错误，以便上层调用栈也可以捕获和处理错误
  });
}

// /**
//  * 每分钟第30秒定时执行爬取任务
//  */
// nodeSchedule.scheduleJob("10 * * * * *", async function () {
//   try {
//     const hotList = await getHotSearchList('wb'); // 获取热搜列表数据
//     console.log('ʕ̡̢̡ʘ̅͟͜͡ʘ̲̅ʔ̢̡̢🚀 ~ hotList.length:', hotList.length);
//     await fs.writeFileSync(
//       `${__dirname}/hotSearch.json`,
//       JSON.stringify(hotList),
//       "utf-8"
//     ); // 将热搜列表数据写入JSON文件
//     console.log("写入成功", Date.now()); // 打印写入成功的消息和当前时间戳
//   } catch (error) {
//     console.error(error);
//   }
// });

module.exports = getHotSearchList;