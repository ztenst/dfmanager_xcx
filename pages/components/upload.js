const qiniuUploader = require("../../libs/qiniuUploader");
const app = getApp();
Component({
    properties : {
      limit : {
        type : Number
      },
      images : {
        type : Array,
        value : [],
        observer : function(newValue) {
          this.setData({
            images : newValue
          })
        }
      },
      lock : {
        type : Boolean,
        value : false
      }
    },
    data : {
      locklen : 0
    },
    methods : {
      choose : function() {
        var that = this;
        var limit = this.data.limit - this.data.images.length;
        if(limit <= 0) return;
        wx.chooseImage({
          count: limit,
          success: (res)=> {
            this.uploadFile(res.tempFilePaths);
          }
        });
      },
      uploadFile : function(files) {
          if(files.length == 0) {
            this.triggerEvent('complete');
          };
          var filePath = files.shift();
          qiniuUploader.upload(filePath, (res) => {
            if(this.data.images.length >= this.data.limit) return;
            var images = this.data.images;
            images.push(res);
            this.setData({
              images : images
            });
            this.uploadFile(files);
          }, (error) => {
            console.log('error: ' + error);
          }, {
            region: 'ECN',
            domain: 'http://oofuaem2b.bkt.clouddn.com',
            uptokenURL: app.config.host + '/api/image/qnUpload',
          })
      },
      del : function(e) {
        var index = e.currentTarget.dataset.index;
        var images = this.data.images;
        images.splice(index,1);
        this.setData({
          images : images
        },()=>{
          this.triggerEvent('del');
        })
      },
      previewPhoto : function(e) {
        var url = e.currentTarget.dataset.url;
        var urls = this.Global._.map(this.data.images,function(v,k) {
          return v.imageURL
        });
        wx.previewImage({
          current:url,
          urls : urls
        });
      },
      getImages : function() {
        return this.data.images;
      },
      getAddImages : function() {
        return this.data.images.slice(this.data.locklen);
      },
      updateLockLen :function() {
        var len = this.data.images.length;
        if(this.data.lock){
          this.setData({
            locklen : len
          });
        }
      }
    },
    ready : function() {
      this.Global = app.Global;
      this.updateLockLen();
      //console.log(this.data.images);
    }
})
