const app = getApp();
Page({
  data:{
    kw : ''
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.setData({
      isLoad : true
    })
    this.getData();
  },
  getData : function() {
    this.Global.getUser().then(obj=>{
      this.Api.getUserList({
        uid : obj.id,
        kw : this.data.kw
      }).then(obj=>{
        this.setData({
          list : obj
        })
      })
    })
  },
  onSearch : function(e) {
    var kw = e.detail;
    this.setData({
      kw : kw
    });
    this.getData();
  },
  call : function(e) {
    var item = e.currentTarget.dataset.item;
    this.Global.makePhone(item.phone);
  },
  select : function(e) {
    if(this.options.from == "1"){
      var item = e.currentTarget.dataset.item;
      this.Global.pubsub.emit("my.manage",item);
      wx.navigateBack();
    }
  }
})
