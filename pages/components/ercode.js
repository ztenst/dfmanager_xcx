import drawQrcode from '../../libs/weapp.qrcode.min.js'
Component({
    properties : {
      text : {
        type : String
      }
    },
    data : {
    },
    methods : {
      draw : function() {
        var w = 150;
        var h = 150;
        var id = 'myQrcode';
        drawQrcode({
          width: w,
          height: h,
          canvasId: id,
          typeNumber: 10,
          text: this.data.text,
          _this : this,
          callback :(e)=> {
            wx.canvasToTempFilePath({
              width: w,
              height: h,
              destWidth: w,
              destHeight: h,
              canvasId: id,
              success: function(res) {
                console.log(res.tempFilePath);
              },
              fail : function() {
                console.log(arguments);
              }
            },this);
          }
        })
      },
      saveImage : function(e) {
        
      }
    },
    ready : function() {
      this.draw();
    }
})
