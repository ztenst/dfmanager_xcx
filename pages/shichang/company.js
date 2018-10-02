//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    kw : '',
    list : [],
    isNeedLoadMore : 0
  },
  onSearch : function(e) {
    this.setData({
      kw : e.detail
    });
    this.getData();
  },
  onLoad: function () {
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.getData();
  },
  getData : function() {
    this.Global.getUser().then(obj=>{
      var params = {
        kw : this.data.kw,
        uid : obj.id
      };
      this.Api.getCompanyList(params).then(obj=>{
        this.setData({
          list : obj
        });
      })
    })
  },
  addCompany : function() {
    this.Global.WxService.navigateTo('/pages/shichang/applymd');
  },
  goDetailCompany : function(e) {
    var item = e.currentTarget.dataset.item;
    this.Global.WxService.navigateTo('/pages/shichang/applymd?id=' + item.id);
  }
})
