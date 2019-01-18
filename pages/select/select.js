const app = getApp();
Page({
  data:{
    kw : '',
    page : 1,
    list : [],
    isNeedLoadMore : 1,
    selectedNum : 0,
    maxNum : 5
  },
  onSearch : function(e) {
    this.setData({
      kw : e.detail,
      page : 1,
      list : [],
      selectedNum : 0,
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
    console.log(app);
    this.setData({
      isLoad : true
    })
    this.loadmore();
  },
  getData : function() {
    var params = {
      page : this.data.page,
      kw : this.data.kw,
      is_login : this.Global.is_true
    };
    this.Api.xfList(params).then(obj=>{
      var list = obj.list;
      this.data.list = this.Global._.union(this.data.list,list);
      var params = {
        list : this.data.list,
        page : obj.page+1
      };
      if(obj.page >= obj.page_count){
        params.isNeedLoadMore = 2;
        console.log(111);
      }
      this.setData(params);
    })
  },
  onSelect : function(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.list;
    var num = this.getNum();
    var state = list[index]['selected'];
    if(num + !state <= this.data.maxNum){
      list[index]['selected'] = !state;
      this.setData({
        list : list
      });
      this.calNum();
    }
    //this.Global.pubsub.emit('xinfang.select',item);
    //wx.navigateBack();
  },
  onConfirm : function() {
    var item = this.Global._.where(this.data.list,{
      selected : true
    });
    console.log(item)
    this.Global.pubsub.emit('select.select',item);
    wx.navigateBack();
  },
  calNum : function() {
    var num = this.getNum();
    this.setData({
      selectedNum : num
    });
  },
  getNum : function() {
    var arr = this.Global._.where(this.data.list,{
      selected : true
    });
    return arr.length;
  }
})
