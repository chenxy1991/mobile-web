import {mapGetters, mapActions} from 'vuex';
import {ButtonTab, ButtonTabItem, Alert, LoadMore} from 'vux';
import {compile} from '../../../util/data';
import {AvatarBasePath} from '../../../constants/index';

export default {
    data() {
        return {
            billFirstWordColor: ['#ee735c', '#d4e5e0', '#f5a623', '#64c708', '#84daef'],
            active: window.sessionStorage.getItem('SeawaterGroupTabActive') || 'group',
            curProvince: [window.localStorage.getItem('SeawaterCurProvince') || 'sh'],
            groups: undefined,
            bills: undefined,
            currentItem: {},
            showTip: false
        };
    },

    components: {
        ButtonTab,
        ButtonTabItem,
        Alert,
        LoadMore
    },

    computed: {
        ...mapGetters([
            'groupsInCurProvince'
        ])
    },

    async created() {
        const response = await this.getGroupList({
            page: 1,
            size: 10,
            province: this.curProvince[0]
        });
        this.groups = response.res;
        for (let group of this.groups) {
            this.$set(group, 'userAvatar', `${AvatarBasePath}?id=${group.user_id}`);
        }
        this.bills = (await this.getBillList({page: 1, size: 1000}))['bills'] || [];
    },

    methods: {
        ...mapActions([
            'getGroupList',
            'getBillList'
        ]),

        async handleDataRefresh(done) {
            const response = await this.getGroupList({
                page: 1,
                size: 10,
                province: this.curProvince[0]
            });
            this.groups = response.res;
            for (let group of this.groups) {
                this.$set(group, 'userAvatar', `${AvatarBasePath}?id=${group.user_id}`);
            }
            this.bills = (await this.getBillList({page: 1, size: 10}))['bills'] || [];
            done();
        },

        handleTabItemChange(name) {
            this.active = name;
            window.sessionStorage.setItem('SeawaterGroupTabActive', name);
        },

        handleActions(item, actionType) {
            switch (actionType) {
                case 'billDetail':
                case 'groupAdd':
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
                case 'tip':
                    this.currentItem = item;
                    this.$nextTick(() => {
                        this.showTip = true;
                    });
                    break;
                default:
                    break;
            }
        }
    }
};