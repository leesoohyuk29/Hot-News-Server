// 要将获取信息的部分单独抽离成一个文件进行处理

const parseHotSearchInfo = ($, pageInfo) => {
  const { DOMSpan, pageURL, name } = pageInfo ?? {};
  let hotList = [];
  $(DOMSpan).each(function (index) {
    if (name === '百度') {
      const $item = $(this);
      const link = $item.find("a").attr("href");
      const text = $item.children().eq(3).children().find("div").text().trim();
      const hotValue = $item.children().eq(1).children().eq(1).text();
      hotList.push({
        index,
        link,
        text,
        hotValue
      });
    } else if (name === '虎扑') {
      const $item = $(this);
      const link = $item.find("a").attr("href");
      const text = $item.find("a").find("span").text();
      const hotValue = $item.children().eq(1).text();
      const reply = $item.children().eq(2).text();
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
    }
  });
  return hotList;
};

module.exports = parseHotSearchInfo;