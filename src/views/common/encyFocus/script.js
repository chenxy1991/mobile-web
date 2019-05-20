import {mapActions} from 'vuex';
import {ViewBox, Search, Tab, TabItem, Grid, GridItem, Sticky, Rater, Group, PopupPicker, LoadMore} from 'vux';
import {SmallImageBasePath} from '../../../constants/index';

const shareTypes = [{
    name: '微信',
    value: 'wechat'
}, {
    name: 'QQ',
    value: 'qq'
}, {
    name: '微博',
    value: 'weibo'
}];

export default {
    data () {
        return {
            currentUserId: parseInt(window.localStorage.getItem('SeawaterLoginUserId')),
            activeTab: window.sessionStorage.getItem('SeawaterEncyActiveTab') || 'tj',
            types: [],
            activeTypes: {
                tj: '',
                hy: window.sessionStorage.getItem('SeawaterEncyhyActiveType') || 'all',
                rt: window.sessionStorage.getItem('SeawaterEncyrtActiveType') || 'all',
                yg: window.sessionStorage.getItem('SeawaterEncyygActiveType') || 'all',
                qt: window.sessionStorage.getItem('SeawaterEncyqtActiveType') || 'all'
            },
            encyList: undefined,
            showSharePicker: false,
            shareTypes: shareTypes,
            shareType: [],
            currentItem: {},
            searching: false,
            searchText: '',
            searchTimer: null
        }
    },
    components: {
        ViewBox,
        Search,
        Tab,
        TabItem,
        Grid,
        GridItem,
        Sticky,
        Rater,
        Group,
        PopupPicker,
        LoadMore
    },

    activated() {
        this.initFocusedEncyList();
    },

    methods: {
        ...mapActions([
            'getTypesByCategoryCode',
            'getEncyList',
            'getSmallEncyImageById',
            'getFocusedEncyList',
            'focusEncy'
        ]),

        async initFocusedEncyList() {
            this.encyList = await this.getFocusedEncyList({userId: this.currentUserId});
            for (let ency of this.encyList) {
                this.$set(ency, 'encyImage', `${SmallImageBasePath}?id=${ency.id}`);
                this.$set(ency, 'isFocused', true);
            }
        },

        handleActions(item, actionType) {
            switch (actionType) {
                case 'return':
                    this.$router.back();
                    break;
                case 'share':
                    this.currentItem = item;
                    this.showSharePicker = true;
                    break;
                case 'encyDetail':
                    this.$router.push({
                        name: actionType,
                        params: {
                            id: item.id
                        }
                    });
                    break;
                case 'focus':
                    this.handleFocusEncy(item);
                    break;
                default:
                    break;
            }
        },

        async handleFocusEncy(ency) {
            const response = await this.focusEncy({
                user_id: this.currentUserId,
                material_id: ency.id
            });

            if (response.status === 'ok') {
                this.initFocusedEncyList();
            }
        },

        handleShareTypeChange(shareType) {
            this.shareType = shareType;
        },

        handleCloseSharePicker(closeType) {
            if (closeType) {
                console.log('shareType', this.shareType);
            }
        },

        async handleSearchChange()  {
            if (this.searchText) {
                window.clearTimeout(this.searchTimer);
                this.searchTimer = setTimeout(async () => {
                    const result = await this.getEncyList({
                        name: this.searchText,
                        page: 1,
                        size: 100,
                        userId: this.currentUserId
                    });
                    this.encyList = result['materials'] || [];
                    for (let ency of this.encyList) {
                        this.$set(ency, 'encyImage', `${SmallImageBasePath}?id=${ency.id}`);
                    }
                }, 500);
            }
        },

        mapLevel(levelCode) {
            switch (levelCode) {
                case 'ry':
                    return 1;
                case 'yb':
                    return 3;
                case 'kn':
                    return 5;
            }
        }
    }
};
