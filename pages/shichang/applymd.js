const app = getApp();
Page({
  data:{
    images : [],
    city_index : 0,
    area_index : 0,
    street_index : 0
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
      city_index : value[0],
      area_index : value[1],
      street_index : value[2]
    });
    this.getAreaStreet();
  },
  onCall : function() {
    this.Global.getConfig().then(obj=>{
      this.Global.makePhone(obj.tel);
    })
  },
  onOk : function() {
    this.Global.link('/pages/my/index');
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
      var cupload2 = this.selectComponent('#cupload2');
      var images = cupload.getImages();
      var images2 = cupload2.getImages();
      if(images.length == 0){
        this.Global.showErrorMsg('请上传营业执照');
      }else{
        var value = e.detail.value;
        value['image'] = images[0]['key'];
        value['area'] = this.data.area;
        value['city'] = this.data.city;
        value['street'] = this.data.street;
        value['adduid'] = this.Global.getUid();
        //坐标转化
        if(this.data.map_lng){
          var cs = this.Global.coordtransform.gcj02tobd09(this.data.map_lng,this.data.map_lat);
          this.data.map_lat = cs[1];
          this.data.map_lng = cs[0];
        }
        value['map_lat'] = this.data.map_lat || '';
        value['map_lng'] = this.data.map_lng || '';
        if(images2.length > 0){
          value['ava'] = images2[0]['key'];
        }

        this.Api.subCompany(e.detail.value).then(obj=>{
          if(obj.status === 'success'){
            this.showDialogByMsg(obj.data);
            //this.Global.showOkMsg(obj.msg).then(obj=>{
              ////this.Global.link('/pages/index/index');
            //});
          }else{
            this.Global.showErrorMsg(obj.msg);
          }
        })
      }
    }
  },
  showDialogByMsg(msg){
    var dialog = this.selectComponent('#j-common-dialog-other');
    dialog.setMsg(msg);
    dialog.show();
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
        cityall : obj[0]
      });
      //将参数合并到filter中
      var multiArray = this.getMulti(0);
      this.setData({
        multiArray  : multiArray
      })
    })
  },
  getMulti : function() {
      var city_index = this.data.city_index;
      var area_index = this.data.area_index;

      //将参数合并到filter中
      var city = this.data.cityall;
      var list = city.list;

      var cityArray = city.list;
      var current = list[city_index];
      var areaArray = current.childAreas;
      var streetArray = areaArray[area_index].childAreas;
      var multiArray = [cityArray,areaArray,streetArray];
      console.log(multiArray);
      return multiArray;
  },
  columnChange: function(e) {
    var detail = e.detail;
    var area = this.data.area;
    var column = detail.column;
    var value = detail.value;
    var multiArray = this.data.multiArray;
    //城市改变
    if(column == 0){
      this.setData({
        city_index : value,
        street_index : 0,
        area_index : 0
      })
      var multiArray = this.getMulti();
      this.setData({
        multiArray : multiArray
      });
    }
    //区域改变
    if(column == 1){
      this.setData({
        area_index : value,
        street_index : 0
      })
      var multiArray = this.getMulti();
      this.setData({
        multiArray  : multiArray
      })
    }
  },
  getAreaStreet:function() {
    var data = this.data.cityall.list;
    var city_index = this.data.city_index;
    var area_index = this.data.area_index;
    var street_index = this.data.street_index;

    var city = data[city_index];
    var city_name = city['name'];
    var area = city['childAreas'][area_index];
    var area_name = area['name'];
    var street = area['childAreas'][street_index];
    var street_name = street['name'];

    var region_text = city_name + '-' + area_name + '-' + street_name;

    this.setData({
      'region_text' : region_text,
      'city' : city.id,
      'area' : area.id,
      'street' : street.id
    })
  },
  initArray : function() {
    
  }
})
