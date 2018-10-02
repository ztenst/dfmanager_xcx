var dateTimePicker = require('../../utils/dateTimePicker.js');
Component({
    properties : {
      item : {
        type : Object
      }
    },
    data : {
      dateTimeArray1: null,
      dateTime1: null,
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear() + 1
    },
    methods : {
      changeDateTime1(e) {
        this.setData({ dateTime1: e.detail.value });
        var item = this.data.item;
        var dateTimeArray1 = this.data.dateTimeArray1;
        var dateTime1 = e.detail.value;
        var value = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]];
        var name = item.param;
        this.triggerEvent('change',{
          name : name,
          value : value
        });
      },
      changeDateTimeColumn1(e) {
        var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({ 
          dateTimeArray1: dateArr
        });
      },
      show(e) {
        this.setData({
          showTime : true
        })
      }
    },
    ready : function() {
      var item = this.data.item;
      var value = item.value || false;
      var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear,value);
      this.setData({
        dateTimeArray1: obj1.dateTimeArray,
        dateTime1: obj1.dateTime,
        showTime : false
      });
    }
})
