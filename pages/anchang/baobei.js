const app = getApp();
Page({
  data:{
    cid : 0,
    dayId : 0,
    dayList: [
      { name: '全部' },
      { name: '今日' },
      { name: '昨日' },
      { name: '本周' },
      { name: '本月' }
    ]
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    //this.getData();
  },
  getData : function() {
    this.Global.getUser().then(obj=>{
      var params = {
        uid : obj.id,
        user_type : obj.type,
        kw : this.data.kw || '',
        day : this.data.dayId
      };
      if(this.options.id){
        params['hid'] = this.options.id
      }
      this.Api.subList(params).then(obj=>{
        console.log(obj);
        this.setData({
          list : obj
        })
      })
    })
  },
  //带看
  goGenjin: function(e) {
    var item = e.currentTarget.dataset.item;
    this.Global.WxService.navigateTo('/pages/baobei/daikan?id=' + item.id);
  },
  //去详情
  goDetail : function(e) {
    var item = e.currentTarget.dataset.item;
    this.Global.WxService.navigateTo('/pages/anchang/order?id=' + item.id);
  },
  search : function(e) {
    var kw = e.detail.value;
    this.setData({
      kw : kw
    });
    this.getData();
  },
  changeCid : function(e) {
    var cid = e.currentTarget.dataset.index;
    this.setData({
      cid : cid
    });
  },
  changeDay : function(e) {
    var dayId = e.currentTarget.dataset.index;
    this.setData({
      dayId: dayId
    });
    this.getData();
  },
  onShow : function() {
    this.getData();
  },
  sao : function() {
    var c = this.selectComponent('#c-sao');
    c.sao();
  },
  //确认到访
  daoFang: function(id) {
    return this.Api.setCome({
      sid : id,
      uid : this.Global.getUid()
    })
  }
})
