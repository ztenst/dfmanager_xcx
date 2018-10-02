const app = getApp();
Page({
  data:{
    kw : '',
    page : 1,
    list : [],
    isNeedLoadMore : 0
  },
  onSearch : function(e) {
    this.setData({
      kw : e.detail,
      page : 1,
      list : [],
      isNeedLoadMore : 1
    });
    this.loadmore();
  },
  onReachBottom : function() {
    this.loadmore();
  },
  loadmore : function() {
    if(this.data.isNeedLoadMore == 1){
      this.getData();
    }
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.setData({
      isLoad : true
    })
    this.reset();
  },
  reset : function(kw) {
    kw = kw || '';
    this.setData({
      kw : kw,
      page : 1,
      list : [],
      isNeedLoadMore : 1
    });
    this.loadmore();
  },
  getData : function() {
    this.Global.getUser().then(obj=>{
      var params = {
        page : this.data.page,
        kw : this.data.kw,
        staffuid : obj.id,
        user_type : obj.type,
        is_login : 1
      };
      this.Api.plotList(params).then(obj=>{
        var list = obj.list;
        this.data.list = this.Global._.union(this.data.list,list);
        var params = {
          list : this.data.list,
          page : obj.page+1,
        };
        if(obj.page >= obj.page_count){
          params.isNeedLoadMore = 2;
        }
        this.setData(params);
      })
    })
  },
  onSelect : function(e) {
    var item = e.currentTarget.dataset.item;
    this.Global.WxService.navigateTo('/pages/anchang/baobei?id=' +  item.id);
  }
})
