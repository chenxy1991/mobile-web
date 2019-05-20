import {
  mapActions
} from 'vuex';
import {
  Sticky,
  Tab,
  TabItem,
  Search,
  Swiper,
  SwiperItem,
  Group,
  PopupPicker,
  Rater,
  LoadMore,
  XDialog,
  CheckIcon,
  XButton,
  Flexbox,
  FlexboxItem,
  Badge,
  Grid,
  GridItem,
  Divider,
  Checker,
  CheckerItem,
  Popup,
  TransferDom,
} from 'vux';
const list = () => [{
  id: 1,
  height: '70',
  type: '流程时间-(仅单选)',
  list: [{
    id: 'M',
    name: '最近一月',
  }, {
    id: 'W',
    name: '最近一周',
  }, {
    id: 'D',
    name: '最近一天',
  }, {
    id: 'T',
    name: '自定义',
  }, {
    id: 'O',
    name: '其他',
  }]
}, {
  id: 2,
  height: '70',
  type: '流程类型-(可多选)',
  list: [{
    id: '1',
    name: '事件管理流程',
  }, {
    id: '2',
    name: '总部需求流程',
  }, {
    id: '3',
    name: '申告管理流程',
  }, {
    id: '4',
    name: '任务派发流程',
  }, {
    id: 'resourcesApply',
    name: 'MSS两级需求管理流程',
  }, {
    id: '1',
    name: '资源管理流程',
  }, {
    id: 'requirement',
    name: '需求管理流程',
  }, {
    id: 'versionManageProcess',
    name: '版本管理流程',
  }, {
    id: 'eventManage',
    name: '事件管理流程',
  }, {
    id: 'supervision',
    name: '督办管理流程',
  }, {
    id: 'issues',
    name: '问题管理流程',
  }, {
    id: '1',
    name: '问题管理流程',
  }, {
    id: 'onlineAcceptance',
    name: 'IT项目/系统上线验收流程',
  }, {
    id: '1',
    name: '问题管理流程',
  }, {
    id: '1',
    name: '问题管理流程',
  }, {
    id: '12',
    name: '问题管理流程',
  }, {
    id: '123',
    name: '问题管理流程',
  }, {
    id: '1234',
    name: '版本管理流程',
  }, {
    id: '12345',
    name: '问题管理流程',
  }]
}]
import YScroll from '../../../components/scroll/YScroll';
import {
  compile,
  formatUrlParams
} from '../../../util/data';
import {
  AvatarBasePath,
  SmallImageBasePath
} from '../../../constants/index';

const baseList = [{
  url: 'javascript: void(0);',
  img: '../../../../static/images/itsm_logo.png',
  bigImg: 'https://static.huanjiaohu.com/image/ad/china/1_big.jpg',
}, {
  url: 'javascript: void(0);',
  img: '../../../../static/images/itsm_logo.png',
  bigImg: 'https://static.huanjiaohu.com/image/ad/china/2_big.jpg',
}, {
  url: 'javascript: void(0);',
  img: '../../../../static/images/banner/banner3.jpg',
  bigImg: 'https://static.huanjiaohu.com/image/ad/china/3_big.jpg',
}, {
  url: 'javascript: void(0);',
  img: '../../../../static/images/banner/banner2.jpg',
  bigImg: 'https://static.huanjiaohu.com/image/ad/china/4_big.jpg',
}];

const urlList = baseList.map((item) => ({
  url: item.url,
  img: item.img,
  bigImg: item.bigImg
}));

