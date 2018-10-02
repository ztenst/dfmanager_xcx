const app = getApp();
Page({
  data:{
    key : '',
    form : {
    
    },
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    var WxValidate = this.Global.WxValidate;
    this.initRange();
    this.initPrice();
    this.Global.getUser().then(obj=>{
      this.setData({
        user : obj
      });
    });
    const rules = {
        'note': {
            required: true,
        }
    }
    const messages = {
        'note': {
            required: '请输入跟进内容',
        }
    }
    this.WxValidate = new WxValidate(rules,messages);
  },
  add : function(e) {
          console.log(e);
    if (!this.WxValidate.checkForm(e)) {
        const error = this.WxValidate.errorList[0];
        this.Global.showErrorMsg(error.msg);
    }else{
    this.Global.getUser().then(obj=>{
      var data = {
        sid : this.options.id,
        staff : obj.id,
        user_type : obj.type,
        note : e.detail['value']['note'],
        'status' : this.data.key,
      };
      console.log(new_data);
      var new_data = this.Global._.extend({},data,this.data.form);
      this.Api.addSubPro(new_data).then(obj=>{
        console.log(obj);
        if(obj.status == 'success'){
          //this.Global.pubsub.emit('genjin');
          this.Global.showOkMsg(obj.msg).then(obj=>{
            wx.navigateBack();
          });
        }else{
          this.Global.showErrorMsg(obj.msg);
        }
      });
    })
    }
  },
  initRange : function() {
    //this.Api.getSubTag().then(obj=>{
      //var range = this.Global._.map(obj,function(v,k) {
        //return {
          //id : k,
          //value : v
        //};
      //})
      //this.setData({
        //range : range
      //});
    //})
    this.Api.getSubTag({
      sid : this.options.id
    }).then(obj=>{
      this.setData({
        textArr : obj.textArr
      });
      var range = this.Global._.map(obj.tagArr,function(v,k) {
        return {
          id : k,
          value : v
        };
      })
      this.setData({
        range : range
      });
    })
  },
  initPrice : function() {
    this.Api.getSubPrice({
      sid : this.options.id
    }).then(obj=>{
      this.setData({
        price : obj
      });
    })
  },
  setForm : function(detail) {
    var form = this.data.form;
    var name = detail.name;
    var value = detail.value;
    form[name] = value;
    this.setData({
      form : form
    });
  },
  onChangeOne : function(e) {
    var detail = e.detail;
    this.setForm(detail);
  },
  onChangeTwo : function(e) {
    var detail = e.detail;
    this.setForm(detail);
  },
  onChangeThree : function(e) {
    var detail = e.detail;
    this.setForm(detail);
  },
  change : function(e) {
    var index = e.detail.value;
    var textArr = this.data.textArr;
    var currentList = textArr[index] || [];
    this.setData({
      selectname : this.data.range[index]['value'],
      key : this.data.range[index]['id'],
      currentList : currentList,
      form : {}
    });
  }
})
