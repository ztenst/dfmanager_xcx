const app = getApp();
Page({
  data:{
    page : 1,
    list : [],
    kw : '',
    isNeedLoadMore : 1
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.getData();
  },
  getData : function() {
    this.Global.getUser().then(obj=>{
      var params = {
        page : this.data.page,
        save : 1,
        uid : obj.id,
        kw : this.data.kw
      };
      this.Api.xfList(params).then(obj=>{
        var olist = this.data.list;
        olist = this.Global._.union(olist,obj.list);
        var data = {
          list : olist,
          page : obj.page + 1
        };
        if(obj.page >= obj.page_count){
          data.isNeedLoadMore = 2;
        }
        this.setData(data);
      })
    })
  },
  loadmore : function() {
    if(this.data.isNeedLoadMore == 1){
      this.getData();
    }
  },
  reset : function() {
    this.setData({
      page : 1,
      isNeedLoadMore : 1,
      list : []
    })
    this.loadmore();
  },
  onSearch : function(e) {
    var kw = e.detail;
    this.setData({
      kw : kw
    });
    this.reset();
  },
  onReachBottom : function() {
    this.loadmore();
  }
})
