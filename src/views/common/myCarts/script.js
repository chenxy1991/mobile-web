import {mapActions} from 'vuex';
import {AvatarBasePath} from '../../../constants/index';

export default {
    data() {
        return {
            currentUserId: parseInt(window.localStorage.getItem('SeawaterLoginUserId')),
            carts: undefined
        };
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
            'getCartsByUserId',
            'deleteCartById'
        ]),

        async initData() {
            const result = await this.getCartsByUserId({
                page: 1,
                size: 1000,
                userId: this.currentUserId
            });
            this.carts = result.res || [];
            for (let cart of this.carts) {
                this.$set(cart, 'userAvatar', `${AvatarBasePath}?id=${cart.user_id}`);
            }
        },

        handleActions(item, actionType) {
            switch (actionType) {
                case 'main':
                    window.sessionStorage.setItem('SeawaterTabActiveIndex', 2);
                    window.sessionStorage.setItem('SeawaterGroupTabActive', 'group');
                    this.$router.push('/');
                    break;
                case 'cartDetail':
                    this.$router.push({
                        name: actionType,
                        params: {
                            cartId: item.id,
                            groupId: item.group_id
                        }
                    });
                    break;
                case 'return':
                    this.$router.push('/');
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
                title: '确认删除',
                content: '确定删除购物车吗？',
                onConfirm: async () => {
                    const result = await this.deleteCartById({
                        id: cart.id,
                    });
                    if (result.status === 'ok') {
                        this.$vux.toast.show({
                            type: 'success',
                            text: `删除购物车成功`
                        });
                        this.initData();
                    }
                }
            });
        }
    }
};