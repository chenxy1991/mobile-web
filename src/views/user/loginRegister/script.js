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
      color:'',
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

  activated() {

  },
   mounted() {
   this.getWH()
   },
  methods: {
     getWH() {
       alert(window.innerHeight + 'px');
      this.height = window.innerHeight + 'px';
      document.body.style.background = 'rgb(76, 130, 193)';
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
