// 此文件包含获取热搜列表数据的方法 getHotSearchList ，它负责发送HTTP请求并解析HTML内容。

const cheerio = require("cheerio");
const superagent = require("superagent");
const pagesConfig = require('../config/pagesConfig');
const parseHotSearchInfo = require('./parseHotSearch');

function getHotSearchList(pageName) {
  return new Promise((resolve, reject) => {
    const pageInfo = pagesConfig[pageName]; // 页面的配置信息项，包含页面地址、热搜地址、cookie、DOM中热搜数据层级地址
    superagent.get(pageInfo.pageURL + pageInfo.hotSearchURL).set("cookie", pageInfo.hotSearchCookies).end((err, res) => {
      if (err) reject(`request error：${err}`);
      const $ = cheerio.load(res.text); // 使用cheerio解析HTML内容
      const hotList = parseHotSearchInfo($, pageInfo); // 使用parseHotSearchInfo函数解析热搜信息
      hotList.length ? resolve(hotList) : reject("error"); // 如果热搜列表不为空，返回列表；否则，返回错误信息
    });
  })
  .catch(error => {
    console.error(error); // 打印错误信息
    throw error; // 抛出错误，以便上层调用栈也可以捕获和处理错误
  });
}

module.exports = getHotSearchList;