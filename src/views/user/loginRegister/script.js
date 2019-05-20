import {
  Tab,
  TabItem,
  XInput,
  Selector,
  Group,
  Divider
} from 'vux';
import Login from '../../../components/Login.vue';
import Register from '../../../components/Register.vue';

export default {
  data() {
    return {
      index: 0,
      height: '',
      color: '',
    };
  },

  components: {
    Tab,
    TabItem,
    XInput,
    Selector,
    Group,
    Login,
    Register,
    Divider
  },
  created: function () {
    console.log(1)
  },
  mounted: function () { //只执行一次
    console.log(2)
    this.getWH()
  },
 destroyed() {
   console.log(4)
   document.body.style.background = '';
 },
  methods: {
    getWH() {
      this.height = window.innerHeight + 'px';
      document.body.style.background = '#1B82D1';
    },
    handleTabItemClick(index) {
      if (index == 1) {
        this.$vux.toast.text('程序猿努力开发中！');
      } else {
        this.index = index;
      }

    },

  }
};
