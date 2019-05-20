const state = {
    loadingShow: false
};

const getters = {
    loadingShow: state => state.loadingShow
};

const mutations = {

    update_loading(state, data) {
        state.loadingShow = data;
    }
};

const actions = {
    loading
};

export default {
  state,
  getters,
  mutations,
  actions
};
