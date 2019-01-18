const app = getApp();
Page({
  data: {
    index: -1,
    isNeedLoadMore: 1,
    page: 1,
    cid: 0,
    dayId: 0,
    dayList: [
      { name: '全部' },
      { name: '今日' },
      { name: '昨日' },
      { name: '本周' },
      { name: '本月' }
    ],
    list: [],
    list1: []
  },
  onLoad: function (options) {
    this.Global = app.Global;
    this.Api = this.Global.Api;
  },
  onShow: function () {
    console.log(app.globalData.user);
    this.getData();
  },
  onClear: function () {
    this.setData({
      kw: ''
    });
    this.getData();
  },
  //带看
  goGenjin: function (e) {
    var item = e.currentTarget.dataset.item;
    this.Global.WxService.navigateTo('/pages/baobei/daikan?id=' + item.id);
  },
  //去详情
  goDetail: function (e) {
    var item = e.currentTarget.dataset.item;
    this.Global.WxService.navigateTo('/pages/baobei/order?id=' + item.id);
  },
  onSearch: function (e) {
    var kw = e.detail;
    this.setData({
      kw: kw
    });
    this.getData();
  },
  changeCid: function (e) {
    var cid = e.currentTarget.dataset.index;
    this.setData({
      cid: cid
    });
    this.changeData();
  },
  changeDay: function (e) {
    var dayId = e.currentTarget.dataset.index;
    this.setData({
      dayId: dayId
    });
    this.getData();
  },
  getData: function () {
    this.Global.getUser().then(obj => {
      this.Api.subList({
        uid: obj.id,
        user_type: 0,
        page: this.data.page,
        kw: this.data.kw || '',
        day: this.data.dayId
      }).then(obj => {
        var list = obj.list;
        this.data.list = this.Global._.union(this.data.list1, list);
        var params = {
          list1: this.data.list,
          page: obj.page + 1,
          list: obj.groups,
        };
        if (obj.page >= obj.page_count) {
          params.isNeedLoadMore = 2;
        }

        this.setData(params);
      })
    })
  },
  changeData: function () {
    this.Global.getUser().then(obj => {
      this.Api.subList({
        uid: obj.id,
        user_type: 0,
        page: this.data.page,
        kw: this.data.kw || '',
        cid: this.data.cid
      }).then(obj => {
        var list = obj.list;
        this.data.list = this.Global._.union(this.data.list1, list);
        var params = {
          list1: this.data.list,
          page: obj.page + 1,
          list: obj.groups,
        };
        if (obj.page >= obj.page_count) {
          params.isNeedLoadMore = 2;
        }

        this.setData(params);
      })
    })
  },
  onReachBottom: function () {
    this.loadmore();
  },
  loadmore: function () {
    if (this.data.isNeedLoadMore == 1) {
      this.getData(this.data.options);
    }
  },
})
