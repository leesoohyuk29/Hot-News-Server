
const pagesConfig = {
  'wb': {
    name: '微博',
    pageURL: 'https://s.weibo.com',
    hotSearchURL: '/top/summary?cate=realtimehot',
    hotSearchCookies: '`_s_tentry=passport.weibo.com; Apache=4950475133032.61.1638282900861; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9WWoggCvDOxY-vXVGiYzJfVc; ULV=1638283021540:1:1:1:4950475133032.61.1638282900861:; SINAGLOBAL=4950475133032.61.1638282900861; SUB=_2AkMW-rguf8NxqwJRmfoWy2_lb4V0yQvEieKgpkn1JRMxHRl-yj9jqkEstRB6PXqWwYYhR1PFXzQX0RwK4Xny_dUzd9p3`',
    DOMSpan: '#pl_top_realtimehot table tbody tr'
  },
  'tt': {
    name: '头条',
    pageURL: 'https://tophub.today',
    hotSearchURL: '/n/x9ozB4KoXb',
    hotSearchCookies: '',
    DOMSpan: '.table tbody tr'
  },
  'hp': {
    name: '虎扑',
    pageURL: 'https://tophub.today',
    hotSearchURL: '/n/G47o8weMmN',
    hotSearchCookies: '',
    DOMSpan: '.table tbody tr'
  },
  'zh': {
    name: '知乎',
    pageURL: 'https://tophub.today',
    hotSearchURL: '/n/mproPpoq6O',
    hotSearchCookies: '',
    DOMSpan: '.table tbody tr'
  },
  'bd': {
    name: '百度',
    pageURL: 'https://tophub.today',
    hotSearchURL: '/n/Jb0vmloB1G',
    hotSearchCookies: '',
    DOMSpan: '.table tbody tr'
  },
  'blbl': {
    name: '哔哩哔哩',
    pageURL: 'https://tophub.today',
    hotSearchURL: '/n/74KvxwokxM',
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