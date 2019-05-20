import {mapActions} from 'vuex';
import {ButtonTab, ButtonTabItem, LoadMore} from 'vux';
import {AvatarBasePath} from '../../../constants';

export default {
    data() {
        return {
            active: 'ency',
            LSS: undefined,
            PFS: undefined,
            encyStores: undefined,
            equStores: undefined,
        };
    },

    components: {
        ButtonTab,
        ButtonTabItem,
        LoadMore
    },

    activated() {
        this.initData();
    },

    mounted() {
        const ele = document.getElementById('loading');
        ele.style.display = 'none';
    },

    methods: {
        ...mapActions([
            'getUserList'
        ]),

        async initData() {
            const encyStoresResult = await this.getUserList({
                type1: 'pfs',
                page: 1,
                size: 100
            });
            this.encyStores = encyStoresResult.users;
            for (let item of this.encyStores) {
                this.$set(item, 'userAvatar', `${AvatarBasePath}?id=${item.id}`);
            }
            const equStoresResult = await this.getUserList({
                type1: 'qcs',
                page: 1,
                size: 100
            });
            this.equStores = equStoresResult.users;
            for (let item of this.equStores) {
                this.$set(item, 'userAvatar', `${AvatarBasePath}?id=${item.id}`);
            }
        },

        handleDataRefresh(done) {
            this.initData();
            done();
        },

        handleTabItemChange(name) {
            this.active = name;
        },

        handleActions(item, actionType) {
            switch (actionType) {
                case 'return':
                    this.$router.back();
                    break;
                default:
                    break;
            }
        }
    }
};