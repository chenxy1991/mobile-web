import {mapActions} from 'vuex';
import {Group, Cell, Datetime, Selector, InlineXNumber, InlineXSwitch, PopupPicker} from 'vux';

export default {
    data() {
        const today = new Date();
        return {
            group: {},
            cities: [],
            curProvince: window.localStorage.getItem('SeawaterCurProvince') || 'sh',
            startDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            form: {
                name: undefined,
                contacts: undefined,
                phone: undefined,
                end_date: undefined,
                city: undefined,
                freight: 13,
                hasTop: false,
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
        const cities = await this.getCitiesInProvinces({
            area: curProvince
        });
        for (let city of cities) {
            this.cities.push({
                key: city.name,
                value: city.value
            });
        }

        this.group = (await this.getGroupById({id}))[0];
        this.form.name = this.group.name;
        this.form.contacts = this.group.contacts;
        this.form.phone = this.group.phone;
        this.form.end_date = this.group.end_date.split(":00")[0];
        this.form.city = this.group.city;
        this.form.freight = (this.group.freight * 100).toFixed();
        this.form.hasTop = !!this.group.top_freight;
        this.form.top_freight = this.group.top_freight;
        this.form.description = this.group.description;
    },

    mounted() {
        const ele = document.getElementById('loading');
        ele.style.display = 'none';
    },

    methods: {
        ...mapActions([
            'getGroupById',
            'getCitiesInProvinces',
            'updateGroupDescription',
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
            const needValid = ['name', 'contacts', 'phone', 'end_date', 'city'];
            const message = ['团单名', '联系人姓名', '联系人手机', '截止时间', '开团城市'];

            for (let i = 0; i < needValid.length; i++) {
                if (!this.form[needValid[i]]) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: `请完善${message[i]}`
                    });
                    return;
                }
            }

            this.$vux.loading.show({
                text: '努力加载中'
            });
            const result = await this.updateGroupDescription({
                id: this.group.id,
                user_id: parseInt(window.localStorage.getItem('SeawaterLoginUserId')),
                description: this.form.description
            });
            this.$vux.loading.hide();

            if (result.status === 'ok') {
                this.$vux.toast.show({
                    type: 'success',
                    text: `编辑${this.form.name}成功`
                });
                this.$router.back();
            }
        }
    }
};