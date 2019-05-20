import {mapActions} from 'vuex';
import {Group, GroupTitle, XButton, XInput, PopupPicker, XTextarea} from 'vux';
import {AvatarBasePath, TaobaoQrBasePath, WechatQrBasePath} from '../../../constants/index';
import {isEmpty, toFormData} from '../../../util/common';
import RegExp from "../../../constants/regExp";

const ImageBasePath = {
    avatar: AvatarBasePath,
    taobao: TaobaoQrBasePath,
    wechat: WechatQrBasePath
};

export default {
    data() {
        return {
            currentUserId: parseInt(window.localStorage.getItem('SeawaterLoginUserId')),
            user: {},
            isSeller: false,
            avatarImgPath: '',
            taobaoImgPath: '',
            wechatImgPath: '',
            chinaCities: [],
            nowCity: []
        };
    },

    components: {
        Group,
        GroupTitle,
        XButton,
        XInput,
        PopupPicker,
        XTextarea
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
            'getUserById',
            'getUserAvatar',
            'uploadUserAvatar',
            'uploadPayQrCode',
            'getChinaCities',
            'updateUser'
        ]),

        async initData() {
            const userEditing = (await this.getUserById({id: this.currentUserId}))[0];
            this.user = Object.assign({}, userEditing, {
                point: userEditing.point ? userEditing.point : '0',
                address: isEmpty(userEditing.address) ? '' : userEditing.address,
                contacts: isEmpty(userEditing.contacts) ? '' : userEditing.contacts,
                description: isEmpty(userEditing.description) ? '' : userEditing.description,
            });
            this.avatarImgPath = `${AvatarBasePath}?id=${this.currentUserId}&r=${Math.random()}`;
            if (this.user.pay_type === 'zfb') {
                this.taobaoImgPath = `${TaobaoQrBasePath}?id=${this.currentUserId}&r=${Math.random()}`;
            } else {
                this.wechatImgPath = `${WechatQrBasePath}?id=${this.currentUserId}&r=${Math.random()}`;
            }
            this.isSeller = ['pfs', 'lss'].includes(this.user.type);
            this.chinaCities = await this.getChinaCities();
            this.nowCity = [this.user.province, this.user.city];
        },

        handleActions(item, actionType) {
            switch(actionType) {
                case 'return':
                    this.$router.back();
                    break;
                case 'wx':
                case 'zfb':
                    this.user.pay_type = actionType;
                    break;
                default:
                    break;
            }
        },

        async upload(e, which) {
            const file = (e.target || e.dataTransfer).files[0];
            if (!file) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请选择需要上传的图片'
                });
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: `上传图片不能超过2M`
                });
                return;
            }
            const fileType = file.type.substring(file.type.indexOf('/') + 1).toUpperCase();
            if (['BMP', 'JPG', 'JPEG', 'PNG', 'GIF'].indexOf(fileType) === -1) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: `上传文件不是图片`
                });
                return;
            }

            this.$vux.loading.show({
                text: '努力加载中'
            });
            let result = {};
            if (which === 'avatar') {
                result = await this.uploadUserAvatar({
                    formData: toFormData({
                        img: file,
                        id: this.currentUserId
                    }),
                });
            } else {
                result = await this.uploadPayQrCode({
                    formData: toFormData({
                        img: file,
                        id: this.currentUserId,
                        pay_type: which === 'taobao' ? 'zfb' : 'wx'
                    }),
                });
            }
            this.$vux.loading.hide();

            if (result.status === 'ok') {
                this[`${which}ImgPath`] = `${ImageBasePath[which]}?id=${this.currentUserId}&r=${Math.random()}`;
                this.$vux.toast.show({
                    type: 'success',                    
                    text: `上传成功`
                });
            }
        },

        async handleSubmit() {
            if (!this.validSubmit()) {
                return;
            }
            const sendInfo = Object.assign({}, this.user, {
                province: this.nowCity[0],
                city: this.nowCity[1]
            });

            delete sendInfo.cityName;
            delete sendInfo.pay_type;
            delete sendInfo.password;

            this.$vux.loading.show({
                text: '努力加载中'
            });
            const result = await this.updateUser(sendInfo);
            this.$vux.loading.hide();

            if (result.status === 'ok') {
                this.$vux.toast.show({
                    type: 'success',                    
                    text: `更新成功`
                });
            }
        },

        validSubmit() {
            if (!this.user.phone) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请填写联系电话'
                });
                return false;
            } else if (!RegExp.PhoneReg.test(this.user.phone)) {
                this.$vux.toast.show({
                    type: 'warn',
                    text: '请填写正确的联系电话'
                });
                return false;
            }
            if (this.nowCity.length < 2 || !this.nowCity[0] || !this.nowCity[1]) {
                this.$vux.toast.text('请选择所在城市');
                return false;
            }

            return true;
        }
    }
};