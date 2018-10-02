import WxRequest from '../libs/wx-request/lib/core/WxRequest';
import Promise from '../libs/es6-promise';
import config from '../config';

class Api{
  constructor(){
      this.request = new WxRequest({
          baseURL : config.host + '/api'
      });
      this.request.interceptors.use({
        // 统一全局拦截
        responseError(responseError) {
          wx.showToast({
            title : responseError.data.msg,
            icon : 'none'
          })
          return Promise.reject(responseError)
        }
      });
  }
  city(){
    var url = '/index/cityList';
    return this.request.getRequest(url,{
      data : {
      }
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  //新房列表
  xfList(data){
    var url = '/plot/list';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  //新房详情
  xfDetail(data){
    var url = '/plot/info';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  //获取openid
  getOpenid(data){
    var url = '/index/getOpenid';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  //发送验证码
  getSmsCode(data){
    var url = '/index/getSmsCode';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data;
    });
  }
  //验证验证码
  checkCode(data){
    var url = '/index/checkCode';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data;
    });
  }
  //获取用户信息
  getUserInfo(data){
    var url = '/index/getUserInfo';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data;
    });
  }
  //筛选
  filter(data){
    var url = '/tag/list';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  //解密
  decode(data){
    var url = '/index/decode';
    return this.request.postRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data;
    });
  }
  //绑定门店吗
  regis(data){
    var url = '/user/regis';
    return this.request.postRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data;
    })
  }
  //动态
  newsList(data){
    var url = '/plot/getNewsList';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //我的报备列表
  subList(data){
    var url = '/user/subList';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //新增报备
  addSub(data){
    var url = '/plot/addSub';
    return this.request.postRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //新增公司
  subCompany(data){
    var url = '/plot/subCompany';
    return this.request.postRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //客户列表
  getUserList(data){
    var url = '/plot/getUserList';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //新增举报
  addReport(data){
    var url = '/plot/addReport';
    return this.request.postRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //个人中心
  userIndex(data){
    var url = '/user/index';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //新增收藏
  addSave(data){
    var url = '/plot/addSave';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //展示客户码
  showCode(data){
    var url = '/user/showCode';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //报备详情
  subInfo(data){
    var url = '/user/subInfo';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //添加跟进
  addSubPro(data){
    var url = '/user/addSubPro';
    return this.request.postRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //获取报备状态
  getSubTag(data){
    var url = '/user/getSubTag';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    });
  }
  //新增分销签约
  addCo(data){
    var url = '/plot/addCo';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    });
  }
  //上传带看资料
  addSubImg(data){
    var url = '/user/addSubImg';
    return this.request.postRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    });
  }
  //更换公司
  leave(data){
    var url = '/user/leave';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //获取用户类型
  getUserType(){
    var url = '/index/getUserType';
    return this.request.getRequest(url).then(obj=>{
      return obj.data.data;
    })
  }
  //添加楼盘信息
  getPlotsById(data){
    var url = '/plot/getPlotsById';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //案场市场接口
  //获取openid
  getOpenidAn(data){
    var url = '/index/getOpenidAn';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data.data;
    });
  }
  //个人中心跟分销一样
  //解析手机号
  decodeAn(data){
    var url = '/index/decodeAn';
    return this.request.postRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data;
    });
  }
  //绑定手机号跟openid
  bindOpenid(data){
    var url = '/user/bindOpenid';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //手机号登录
  checkPwd(data){
    var url = '/user/checkPwd';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    })
  }
  //公司列表
  getCompanyList(data){
    var url = '/user/getCompanyList';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data
    })
  }
  //公司详情
  getCompanyInfo(data){
    var url = '/user/getCompanyInfo';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    });
  }
  //市场项目列表
  plotList(data){
    var url = '/plot/list';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    });
  }
  //添加绑定
  bindMarket(data){
    var url = '/user/bindMarket';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    });
  }
  //案场
  //获取案场销售
  getSaleList(data){
    var url = '/plot/getSaleList';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    });
  }
  //确认到访
  setCome(data){
    var url = '/user/setCome';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data;
    });
  }
  //获得销售金额
  getSubPrice(data){
    var url = '/user/getSubPrice';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    });
  }
  //绑定案场销售
  setAnSale(data){
    var url = '/user/setAnSale';
    return this.request.getRequest(url,{
      data : data
    }).then(obj=>{
      return obj.data.data;
    })
  }
  //站点配置
  config(){
    var url = '/config/index';
    return this.request.getRequest(url).then(obj=>{
      return obj.data.data;
    })
  }
  //案场市场首页
  index(data){
    var url = '/user/anIndex';
    return this.request.getRequest(url,{
      data : data
    }).then(function(obj) {
      return obj.data.data;
    });
  }

}

export default Api;
