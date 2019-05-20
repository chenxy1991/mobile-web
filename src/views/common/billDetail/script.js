import {mapActions} from 'vuex';
import {Badge} from 'vux';

export default {
    data() {
        return {
            bill: {},
            details: []
        };
    },

    components: {
        Badge
    },

    async activated() {
        const {id} = this.$route.params;

        this.$vux.loading.show({
            text: '努力加载中'
        });
        this.bill = (await this.getBillById({id}));
        this.details = await this.getDetailsByBillId({id}) || [];
        this.$vux.loading.hide();

        wx.miniProgram.postMessage({
            data: {
                'param': `type=bill-detail&id=${id}`,
                'title': `${this.bill.name}`,
                'imageUrl': 'https://static.huanjiaohu.com/image/share/bill-detail.jpg'
            }
        });
    },

    mounted() {
        const {id} = this.$route.params;
        const ele = document.getElementById('loading');
        ele.style.display = 'none';

        wx.miniProgram.postMessage({
            data: {
                'param': `type=bill-detail&id=${id}`,
                'title': `${this.bill.name}`,
                'imageUrl': 'https://static.huanjiaohu.com/image/share/bill-detail.jpg'
            }
        });
    },

    methods: {
        ...mapActions([
            'getBillById',
            'getDetailsByBillId'
        ]),

        async handleDataRefresh(done) {
            const {id} = this.$route.params;
            this.bill = (await this.getBillById({id}));
            done();
        },

        handleActions(item, actionType) {
            const {id} = this.$route.params;

            switch (actionType) {
                case 'return':
                    this.$router.back();
                    break;
                case 'groupAdd':
                    this.$router.push({
                        name: 'groupAdd',
                        params: {
                            id
                        }
                    });
                    break;
                default:
                    break;
            }
        }
    }
};