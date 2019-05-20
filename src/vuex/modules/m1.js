//这里面是要读取或者写入数据的地方
const state = {
  showBack: false, //返回图标
  title: '', //头部标题
  backText: '', //返回文字

  showHeader: false, //头部显示
}

const getters = {
};
//同步更新
const mutations = {
  updateShowAsideMenu(state, flag) {
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
//一步更新
const actions = {
  updateShowAsideMenuAction({
    commit
  }, platform) {
    commit('updateShowAsideMenu', platform);
  },
  updateShowBackAction({
    commit
  }, platform) {
    commit('updateShowBack', platform);
  },
  updateTitleAction({
    commit
  }, platform) {
    commit('updateTitle', platform);
  },
  updateBackTextAction({
    commit
  }, platform) {
    commit('updateBackText', platform);
  },
  updatShowHeaderAction({
    commit
  }, platform) {
    commit('updatShowHeader', platform);
  },

};

export default {
  state,
  getters,
  mutations,
  actions
};
