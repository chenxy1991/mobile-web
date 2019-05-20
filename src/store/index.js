import Vuex from 'vuex';
import * as TYPES from '../constants/types';
import * as CommonAction from '../actions/CommonAction';
import * as UserAction from '../actions/UserAction';
import * as EncyAction from '../actions/EncyAction';
import * as BillAction from '../actions/BillAction';
import * as GroupAction from '../actions/GroupAction';
import * as CartAction from '../actions/CartAction';
import createLogger from 'vuex/dist/logger'; // 修改日志
const debug = process.env.NODE_ENV !== 'production'; // 开发环境中为true，否则为false
const state = {
  loadingShow: false,
  isWellcome: true, //引导页
  showBack: false, //返回图标
  title: '', //头部标题
  backText: '', //返回文字
  showHeader: false, //头部显示
};

const getters = {
  loadingShow: state => state.loadingShow,
};

const mutations = {
  [TYPES.LOADING](state, loadingShow) {
    state.loadingShow = loadingShow;
  },
  updateWellcome(state, flag) {
    state.isWellcome = flag;
  },
  updateShowBack(state, flag) {
    state.showBack = flag;
  },
  updateTitle(state, flag) {
    state.title = flag;
  },
  updateBackText(state, flag) {
    state.backText = flag;
  },
  updatShowHeader(state, flag) {
    state.showHeader = flag;
  },
};

const actions = {
  ...CommonAction,
  ...UserAction,
  ...EncyAction,
  ...BillAction,
  ...GroupAction,
  ...CartAction,
  setAppIsWellcomeAction({
    commit
  }, params) {
    commit('updateWellcome', params);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: debug ? [createLogger()] : [], // 开发环境下显示vuex的状态修改
});
