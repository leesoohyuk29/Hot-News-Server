// 此文件包含页面的配置信息，供 hotSearch.js 使用。

const pagesConfig = {
  'wb': {
    name: '微博',
    pageURL: 'https://s.weibo.com',
    hotSearchURL: '/top/summary?cate=realtimehot',
    hotSearchCookies: '`_s_tentry=passport.weibo.com; Apache=4950475133032.61.1638282900861; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9WWoggCvDOxY-vXVGiYzJfVc; ULV=1638283021540:1:1:1:4950475133032.61.1638282900861:; SINAGLOBAL=4950475133032.61.1638282900861; SUB=_2AkMW-rguf8NxqwJRmfoWy2_lb4V0yQvEieKgpkn1JRMxHRl-yj9jqkEstRB6PXqWwYYhR1PFXzQX0RwK4Xny_dUzd9p3`',
    DOMSpan: '#pl_top_realtimehot table tbody tr'
  },
  'hp': {
    name: '虎扑',
    pageURL: 'https://bbs.hupu.com',
    hotSearchURL: '/all-gambia',
    hotSearchCookies: '`.thumbcache_33f5730e7694fd15728921e201b4826a=pRYbhDUO63v6uILUgfdOhbR9DqZnns87WYormzKGO4TmePrjsuIGd+g+SJj000EZaZvWO2dIqxqoGk/f6w3oXQ%3D%3D; smidV2=202310131507057340991af6eac8b39d7b61f9b1237cd0006a567887dfcbf60; csrfToken=AtjGJyBFYxaexAih5g2Lzb8j; acw_tc=76b20ffb16971808233855038e21f2fc84094ecc5f827f04783e8ed56a821d`',
    DOMSpan: '.bbs-index-web-holder .bbs-index-web-body .bbs-index-web-middle .text-list-model .list-item-wrap .t-info'
  },
  'bd': {
    name: '百度',
    pageURL: 'https://top.baidu.com',
    hotSearchURL: '/board?tab=realtime',
    hotSearchCookies: '',
    DOMSpan: '.container_2VTvm .right-container_2EFJr .container-bg_lQ801 .horizontal_1eKyQ'
  },
  'tt': {
    name: '头条',
    pageURL: 'https://www.toutiao.com',
    hotSearchURL: '/',
    hotSearchCookies: '`local_city_cache=%E5%B9%BF%E5%B7%9E; s_v_web_id=verify_lno9dybw_v4GVHN8S_ZIYV_4DHt_9Zbp_T3gV5Z4wT54n; __ac_signature=_02B4Z6wo00f01H0s5UgAAIDA.S4fCZ585lR9COHAAHprt37WvnqN52mgAgP1g3kqL99u-9ikDh6kQzHub89SrUKv5F7QR3zxdogCosHJ-A-fAr-t0PYgRZtst-2GhZUs1eeN8TSx-08BvEmK36; __ac_nonce=06528eae800cd159983a5`',
    DOMSpan: '.main-content .right-container .show-monitor .ttp-hot-board ol',
    Api: 'https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc&_signature=_02B4Z6wo00901TVtKYQAAIDBtW.Txg9YlzU1SS0AACh2uzL6W7csAfbWbUopUIpjoWUbN79Ys2cTXsLl7mJyeB8G7Uix2wuYCbf8RlHrnUXKXFu0Y1xqqQWAc4WKOMamTVn40sZyM1sgGb5Hbf'
  },
  'blbl': {
    name: '哔哩哔哩',
    pageURL: 'https://tophub.today',
    hotSearchURL: '/n/74KvxwokxM',
    hotSearchCookies: '',
    DOMSpan: '.table tbody tr'
  },
  // 'blbl': {
  //   name: '哔哩哔哩',
  //   pageURL: 'https://www.bilibili.com',
  //   hotSearchURL: '/v/popular/all/',
  //   hotSearchCookies: '`buvid_fp=68442a7819ad3e98bc7f30d67aafae0d; b_nut=1697435174; _uuid=B2497597-2AEC-84E4-7641-B10B4955E1EFB76387infoc; innersign=0; b_lsid=77BF104C6_18B37054DBE; buvid4=C3ABE220-E5A3-05AB-F79A-AE047652BEFF77233-023101613-ZxmliWndHY+ncNPLAiEhjw%3D%3D; buvid3=96DFC0DE-895E-85C1-2129-E6E985BD170F74011infoc`',
  //   DOMSpan: 'body #app .popular-container .popular-video-container .flow-loader ul'
  // },
  'zh': {
    name: '知乎',
    pageURL: 'https://tophub.today',
    hotSearchURL: '/n/mproPpoq6O',
    hotSearchCookies: '',
    DOMSpan: '.table tbody tr'
  },
  'xhs': {
    name: '小红书',
    pageURL: 'https://tophub.today',
    hotSearchURL: '/n/L4MdA5ldxD',
    hotSearchCookies: '',
    DOMSpan: '.table tbody tr'
  }
};

module.exports = pagesConfig;