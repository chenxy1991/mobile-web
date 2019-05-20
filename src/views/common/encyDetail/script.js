import {mapActions} from 'vuex';
import {Swiper, ButtonTab, ButtonTabItem, Rater, Group, PopupPicker} from 'vux';
import {ImageBasePath} from '../../../constants/index';

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
    data() {
        return {
            activeTab: 'description',
            showSharePicker: false,
            shareTypes: shareTypes,
            shareType: [],
            ency: {},
            encyImages: []
        };
    },

    components: {
        Swiper,
        ButtonTab,
        ButtonTabItem,
        Rater,
        Group,
        PopupPicker
    },

    async activated() {
        const {id} = this.$route.params;

        this.ency = await this.getEncyById({id});
        const encyImages = (await this.getEncyImagesById({id}))['imageList'] || [];
        encyImages.map(image => {
            this.encyImages.push({
                url: `javascript: void(0);`,
                img: `${ImageBasePath}${image}`,
                fallbackImg: '',
                title: ''
            });
        });

        wx.miniProgram.postMessage({
            data: {
                'param': `type=dict&id=${id}`,
                'title': `${this.ency.name}`,
                'imageUrl': (this.encyImages[0] || {}).img
            }
        });
    },

    deactivated() {
        this.encyImages = [];
    },

    mounted() {
        const {id} = this.$route.params;
        const ele = document.getElementById('loading');
        ele.style.display = 'none';

        wx.miniProgram.postMessage({
            data: {
                'param': `type=dict&id=${id}`,
                'title': `${this.ency.name}`,
                'imageUrl': (this.encyImages[0] || {}).img
            }
        });
    },

    methods: {
        ...mapActions([
            'getEncyById',
            'getEncyImagesById'
        ]),

        handleActions(item, actionType) {
            switch (actionType) {
                case 'return':
                    this.$router.back();
                    break;
                default:
                    break;
            }
        },

        handleDataRefresh(done) {
            done();
        },

        handleTabItemChange(tabName) {
            if (tabName === 'share') {
                this.showSharePicker = true;
            } else {
                this.activeTab = tabName;
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