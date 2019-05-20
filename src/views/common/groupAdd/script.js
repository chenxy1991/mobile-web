import {mapActions} from 'vuex';
import {Group, Cell, Datetime, Selector, InlineXNumber, InlineXSwitch, PopupPicker} from 'vux';
import {formatDateTimeParam} from '../../../util/date';

export default {
    data() {
        const today = new Date();
        return {
            showDetails: false,
            details: [],
            bill: {},
            cities: [],
            currentUser: {},
            curProvince: window.localStorage.getItem('SeawaterCurProvince') || 'sh',
            startDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            form: {
                name: undefined,
                contacts: undefined,
                phone: undefined,
                end_date: undefined,
                city: undefined,
                freight: 13,
                top_freight: 50,
                description: undefined
            },
            editorOption: {
                placeholder: '请输入',
                modules: {
                    toolbar: [
                        [{'color': []}, { 'background': []}],
                    ]
                }
            }
        };
    },

    components: {
        Group,
        Cell,
        Datetime,
        Selector,
        InlineXNumber,
        InlineXSwitch,
        PopupPicker
    },

    async activated() {
        const {id} = this.$route.params;
        const curProvince = window.localStorage.getItem('SeawaterCurProvince') || 'sh';

        this.bill = (await this.getBillById({id}));
        this.details = await this.getDetailsByBillId({id}) || [];

        this.userInfo =JSON.stringify(window.localStorage.getItem('UserInfo'));
        this.currentUser=this.userInfo.userId;
        this.form.contacts = this.currentUser.name;
        this.form.phone = this.currentUser.phone;
        this.form.city = this.currentUser.city;
        const cities = await this.getCitiesInProvinces({
            area: curProvince
        });
        for (let city of cities) {
            this.cities.push({
                key: city.name,
                value: city.value
            });
        }
    },

    mounted() {
        const ele = document.getElementById('loading');
        ele.style.display = 'none';
    },

    methods: {
        ...mapActions([
            'getDetailsByBillId',
            'getBillById',
            'getUserById',
            'getCitiesInProvinces',
            'addGroupByBillIdAndUserId'
        ]),

        handleActions(item, actionType) {
            switch(actionType) {
                case 'return':
                    this.$router.back();
                    break;
                default:
                    break;
            }
        },

        async submit() {
            const {id} = this.$route.params;
            const needValid = ['name', 'contacts', 'phone', 'end_date', 'city'];
            const message = ['团单名', '联系人姓名', '联系人手机', '截止时间', '开团城市'];
            const curProvince = window.localStorage.getItem('SeawaterCurProvince') || 'sh';

            for (let i = 0; i < needValid.length; i++) {
                if (!this.form[needValid[i]]) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: `请完善${message[i]}`
                    });
                    return;
                }
            }

            const sendInfo = Object.assign({}, this.form, {
                end_date: this.form.end_date ? formatDateTimeParam(this.form.end_date.replace(/-/g, '/')) : '',
                bill_id: id,
                user_id: parseInt(window.localStorage.getItem('SeawaterLoginUserId')),
                province: curProvince,
                freight: this.form.freight / 100,
                top_freight: this.form.hasTop ? this.form.top_freight : undefined
            });
            delete sendInfo.hasTop;
            this.$vux.loading.show({
                text: '努力加载中'
            });
            const result = await this.addGroupByBillIdAndUserId(sendInfo);
            this.$vux.loading.hide();

            if (result.status === 'ok') {
                this.$vux.toast.show({
                    type: 'success',
                    text: `开团${this.form.name}成功`
                });
                window.sessionStorage.setItem('SeawaterTabActiveIndex', 0);
                window.location.href = '/';
            }
        }
    }
};