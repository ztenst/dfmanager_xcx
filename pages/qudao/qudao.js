const app = getApp();
const _ = app.Global._
Page({
  data: {
    title:'',
    list1:[],
    voteTitle:'',
    hid:'',
    index: -1,
    type: String,
    isNeedLoadMore: 1,
    page: 1,
    showclear: false,
    tabs: [{
      _default: '区域',
      name: '区域'
    }, ]
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      hid: options.id,
      title: options.title
    })
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.getData();
  },
  confirm: function (e) {
    var value = e.detail.value;
    this.triggerEvent('confirm', value);
  },
  onInput: function (e) {
    this.setData({
      voteTitle: e.detail.value,
    })
    this.getData();
  },
  getData: function () {
    this.Api.xiangmu({
      hid: this.data.hid,
      kw: this.data.voteTitle,
      city: '',
      area: '',
      street: ''
    }).then(obj => {
      this.setData({
        list1: obj.data,
      })
    });
  },
  showFilter: function (e) {
    console.log(1)
    var _index = this.data.index;
    var index = e.currentTarget.dataset.index;
    if (index != _index) {
      this.setData({
        index: index
      });
    } else {
      this.setData({
        index: -1
      });
    }
  },
  onFilterSelect: function (e) {
    this.closeFilter();
    var index = e.currentTarget.dataset.index;
    var filter = this.data.filter;
    var value = e.detail;
    this.Global._.extend(this.data.options, value);
    this.setData({
      filter: filter,
      options: this.data.options
    });
    this.refreshTabs();
    this.reset();
  },
  refreshTabs: function () {
    var filter = this.data.filter;
    var tabs = this.data.tabs;
    //区域
    var f0 = filter[0];
    var value = this.data.options;
    var cityid = value.city;
    var areaid = value.area;
    var streetid = value.street;
    var name = '';

    var city = f0;

    if (cityid) {
      var city = _.findWhere(f0.list, {
        id: cityid
      });
      var name = city.name;
      var areas = city.childAreas;
    }
    if (areaid) {
      var area = _.findWhere(areas, {
        id: areaid
      });
      var name = area.name;
      var streets = area.childAreas;
    }
    if (streetid) {
      var street = _.findWhere(streets, {
        id: streetid
      });
      var name = street.name;
    };
    tabs[0].name = name || tabs[0]._default;

    this.setData({
      tabs: tabs
    })

    //总价
    //首付
    //筛选
    //排序
  },
  reset: function () {
    this.setData({
      list: [],
      page: 1,
      isNeedLoadMore: 1
    });
    var params = this.Global._.extend({}, this.data.options);
    this.setStorage(params);
    this.loadmore();
  },
  loadmore: function () {
    if (this.data.isNeedLoadMore == 1) {
      this.getData(this.data.options);
    }
  },
})