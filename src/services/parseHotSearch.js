// 要将获取信息的部分单独抽离成一个文件进行处理

const parseHotSearchInfo = ($, pageInfo) => {
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
  return hotList;
};

module.exports = parseHotSearchInfo;