export default {
  name: "home",
  directives: {
    TransferDom,
  },
  data() {
    return {
      timeOrder: { //待办排序类型，asc升序，desc降序
        type: 'default',
        img: require('@/assets/home/icon-order.png')
      },
      screenType: { //筛选状态
        active: false,
        img: require('@/assets/home/icon-screen.png')
      },
      search: { //搜索
        acitve: false,
        img: require('@/assets/home/icon-search.png')
      },
      selected: 0,
      showTimeInput: false,
      showScreenList: false,
      screenChecked: [], //筛选项选中的内容
      screenTypeList: list(),
      currentUserId: parseInt(window.localStorage.getItem('LoginUserId')),
      list: urlList,
      billFirstWordColor: ['#ee735c', '#d4e5e0', '#f5a623', '#64c708', '#84daef'],
      groups: undefined,
      bills: undefined,
      encyList: undefined,
      isSearching: false,
      searchText: '',
      pageY: 0,
      disY: 0,
      navTop: 0,
      startNavTop: 0,
      htmlFontSize: 14,
      tabIconList: [],
    };
  },

  components: {
    Sticky,
    Search,
    Swiper,
    SwiperItem,
    Group,
    PopupPicker,
    Rater,
    LoadMore,
    XDialog,
    CheckIcon,
    XButton,
    Flexbox,
    FlexboxItem,
    Badge,
    Grid,
    GridItem,
    Tab,
    TabItem,
    YScroll,
    Divider,
    Checker,
    CheckerItem,
    Popup,
  },
  mounted() {


  },

  async created() {
    //获取待办列表
    var resTabIcon = await this.getTabIconList();
    //            成功返回数据
    if (resTabIcon.returnList.length > 0) {
      console.log(resTabIcon)
      this.tabIconList = resTabIcon.returnList;
      /*  resTabIcon.returnList.forEach(function (item, idx) {
         this.tabIconList.push(item)
       }) */
    }
    /*  this.encyList = await this.getEncyRandomList({
       number: 10
     });
     for (let ency of this.encyList) {
       this.$set(ency, 'encyImage', `${SmallImageBasePath}?id=${ency.id}`);
       if (ency.focus_id) {
         this.$set(ency, 'isFocused', true);
       } else {
         this.$set(ency, 'isFocused', false);
       }
     } */
  },

  async activated() {
    this.currentUserId = parseInt(window.localStorage.getItem('LoginUserId')) || 0;


    /*  const response = await this.getGroupList({
       page: 1,
       size: 10,
       province: this.curProvince[0]
     });
     this.groups = response.res;

     for (let group of this.groups) {
       this.$set(group, 'userAvatar', `${AvatarBasePath}?id=${group.user_id}`);
     } */
  },

  methods: {
    ...mapActions([
      'getTabIconList',
      /*   'getGroupList',
        'getUserAvatar',
        'getBillList',
        'getEncyImagesById',
        'focusEncy',
        'checkNotice',
        'getNoticeImage',
        'insertNotice',
        'getAdByProvinceCode' */
    ]),
    onItemClick(value, disabled) {
      console.log(value, disabled);
      /* if (!this.disabled) {} */
    },
    resetState() {
      var self = this;

      function timeOrderDefault() {
        self.timeOrder.type = 'default';
        self.timeOrder.img = require('@/assets/home/icon-order.png');
        self.$refs.timeOrderImg.style.transform = "rotate(0deg)";
      }

      function screenDefault() {
        self.screenType.active = false;
        self.screenType.img = require('@/assets/home/icon-screen.png');
      }

      function searchDefault() {
        self.search.acitve = false;
        self.search.img = require('@/assets/home/icon-search.png');
      }

      if (this.selected == 0) {
        timeOrderDefault();
        screenDefault();
        searchDefault();
      } else if (this.selected == 1) {
        screenDefault();
        searchDefault();
      } else if (this.selected == 2) {
        timeOrderDefault();
        searchDefault();
      } else if (this.selected == 3) {
        screenDefault();
        timeOrderDefault();
      }
    },
    handleDefault() {
      this.selected = 0;
      this.resetState();
    },
    handleTimeOrder() {
      this.selected = 1;
      this.resetState();
      if (this.timeOrder.type == 'default') {
        this.timeOrder.type = 'asc';
        this.timeOrder.img = require('@/assets/home/icon-order-active.png');
      } else if (this.timeOrder.type == 'asc') {
        this.timeOrder.type = 'desc';
        this.$refs.timeOrderImg.style.transform = "rotate(180deg)";
      } else if (this.timeOrder.type == 'desc') {
        this.timeOrder.type = 'asc';
        this.$refs.timeOrderImg.style.transform = "rotate(0deg)";
      }
    },
    handleScreen() {
      this.selected = 2;
      this.resetState();
      if (!this.screenType.acitve) {
        this.screenType.active = true;
        this.showScreenList = true; //显示筛选列表
        this.screenType.img = require('@/assets/home/icon-screen-active.png');
      }
    },
    handleSearch() {
      this.selected = 3;
      this.resetState();
      if (this.search.acitve == false) {
        this.search.active = true;
        this.isSearching = true; //显示筛选列表
        this.searchText = '';
        this.$nextTick(() => {
          this.$refs.encySearch.setFocus();
          this.details = [];
        });
      }
    },

    showAll(item) {
      if (item.height > 70) {
        item.height = 70;
      } else {
        var num = parseInt(item.list.length / 3);
        num = item.list.length > num * 3 ? num + 1 : num;
        console.log(num)
        var height = 30 + 45 * num;
        item.height = height;
      }
    },
    handelReset() { //筛选项重置事件
      this.screenChecked.splice(0, this.screenChecked.length);
    },
    confirmScreen() { //筛选项确认事件
      this.showScreenList = false; //关闭筛选列表
    },


    async handleTabItemClick(type) {
      this.activeTab = type;
      // this.initDetailsByType(type);
    },
    onInfinite(done) {
      let self = this
      if (this.countPage >= this.page) {
        self.onFetching = true
        console.log(this.page)
        this.page = this.page + 1
        self.getList(done, 2)
      } else {
        self.onFetching = false
        done()
      }

    }, //滑动加载更多工单
    //刷新
    onRefresh(done) {
      this.getList();
      done(); // call done
    },
    async handleDataRefresh(done) {
      /* this.getProvinceAds(this.curProvince);
      const response = await this.getGroupList({
        page: 1,
        size: 10,
        province: this.curProvince[0]
      });
      this.groups = response.res;
      for (let group of this.groups) {
        this.$set(group, 'userAvatar', `${AvatarBasePath}?id=${group.user_id}`);
      } */
      //this.bills = (await this.getBillList({page: 1, size: 10}))['bills'] || [];
      done();
    },

    handleActions(item, actionType) {
      switch (actionType) {
        case 'todoLists':
          this.$router.push({
            name: actionType,
          });
          break;
        case 'toGroupTab':
          this.$emit('on-to', 'group');
          break;
        case 'groupHelp':
          this.$vux.toast.text('程序猿努力开发中！');
          break;
        case 'cityComm':
        case 'fishStores':
        case 'coopStores':
        case 'billDetail':
        case 'todoDetail':
        case 'groupAdd':
          //const content = document.querySelector('._v-content');
          //console.log(content.style.transform);
          this.$router.push({
            name: actionType,
            params: {
              id: item.id
            }
          });
          break;
        case 'groupDetail':
          this.$router.push({
            name: actionType,
            params: {
              id: compile(item.id)
            }
          });
          break;
        case 'encySearchCancel':
          this.isSearching = false;
          this.search.active = true;
          this.$nextTick(() => {
          /*   this.initNavStyle();
            this.initDetailsByType(this.activeTab); */
          });
          break;
      }
    },

  },

  watch: {
    //打印筛选内容
    screenChecked: function (value) {
      if (value == 'T') {
        this.showTimeInput = true;
      }
      console.log(value)
    },
  }
};
