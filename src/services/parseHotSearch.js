// 要将获取信息的部分单独抽离成一个文件进行处理

const parseHotSearchInfo = ($, pageInfo, text) => {
  const { DOMSpan, pageURL, name } = pageInfo ?? {};
  let hotList = [];
  // 今日头条不需要通过DOM爬取数据，是直接通过接口调用获取的数据
  if (['头条'].includes(name)) return getInfoThroughApi(name, text);
  $(DOMSpan).each(function (index) {
    if (index > 30) return; // 限制录入数据数量最多为30条
    if (name === '百度') {
      const $item = $(this);
      const link = $item.find("a").attr("href");
      const text = $item.children().eq(3).children().find("div").text().trim();
      const hotValue = $item.children().eq(1).children().eq(1).text().trim();
      hotList.push({
        index,
        link,
        text,
        hotValue
      });
    } else if (name === '虎扑') {
      const $item = $(this);
      const link = pageURL + $item.find("a").attr("href");
      const text = $item.find("a").find("span").text();
      const hotValue = $item.children().eq(1).text();
      const reply = $item.children().eq(2).text().trim();
      hotList.push({
        index,
        link,
        text,
        hotValue,
        reply
      });
    } else {
      const $td = $(this).children().eq(1);
      const link = pageURL + $td.find("a").attr("href"); // 热搜链接
      const text = $td.find("a").text(); // 热搜文本
      const hotValue = $td.find("span")?.text()
        ? $td.find("span")?.text().trim()
        : $(this).children().eq(2).text().trim(); // 热度值（今日热榜热搜信息中，第二个td中的数据为热搜值）
      const icon = $td.find("img")?.attr("src"); // 图标链接
      hotList.push({
        index,
        link,
        text,
        hotValue,
        icon,
      });
    }
  });
  return hotList;
};

const getInfoThroughApi = (name, original) => {
  const hotList = [];
  const originalTemp = JSON.parse(original || {}) || []; // 原数据
  if (name === '头条') {
    const newsInfo = originalTemp?.data ?? [];
    newsInfo.forEach((item, index) => {
      hotList.push({
        index,
        link: item.Url,
        text: item.Title,
        hotValue: item.HotValue
      });
    });
    return hotList;
  }
}

module.exports = parseHotSearchInfo;