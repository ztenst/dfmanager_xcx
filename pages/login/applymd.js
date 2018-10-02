const app = getApp();
Page({
  data:{
    images : [],
    area : [0,0]
  },
  chooseLocation : function() {
    this.WxService.chooseLocation().then(obj=>{
      var params = {};
      if(obj.address){
        params['address'] = obj.address;
      }
      params['map_lat'] = obj.latitude;
      params['map_lng'] = obj.longitude;
      this.setData(params);
    },obj=>{
      //this.Global.showErrorMsg('请打开允许访问地理位置权限');
    });
  },
  onSelectRegion : function(e) {
    var value = e.detail.value;
    this.setData({
      area : value
    });
    this.getAreaStreet();
  },
  init : function() {
    // 验证字段的规则
    const rules = {
        'name': {
            required: true,
        },
        'address': {
            required: true
        },
        'manager' : {
          required: true
        },
        'phone' : {
          required: true,
          tel : true
        }
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
        'name': {
            required: '请输入公司名称',
        },
        'address': {
            required: '请输入地址',
        },
        'manager' : {
          required: '请输入负责人姓名'
        },
        'phone' : {
          required: '请输入手机号码',
          tel : '手机号码格式错误'
        }
    }
    this.WxValidate = new (this.Global.WxValidate)(rules,messages);
  },
  submitForm : function(e) {
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(e)) {
        const error = this.WxValidate.errorList[0];
        this.WxService.showToast({
            title : error.msg,
            icon : 'none'
        });
        return false
    }else{
      var cupload = this.selectComponent('#cupload');
      var images = cupload.getImages();
      if(images.length == 0){
        this.Global.showErrorMsg('请上传营业执照');
      }else{
        var value = e.detail.value;
        value['image'] = images[0]['key'];
        value['area'] = this.data.area;
        value['street'] = this.data.street;
        value['map_lat'] = this.data.map_lat || '';
        value['map_lng'] = this.data.map_lng || '';

        this.Api.subCompany(e.detail.value).then(obj=>{
          if(obj.status === 'success'){
            this.Global.showOkMsg(obj.msg).then(obj=>{
              this.Global.link('/pages/index/index');
            });
          }else{
            this.Global.showErrorMsg(obj.msg);
          }
        })
      }
    }
  },
  onReady : function() {
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.WxService = this.Global.WxService;
    this.Api = this.Global.Api;
    this.init();
    this._ = this.Global._;
    this.setData({
      isLoad : true
    })
    this.Api.filter({
      cate : 'plotFilter'
    }).then(obj=>{
      this.setData({
        city : obj[0]
      });
      //将参数合并到filter中
      var multiArray = this.getMulti(0);
      this.setData({
        multiArray  : multiArray
      })
    })
  },
  getMulti : function(areaid) {
      //将参数合并到filter中
      var city = this.data.city;
      var list = city.list;
      var obj = wx.getStorageSync('city');
      var cityid = obj && obj.cityid || 322;
      var current = this.Global._.findWhere(list,{
        id : '' + cityid
      });

      var area = current.childAreas;
      console.log(area);
      var areaArray = this._.map(area,(v,k)=>{
        return {
          name : v.name,
          id : v.id
        };
      });
      var streetArray = this._.map(area[areaid].childAreas,(v,k)=> {
        return {
          name : v.name,
          id : v.id
        };
      });
      var multiArray = [areaArray,streetArray];
      return multiArray;
  },
  columnChange: function(e) {
    var detail = e.detail;
    var area = this.data.area;
    var column = detail.column;
    var value = detail.value;
    var multiArray = this.data.multiArray;
    if(column == 0){
      var multiArray = this.getMulti(value);
      var area = [value,0];
      this.setData({
        area : area,
        multiArray  : multiArray
      })
    }
  },
  getAreaStreet:function() {
    var value = this.data.area;
    var multiArray = this.data.multiArray;
    var area = value[0];
    var street = value[1];
    var oarea = multiArray[0][area];
    var ostreet = multiArray[1][street];
    var region_text = oarea.name + '-' + ostreet.name;
    this.setData({
      'region_text' : region_text,
      'area' : oarea.id,
      'street' : ostreet.id
    })
  },
  initArray : function() {
    
  }
})
