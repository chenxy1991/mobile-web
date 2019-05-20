import Vuex from 'vuex';
import common from './modules/common';
import m1 from './modules/m1';
export default new Vuex.Store({
    modules: {
        common,
        m1,
    }
});
