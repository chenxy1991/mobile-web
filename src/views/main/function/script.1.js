import {
  mapActions
} from 'vuex';
import {
  AvatarBasePath
} from '../../../constants/index';

export default {
  data() {
    return {
      currentUser: {},
      avatarImgPath: ''
    }
  },

  async activated() {
    const currentUserId = parseInt(this.storejs.get('LoginUserId'));
    if (currentUserId) {
      this.currentUser = this.storejs.get('UserInfo');
      this.avatarImgPath = `${AvatarBasePath}?id=${currentUserId}&r=${Math.random()}`;
    } else {
     // this.$router.push('/user/login/register');
    }
  },

  methods: {
    ...mapActions([
      'getUserById',
      'getUserAvatar',
      'logout'
    ]),

    handleActions(actionType) {
      switch (actionType) {
        case 'myGroups':
        case 'myCarts':
        case 'mySetting':
        case 'encyFocus':
          this.$router.push({
            name: actionType
          });
          break;
        default:
          break;
      }
    },

    handleLogout() {
      this.$vux.confirm.show({
        title: '确定退出',
        content: '确定退出登录吗？',
        onConfirm: async () => {
          window.localStorage.clear();
          window.sessionStorage.clear();
          /* const result = await this.logout({
            id: parseInt(this.storejs.get('LoginUserId')),
          }); */
          console(result);
            this.$router.push('/user/login/register');
          if (result.status === 'ok') {
            this.$vux.toast.show({
              type: 'success',
              text: `退出登录成功`
            });
            this.$router.push('/user/login/register');
          }
        }
      });
    }
  }
}
