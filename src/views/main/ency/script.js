import {mapActions} from 'vuex';
import {
  Search,
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  Rater,
  Group,
  PopupPicker,
  LoadMore,
 XHeader,
} from 'vux';
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
            currentUserId: parseInt(this.storejs.get('SeawaterLoginUserId')),
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
        Search,
        Tab,
        TabItem,
        Flexbox,
        FlexboxItem,
        Rater,
        Group,
        PopupPicker,
        LoadMore,
        XHeader,
    },

    created() {
        this.initRandomEncyList(this.activeTab);
    },

    methods: {
        ...mapActions([
            'getTypesByCategoryCode',
            'getEncyList',
            'getSmallEncyImageById',
            'focusEncy'
        ]),

        async initRandomEncyList(type) {
        },

        async initEncyListInType(type, size = 1000) {
            this.$vux.loading.show({
                text: '努力加载中'
            });
            let result = [];
            try {
                if (this.activeTypes[this.activeTab] === 'all') {
                    const result = await this.getEncyList({
                        size: 20,
                        category: this.activeTab
                    });
                    this.encyList = result['materials'] || [];
                    for (let ency of this.encyList) {
                        this.$set(ency, 'encyImage', `${SmallImageBasePath}?id=${ency.id}`);
                    }
                } else {
                    result = await this.getEncyList({
                        type, page: 1,
                        size,
                        userId: this.currentUserId
                    });
                    this.encyList = result['materials'] || [];
                    for (let ency of this.encyList) {
                        this.$set(ency, 'encyImage', `${SmallImageBasePath}?id=${ency.id}`);
                        if (ency.focus_id) {
                            this.$set(ency, 'isFocused', true);
                        } else {
                            this.$set(ency, 'isFocused', false);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
            this.$vux.loading.hide();
        },

        handleTabItemClick (type) {
            this.activeTab = type;
            window.sessionStorage.setItem('SeawaterEncyActiveTab', type);
            this.initRandomEncyList(type);
        },

        handleActions(item, actionType) {
            switch (actionType) {
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
                case 'encySearch':
                    this.searching = true;
                    break;
                case 'encySearchCancel':
                    this.searching = false;
                    this.initRandomEncyList(this.activeTab);
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
                this.$set(ency, 'isFocused', !ency.isFocused);
            }
        },

        async handleTypeChange(type) {
            this.activeTypes[this.activeTab] = type.code;
            window.sessionStorage.setItem(`SeawaterEncy${this.activeTab}ActiveType`, type.code);
            this.initEncyListInType(type.code);
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
