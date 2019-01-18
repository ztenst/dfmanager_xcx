const app = getApp();
Component({
  properties: {
    fixed: {
      type: Boolean,
      value: false
    }
  },
  data: {
  },
  methods: {
  },
  ready: function () {
    this.Global = app.Global;
    this.Global.getBottom().then(obj => {
      this.setData(obj);
    })
  }
})
