const app = getApp();
Page({
  data:{
    tab : 0,
    type : 1,
    pros: null,
    imgs: null,
    imgpros: null,
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.Global.getUser().then(obj => {
      this.setData({
        isLoad: true,
        type: obj.type
      });
    })
    this.init();
    this.Global.pubsub.on('genjin', () => {
      this.init();
    })
  },
  onShow: function(){
    this.setData({
      pros: '',
      // imgs: '',
      // imgpros: '',
    });
    var id = this.options.id;
    this.Api.subpros({sid: id}).then(obj=>{
      this.Global._.each(obj.pros, (v, k) => {
        console.log(v);
        this.Global.wxParse.wxParse('_note[' + k + ']', 'html', v.note, this, 15);
      });
      console.log(obj)
      this.setData(obj);
      
    })
  },
  upload : function() {
    var cp = this.getUploadCompoent();
    var images = cp.getImages();
    var addimages = cp.getAddImages();
    var imgs = this.Global._.map(addimages,function(v,k) {
      return v.key;
    })
    this.Global.getUser().then(obj=>{
      //console.log(imgs);
      this.Api.addSubImg({
        sid : this.options.id,
        imgs : imgs.join(','),
        uid : this.Global.getUid(),
        type : obj.type
      }).then(obj=>{
        if(obj.status === 'success'){
          //这里需要更新数据
          this.Global.showOkMsg(obj.msg);
          this.init().then(obj=>{
            this.setData({
              tab : 0
            })
          });
          //cp.updateLockLen();
        }else{
          this.Global.showErrorMsg(obj.msg);
        }
      });
    })
  },
  getUploadCompoent : function() {
    var cp = this.selectComponent('#cupload');
    return cp;
  },
  changeTab : function(e) {
    console.log(e);
    var tab = e.currentTarget.dataset.index;
    console.log(tab);
    this.setData({
      tab : tab
    });
  },
  init : function() {
    return this.Global.getUser().then(obj=>{
      var id = this.options.id;
      return this.Api.subInfo({
        id : id,
        type : obj.type
      }).then(obj=>{
        var data = obj.data;
        data.firstArr = this.Global._.isEmpty(data.firstArr) ? false : data.firstArr;
        data.secondArr = this.Global._.isEmpty(data.secondArr) ? false : data.secondArr;
        this.Global._.each(data.pros,(v,k)=> {
          console.log(v);
          this.Global.wxParse.wxParse('_note[' + k + ']','html',v.note,this,15);
        });
        console.log(data)
        this.setData(data);
      })
    })
  },
  call : function(e) {
    var phone = e.currentTarget.dataset.phone;
    this.Global.makePhone(phone);
  },
  previewPhoto : function(e) {
    var item = e.currentTarget.dataset.item;
    var image = item;
    wx.previewImage({
      urls : this.data.imgs,
      current : image
    });
  },
  gofp : function(e) {
    if(this.data.thirdArr.name){
      this.Global.showErrorMsg('已绑定案场销售，请联系客服修改');
    }else{
      var id = e.currentTarget.dataset.id;
      this.Global.WxService.navigateTo('/pages/anchang/fenpei?id=' + id);
    }
  }
})
