import {mapGetters, mapActions} from 'vuex';
import {ButtonTab, ButtonTabItem, LoadMore} from 'vux';
import {compile} from '../../../util/data';
import {AvatarBasePath} from '../../../constants/index';

export default {
    data() {
        return {
            active: 'lss',
            curProvince: [window.localStorage.getItem('SeawaterCurProvince') || 'sh'],
            LSS: undefined,
            PFS: undefined,
        };
    },

    components: {
        ButtonTab,
        ButtonTabItem,
        LoadMore
    },

    computed: {
        ...mapGetters([
            'groupsInCurProvince'
        ])
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
            const lssResult = await this.getUserList({
                type1: 'lss',
                province: this.curProvince[0],
                page: 1,
                size: 100
            });
            this.LSS = lssResult.users;
            for (let item of this.LSS) {
                this.$set(item, 'userAvatar', `${AvatarBasePath}?id=${item.id}`);
            }
            const pfsResult = await this.getUserList({
                type1: 'pfs',
                province: this.curProvince[0],
                page: 1,
                size: 100
            });
            this.PFS = pfsResult.users;
            for (let item of this.PFS) {
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
                default:
                    break;
            }
        }
    }
};