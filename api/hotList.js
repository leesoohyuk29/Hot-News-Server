const cheerio = require("cheerio"); // HTML解析库
const superagent = require("superagent"); // 发送HTTP请求的库

// 获取访问页面的URL等信息
const pagesConfig = require('../pagesConfig');

// api/json.js
// req接收所有请求信息，res 是响应信息
// 通过module.exports暴露出去
module.exports = async (req, res) => {
  const { name } = req.query;
  const hotList = await getHotSearchList(name ?? 'wb');
  res.send(hotList)
  console.log("请求成功！", Date.now());
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