// 此文件包含处理路由的方法 sendHotList ，它负责返回热搜列表数据。

// 导入获取热搜列表数据的方法
const getHotSearchList = require('../services/hotSearch');

// 处理路由的方法，负责返回热搜列表数据
async function sendHotList(app) {
  app.get("/hotList", async (req, res) => {
    try {
      const { name } = req.query;
      // 调用获取热搜列表数据的方法
      const hotList = await getHotSearchList(name);
      console.log(`/hotList?name=${name}请求成功！`, Date.now());
      // 将热搜列表数据发送给客户端
      res.send(hotList);
    } catch (error) {
      console.log('ʕ̡̢̡ʘ̅͟͜͡ʘ̲̅ʔ̢̡̢🚀 ~ sendHotList ~ error:', error);
    }
  });
}

// 导出一个函数，该函数接收一个app对象作为参数，并调用sendHotList方法
module.exports = (app) => {
  sendHotList(app);
};