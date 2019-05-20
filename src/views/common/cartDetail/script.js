import {mapActions} from 'vuex';
import {XNumber, Group, XTextarea, XInput, Cell, Marquee, MarqueeItem, Confirm} from 'vux';
import {compile} from '../../../util/data';
import {SmallImageBasePath} from '../../../constants/index';
import RegExp from '../../../constants/regExp';

export default {
    data() {
        return {
            currentUser: {},
            currentUserId: parseInt(window.localStorage.getItem('userInfo')),
            group: {},
            details: [],
            detailsInCart: [],
            totalCount: 0,
            totalFreight: 0,
            phone: '',
            remark: '',
            currentItem: {},
            deleteConfirm: false,
            cart: {},
        };
    },

    components: {
        XNumber,
        Group,
        XTextarea,
        XInput,
        Cell,
        Marquee,
        MarqueeItem,
        Confirm
    },

    async activated() {
        const {groupId, cartId} = this.$route.params;
        this.$vux.loading.show({
            text: '努力加载中'
        });
        this.currentUser = parseInt(window.localStorage.getItem('LoginUserId'));
        let userInfo=JSON.pese(window.localStorage.getItem('UserInfo'));
        this.phone = this.currentUser.phone === '18888888888' ? '' : this.currentUser.phone;

        this.group = (await this.getGroupById({id: groupId}))[0] || {};
        this.cart = (await this.getCartUnderUserByGroupId({
            groupId: this.group.id,
            userId: this.currentUserId
        }))[0];
        this.remark = (this.cart.description === 'null' ? '' : (this.cart.description || '')).trim();
        this.details = await this.getDetailsByBillId({id: this.group.bill_id});

        const result = (await this.getDetailsByCartId({
            cartId
        }))['res'];
        this.detailsInCart = this.details.filter(detail => {
            for (let item of result) {
                if (detail.id === item.bill_detail_id) {
                    this.$set(detail, 'count', item['bill_detail_num']);
                    this.$set(detail, 'lostNum', item['lost_num']);
                    this.$set(detail, 'damageNum', item['damage_num']);
                    this.$set(detail, 'lostBackFreight', item['lost_back_freight']);
                    this.$set(detail, 'groupId', this.group.id);
                    if (this.group.status === 0) {
                        this.$set(detail, 'max', item['bill_detail_num']);
                        this.$set(detail, 'min', item['bill_detail_num']);
                    } else {
                        this.$set(detail, 'max', 10000);
                        this.$set(detail, 'min', 1);
                    }
                    return true;
                }
            }
            return false;
        });

        this.$vux.loading.hide();
    },

    deactivated() {
        this.detailsInCart = [];
        this.totalCount = 0;
        this.totalFreight = 0;
        this.phone =  '';
        this.remark = '';
        this.cart = {};
    },

    mounted() {
        const ele = document.getElementById('loading');
        ele.style.display = 'none';
    },

    methods: {
        ...mapActions([
            'getGroupById',
            'getDetailsByBillId',
            'getDetailsByCartId',
            'getEncyImageById',
            'updateCart',
            'updateCartDetail',
            'deleteDetailById',
            'getCartUnderUserByGroupId',
            'updateCartAndDetail',
            'confirmCart'
        ]),

        handleDataRefresh(done) {
            done();
        },

        handleActions(item, actionType) {
            switch (actionType) {
                case 'numberChange':
                    this.calculateCartCount(item);
                    break;
                case 'deleteConfirm':
                    this.currentItem = item;
                    this.deleteConfirm = true;
                    break;
                case 'groupDetail':
                    this.$router.push({
                        name: actionType,
                        params: {
                            id: compile(this.group.id)
                        }
                    });
                    break;
                case 'return':
                    this.$router.push('/');
                    break;
                case 'saveInfo':
                    this.handleSaveInfo();
                    break;
                default:
                    break;
            }
        },

        async handleConfirmDelete() {
            const {cartId} = this.$route.params;
            let deleteIndex = -1;

            for (let i = 0; i < this.detailsInCart.length; i++) {
                if (this.detailsInCart[i].id === this.currentItem.id) {
                    deleteIndex = i;
                    break;
                }
            }
            if (deleteIndex !== -1) {
                this.$vux.loading.show({
                    text: '努力加载中'
                });
                const result = await this.deleteDetailById({
                    cart_id: cartId,
                    bill_detail_id: this.currentItem.id
                });

                if (result.status === 'ok') {
                    this.detailsInCart.splice(deleteIndex, 1);
                    this.$vux.toast.show({
                        type: 'success',
                        text: `删除${this.currentItem.name}成功`
                    });
                    let cartCount = 0;
                    for (let detail of this.detailsInCart) {
                        cartCount += detail.price * detail.count;
                    }

                    this.$nextTick(async () => {
                        await this.updateCart({
                            id: cartId,
                            phone: this.phone,
                            description: this.remark,
                            sum: cartCount,
                            freight: this.calculateCartFreight(),
                            status: 1
                        });
                    });
                }
                this.$vux.loading.hide();
            }
        },

        async handleSaveInfo() {
            if (!this.validSubmit()) {
                return;
            }
            const {cartId} = this.$route.params;

            await this.updateCart({
                id: cartId,
                phone: this.phone,
                description: this.remark,
                sum: this.totalCount,
                freight: this.totalFreight,
                status: 1
            });
        },

        async handleSubmit() {
            if (!this.validSubmit()) {
                return;
            }
            const {cartId} = this.$route.params;

            this.$vux.loading.show({
                text: '努力加载中'
            });
            const result = await this.confirmCart({
                id: cartId,
                is_confirm: 1
            });
            if (result.status === 'ok') {
                this.$vux.toast.text('确认购买成功');
            }
            this.$vux.loading.hide();
        },

        updateDetailsImg() {
            this.detailsInCart.map(detail => {
                this.$set(detail, 'encyImage', `${SmallImageBasePath}?id=${detail.material_id || 0}`);
            });
        },

        calculateCartCount(item) {
            const {cartId} = this.$route.params;

            this.$nextTick(async () => {
                let cartCount = 0;
                for (let detail of this.detailsInCart) {
                    cartCount += detail.price * detail.count;
                }
                this.totalCount = cartCount;
                const detailsInCartKey = `SeawaterDetailsToCart_${this.currentUser.id}_${this.group.id}`;
                window.sessionStorage.setItem(detailsInCartKey, JSON.stringify(this.detailsInCart));
                const totalFreight = this.calculateCartFreight();
                if (item) {
                    try {
                        await this.updateCartAndDetail({
                            cart_id: cartId,
                            bill_detail_id: item.id,
                            bill_detail_num: item.count,
                            group_bill_id: this.group.id,
                            org_bill_detail_num: item.count,
                            sum: cartCount,
                            freight: totalFreight,
                        });
                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        },

        calculateCartFreight() {
            if (this.group.status === 0) {
                this.totalFreight = this.cart.freight;
            } else {
                let totalFreight = 0;
                for (let detail of this.detailsInCart) {
                    if (this.group.top_freight) {
                        totalFreight += Math.min(detail.price * this.group.freight, this.group.top_freight) * detail.count;
                    } else {
                        totalFreight += (detail.count * detail.price) * this.group.freight;
                    }
                }
                this.totalFreight = Math.round(totalFreight * 100) / 100;
            }

            return this.totalFreight;
        },

        validSubmit() {
            if (!this.phone) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请填写联系电话'
                });
                return false;
            } else if (!RegExp.PhoneReg.test(this.phone)) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请填写正确的联系电话'
                });
                return false;
            }
            return true;
        }
    },

    watch: {
        'detailsInCart'() {
            this.calculateCartCount();
            this.updateDetailsImg();
        }
    }
};