import Vuex from 'vuex';
import * as TYPES from '../constants/types';
import * as CommonAction from '../actions/CommonAction';
import * as UserAction from '../actions/UserAction';
import * as TaskAction from '../actions/TaskAction';
import * as ThirdMOAAction from '../actions/ThirdMOAAction';
import createLogger from 'vuex/dist/logger'; // 修改日志
const debug = process.env.NODE_ENV !== 'production'; // 开发环境中为true，否则为false
const state = {
  formDetail:'',//表单明细
  loadingShow: false,
  isWellcome: true, //引导页
  showBack: false, //返回图标
  title: '', //头部标题
  backText: '', //返回文字
  showHeader: false, //头部显示
};

const getters = {
  getFormDetail(state) {
      return state.formDetail;
  },
  loadingShow: state => state.loadingShow,
};

const mutations = {
  [TYPES.LOADING](state, loadingShow) {
    state.loadingShow = loadingShow;
  },
  updateWellcome(state, flag) {
    state.isWellcome = flag;
  },
  updateShowBack(state, showBack) {
    state.showBack = showBack;
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
  updatFormDetail(state, formDetail) {
     state.formDetail = formDetail;
   },

};

const actions = {
  ...CommonAction,
  ...UserAction,
  ...TaskAction,
  ...ThirdMOAAction,
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
