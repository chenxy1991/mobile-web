import {
  mapActions
} from 'vuex';
import {
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
} from 'vux';
import {
  compile,
  formatUrlParams
} from '../../../util/data';
import {
  AvatarBasePath,
  SmallImageBasePath
} from '../../../constants';

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
  data() {
    return {
      currentUserId: parseInt(window.localStorage.getItem('SeawaterLoginUserId')),
      list: urlList,
      provinceAdList: [],
      billFirstWordColor: ['#ee735c', '#d4e5e0', '#f5a623', '#64c708', '#84daef'],
      showProvincesPicker: false,
      provinces: [],
      curProvince: [localStorage.getItem('SeawaterCurProvince') || 'sh'],
      curProvinceName: localStorage.getItem('SeawaterCurProvinceName') || '上海',
      groups: undefined,
      bills: undefined,
      encyList: [],
      hasActiveGroup: true,
      hasActiveLingShow: true,
      hasActiveBill: true,
      groupCountDownTimer: null,
      showNotice: false,
      showNoticeImage: '',
      hasReadNotice: false,
      showAd: false,
      showAdImage: ''
    };
  },

  components: {
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
  },

  async created() {

    /* this.encyList = await this.getEncyRandomList({
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
    this.currentUserId = parseInt(window.localStorage.getItem('SeawaterLoginUserId')) || 0;

    if (!this.currentUserId && window.location.search) {
      const params = formatUrlParams(window.location.search.substring(1));
      const {
        code
      } = params;
      if (code) {
        const result = await this.loginWechat({
          code
        });

        if (result.status === 'ok') {
          this.$vux.toast.show({
            text: '登录成功'
          });
          this.currentUserId = result.id;
          this.handleProvinceChange([result.province]);
          window.localStorage.setItem('Authorization', result.token);
          window.localStorage.setItem('SeawaterLoginUserId', result.id);
          window.sessionStorage.removeItem('SeaWaterInputHasErrorNum');
          window.sessionStorage.removeItem('SeaWaterLoginHasError');
          await this.checkIfNotice({
            userId: result.id,
            noticeId
          });
        }
      }
    } else {
      await this.checkIfNotice({
        userId: this.currentUserId || 0,
        noticeId
      });
      const response = await this.getGroupList({
        page: 1,
        size: 10,
        province: this.curProvince[0]
      });
      this.groups = response.res;

      for (let group of this.groups) {
        this.$set(group, 'userAvatar', `${AvatarBasePath}?id=${group.user_id}`);
      }
    }
  },

  methods: {
    ...mapActions([
      'updateGroupsInCurProvince',
      'getProvinces',
      'getGroupList',
      'getUserAvatar',
      'getBillList',
      'getEncyRandomList',
      'getEncyImagesById',
      'focusEncy',
      'checkNotice',
      'getNoticeImage',
      'insertNotice',
      'getAdByProvinceCode'
    ]),



    async handleDataRefresh(done) {
      this.getProvinceAds(this.curProvince);
      const response = await this.getGroupList({
        page: 1,
        size: 10,
        province: this.curProvince[0]
      });
      this.groups = response.res;
      for (let group of this.groups) {
        this.$set(group, 'userAvatar', `${AvatarBasePath}?id=${group.user_id}`);
      }
      //this.bills = (await this.getBillList({page: 1, size: 10}))['bills'] || [];
      this.encyList = await this.getEncyRandomList({
        number: 10
      });
      for (let ency of this.encyList) {
        this.$set(ency, 'encyImage', `${SmallImageBasePath}?id=${ency.id}`);
        if (ency.focus_id) {
          this.$set(ency, 'isFocused', true);
        } else {
          this.$set(ency, 'isFocused', false);
        }
      }
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
        case 'encyDetail':
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
        case 'focus':
          this.handleFocusEncy(item);
          break;
        default:
          break;
      }
    },

    async handleFocusEncy(ency) {
      const response = await this.focusEncy({
        user_id: this.currentUserId,
        material_id: ency.id
      });

      if (response.status === 'ok') {
        this.$set(ency, 'isFocused', !ency.isFocused);
      }
    },

    async checkIfNotice({
      userId = 0,
      noticeId = 0
    }) {
      const response = await this.checkNotice({
        userId,
        noticeId
      });

      const {
        status,
        checked
      } = response;
      if (status === 'ok' && checked) {
        const imageResponse = await this.getNoticeImage();
        const {
          status,
          notice_id,
          notice_file
        } = imageResponse;
        if (status === 'ok') {
          this.showNoticeImage = notice_file;
          this.$nextTick(() => {
            this.showNotice = true;
          });
          window.localStorage.setItem('SeawaterNoticeId', notice_id);
        }
      }
    },

    async handleHasReadNotice() {
      const noticeId = parseInt(window.localStorage.getItem('SeawaterNoticeId')) || 0;

      this.showNotice = false;

      if (this.currentUserId) {
        await this.insertNotice({
          userId: this.currentUserId,
          noticeId
        });
      }
    },

    handleSwiperImageClick(item) {
      this.showAd = true;
      this.showAdImage = item.bigImg;
    },

    handleAdDialog() {
      this.showAd = false;
    },

    async getProvinceAds(code) {
      this.provinceAdList = [];
      const response = await this.getAdByProvinceCode({
        code
      });
      if (response.status === 'ok') {
        const adNum = Number(response.ad_num);
        for (let i = 0; i < adNum; i++) {
          this.provinceAdList.push({
            url: 'javascript: void(0);',
            img: `https://static.huanjiaohu.com/image/ad/${code}/${i + 1}.jpg`,
            bigImg: `https://static.huanjiaohu.com/image/ad/${code}/${i + 1}_big.jpg`,
          });
        }
      }
    },

    getProvinceNameByValue(value) {
      for (let province of this.provinces) {
        if (province.value === value[0]) {
          return province.name;
        }
      }

      return '';
    },

    mapLevel(levelCode) {
      switch (levelCode) {
        case 'ry':
          return 1;
        case 'yb':
          return 3;
        case 'kn':
          return 5;
      }
    },

    mapTimeInterval(totalSeconds) {
      const days = Math.floor(totalSeconds / 3600 / 24) || 0;
      const hours = Math.floor((totalSeconds - days * 24 * 3600) / 3600) || 0;
      const minutes = Math.floor((totalSeconds - days * 24 * 3600 - hours * 3600) / 60) || 0;
      const seconds = Math.floor((totalSeconds - days * 24 * 3600 - hours * 3600 - minutes * 60)) || 0;

      return `${days !== 0 ? `${days}天` : ``}${hours !== 0 ? `${hours}小时` : ``}${minutes !== 0 ? `${minutes}分` : ``}${seconds}秒`;
    }
  },

  watch: {
    groups: function (curValue) {
      this.hasActiveGroup = curValue.filter(item => (item.status === 1 && item.userType !== 'lss')).length !== 0;
      this.hasActiveLingShow = curValue.filter(item => (item.status === 1 && item.userType === 'lss')).length !== 0;
    },
    bills: function (curValue) {
      const filteredBills = curValue.filter(item => item.status === 1);
      this.hasActiveBill = filteredBills.length !== 0;
    }
  }
};
