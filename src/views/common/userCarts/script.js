import {mapActions} from 'vuex';
import {Step, StepItem, Group, XButton, CheckIcon, Flexbox, FlexboxItem, Popover} from 'vux';
import {AvatarBasePath} from '../../../constants/index';

export default {
    data() {
        return {
            currentUserId: parseInt(window.localStorage.getItem('SeawaterLoginUserId')),
            group: {},
            cartList: undefined
        };
    },

    components: {
        Step,
        StepItem,
        Group,
        XButton, 
        CheckIcon,
        Flexbox, 
        FlexboxItem,
        Popover
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
            'getCartByGroupIdAndUserId',
            'deleteCartById',
            'updateCartPay',
            'groupToNextStep',
            'groupBackPreStep'
        ]),

        async initData() {
            const {groupId, userId} = this.$route.params;

            this.group = (await this.getGroupById({id: groupId}))[0] || {};
            this.cartList = await this.getCartByGroupIdAndUserId({
                groupId,
                userId
            });
            for (let cart of this.cartList) {
                this.$set(cart, 'userAvatar', `${AvatarBasePath}?id=${cart.user_id}`);
                this.$set(cart, 'telTo', `tel:${cart.phone}`);
            }
        },

        handleActions(item, actionType) {
            switch (actionType) {
                case 'return':
                    this.$router.back();
                    break;
                case 'delete':
                    this.handleDeleteCart(item);
                    break;
                case 'cartItems':
                    if ([0, 1, 2].includes(this.group.current_step)) {
                        this.$router.push({
                            name: actionType,
                            params: {
                                id: item.id
                            }
                        });
                    }
                    break;
                case 'changeHasPay':
                    this.handleUpdateCartPay(item);
                    break;
                case 'preStep':
                    this.handleBackPreStep();
                    break;
                case 'nextStep':
                    if (this.group.current_step !== 4) {
                        this.handleToNextStep();
                    } else {
                        this.$router.push('/');
                    }
                    break;
                default:
                    break;
            }
        },

        handleDataRefresh(done) {
            this.initData();
            done();
        },

        handleDeleteCart(cart) {
            this.$vux.confirm.show({
                title: '确定删除',
                content: '确定删除该购物车吗？',
                onConfirm: async () => {
                    const result = await this.deleteCartById({
                        id: cart.id,
                    });
                    if (result.status === 'ok') {
                        this.$vux.toast.text('删除成功');
                        this.initData();
                    }
                }
            });
        },

        handleUpdateCartPay(item) {
            this.$nextTick(async () => {
                this.$vux.toast.text('更新中');
                await this.updateCartPay({
                    id: item.id,
                    status: item.is_pay ? 1 : 0
                });
                this.$vux.toast.hide();
            });
        },

        async handleBackPreStep() {
            this.$vux.toast.text('努力加载中');
            const result = await this.groupBackPreStep({
                user_id: this.currentUserId,
                id: this.group.id
            });
            this.$vux.toast.hide();

            if (result.status === 'ok') {
                this.group.current_step--;
            }
        },

        async handleToNextStep() {
            this.$vux.toast.text('努力加载中');
            const result = await this.groupToNextStep({
                user_id: this.currentUserId,
                id: this.group.id
            });
            this.$vux.toast.hide();

            if (result.status === 'ok') {
                this.group.current_step++;
            }
        },

        mapDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
            const day =  date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : (date.getDate() + 1);
            return `${year}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }
    }
};
