import {mapActions} from 'vuex';
import {XNumber, Group, XTextarea, Confirm} from 'vux';
import {SmallImageBasePath} from '../../../constants/index';

export default {
    data() {
        return {
            cart: {},
            group: {},
            details: [],
            detailsInCart: [],
            totalCount: 0,
            totalFreight: 0,
            currentItem: {},
            deleteConfirm: false,
        };
    },

    components: {
        XNumber,
        Group,
        XTextarea,
        Confirm
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
            'getGroupById',
            'getCartById',
            'getDetailsByBillId',
            'getDetailsByCartId',
            'updateCart',
            'updateCartDetail',
            'deleteDetailById',
            'calculateLost',
            'calculateDamage'
        ]),

        async initData() {
            const {id} = this.$route.params;
            this.$vux.loading.show("努力加载中");

            this.cart = (await this.getCartById({id}))[0];
            this.group = (await this.getGroupById({id: this.cart.group_bill_id}))[0];
            this.details = await this.getDetailsByBillId({id: this.group.bill_id});
            this.initCartData();

            this.$vux.loading.hide();
        },

        async initCartData() {
            const result = (await this.getDetailsByCartId({
                cartId: this.cart.id
            }))['res'];
            this.detailsInCart = this.details.filter(detail => {
                for (let item of result) {
                    if (detail.id === item.bill_detail_id) {
                        this.$set(detail, 'count', item['bill_detail_num']);
                        if (this.group.current_step === 0) {
                            this.$set(detail, 'max', item['org_bill_detail_num'] - item['damage_num']);
                            this.$set(detail, 'min', item['org_bill_detail_num'] - item['damage_num']);
                        } else if (this.group.current_step === 1) {
                            this.$set(detail, 'max', item['org_bill_detail_num'] - item['damage_num']);
                            this.$set(detail, 'min', 0);
                        } else if (this.group.current_step === 2) {
                            this.$set(detail, 'max', item['org_bill_detail_num'] - item['lost_num']);
                            this.$set(detail, 'min', 0);
                        }
                        this.$set(detail, 'groupId', this.group.id);
                        return true;
                    }
                }
                return false;
            });
        },

        handleActions(item, actionType) {
            switch(actionType) {
                case 'return':
                    this.$router.back();
                    break;
                default:
                    break;
            }
        },

        numberChange(item) {
            this.calculateCartCount(async () => {
                this.calculateCartFreight();
                await this.handleLostDamage(item);
                await this.handleSubmit();
            });
        },

        deleteConfirmFun(item) {
            this.currentItem = item;
            this.deleteConfirm = true;
        },

        async handleConfirmDelete() {
            const {id} = this.$route.params;
            let deleteIndex = -1;

            for (let i = 0; i < this.detailsInCart.length; i++) {
                if (this.detailsInCart[i].id === this.currentItem.id) {
                    deleteIndex = i;
                    break;
                }
            }
            if (deleteIndex !== -1) {
                this.$vux.loading.show('努力加载中');
                let result = {};
                try {
                    result = await this.deleteDetailById({
                        cart_id: id,
                        bill_detail_id: this.currentItem.id
                    });
                } catch (error) {
                    console.error(error);
                }

                if (result.status === 'ok') {
                    this.detailsInCart.splice(deleteIndex, 1);
                    this.handleSubmit();
                }
                this.$vux.loading.hide();
            }
        },

        async handleSubmit() {
            const {id} = this.$route.params;
            let submitFlag = true;

            this.$vux.loading.show('努力加载中');
            const result = await this.updateCart({
                id,
                phone: this.cart.phone,
                description: this.remark || undefined,
                sum: this.totalCount,
                freight: this.totalFreight,
                status: 1
            });
            if (result.status) {
                for (let i = 0; i < this.detailsInCart.length; i++) {
                    try {
                        await this.updateCartDetail({
                            cart_id: id,
                            bill_detail_id: this.detailsInCart[i].id,
                            bill_detail_num: this.detailsInCart[i].count,
                            group_bill_id: this.group.id
                        });
                    } catch (error) {
                        console.error(error);
                        submitFlag = false;
                    }
                }
            } else {
                submitFlag = false;
            }
            this.$vux.loading.hide();
            if (submitFlag) {
                this.$vux.toast.text('操作成功');
            }
        },

        async updateDetailsImg() {
            this.detailsInCart.map(async detail => {
                this.$set(detail, 'encyImage', `${SmallImageBasePath}?id=${detail.material_id || 0}`);
            });
        },

        calculateCartCount(handler) {
            this.$nextTick(async () => {
                let cartCount = 0;
                for (let detail of this.detailsInCart) {
                    cartCount += detail.price * detail.count;
                }
                this.totalCount = cartCount;
                handler && handler();
            });
        },

        calculateCartFreight() {
            if (this.group.current_step === 1) {
                let totalFreight = 0;           
                for (let detail of this.detailsInCart) {
                    if (this.group.top_freight) {
                        totalFreight += Math.min(detail.price * this.group.freight, this.group.top_freight) * detail.count;
                    } else {
                        totalFreight += (detail.count * detail.price) * this.group.freight;
                    }
                }
                this.totalFreight = Math.round(totalFreight * 100) / 100;
            } else if (this.group.current_step === 2) {
                this.totalFreight = this.cart.freight;
            }

            return this.totalFreight;
        },

        async handleLostDamage(item) {
            if (this.group.current_step === 1) {
                await this.calculateLost({
                    cart_id: this.cart.id,
                    bill_detail_id: item.id,
                    lost_num: item.count,
                });
            } else if (this.group.current_step === 2) {
                await this.calculateDamage({
                    cart_id: this.cart.id,
                    bill_detail_id: item.id,
                    damage_num: item.count,
                });
            }
        }
    },

    watch: {
        'detailsInCart'() {
            this.calculateCartCount();
            this.calculateCartFreight();
            this.updateDetailsImg();
        }
    }
};