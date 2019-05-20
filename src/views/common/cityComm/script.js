import {mapGetters, mapActions} from 'vuex';
import {ButtonTab, ButtonTabItem, LoadMore, Popover} from 'vux';
import {compile} from '../../../util/data';
import {QQAvatarBasePath} from '../../../constants/index';

export default {
    data() {
        return {
            active: 'qq',
            curProvince: [window.localStorage.getItem('SeawaterCurProvince') || 'sh'],
            QQs: undefined,
            WXs: undefined,
        };
    },

    components: {
        ButtonTab,
        ButtonTabItem,
        LoadMore,
        Popover
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
            'getLocalContacts'
        ]),

        async initData() {
            this.QQs = await this.getLocalContacts({
                type: 'qq',
                province: this.curProvince[0]
            });
            for (let item of this.QQs) {
                this.$set(item, 'userAvatar', `${QQAvatarBasePath}?id=${item.id}`);
            }
            this.WXs = await this.getLocalContacts({
                type: 'wx',
                province: this.curProvince[0]
            });
            for (let item of this.WXs) {
                this.$set(item, 'userAvatar', `${QQAvatarBasePath}?id=${item.id}`);
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