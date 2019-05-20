<template>
    <div class="register-block">
        <div class="register f13 box-sizing p-l-20 p-r-20 clearfix">
            <input class="box-sizing input m-t-9 m-b-9 f14" placeholder="请输入用户名"
                   v-model="registerForm.name" @blur="handleCheckName"
            />
            <input type="password" class="box-sizing input m-b-9 f14" minlength="6"
                   maxlength="20" placeholder="请输入密码(8-20位)"
                   v-model="registerForm.password1"
            />
            <input type="password" class="box-sizing input m-b-9 f14" minlength="6"
                   maxlength="20" placeholder="请再次输入密码"
                   v-model="registerForm.password2"
            />
            <div style="position: relative">
                <input class="box-sizing input m-b-9 f14 phone-input" minlength="11" maxlength="11"
                       placeholder="请输入手机号" v-model="registerForm.phone"
                />
                <button class="verify-code-btn" :disabled="countDown.isStart"
                        @click.prevent.stop="sendVerifyCode">
                    <CountDown
                            :is-start="countDown.isStart"
                            :seconds="120"
                            initContent="获取短信验证码"
                            afterContent="重新获取验证码"
                            :on-count-end="handleCountEnd"
                    >
                    </CountDown>
                </button>
            </div>
            <input class="box-sizing input m-b-9 f14" minlength="4" maxlength="4"
                   placeholder="请输入短信验证码" v-model="registerForm.auth"
            />
            <button v-if="registerEnabled" class="btn btn-default btn-large" @click="handleRegister">
                立即注册
            </button>
            <button class="btn btn-large btn-disabled" v-else>
                立即注册
            </button>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import CountDown from './CountDown.vue';
    import RegExp from '../constants/regExp';

    export default {
        name: 'Register',

        data () {
            return {
                registerForm: {
                    name: '',
                    phone: '',
                    password1: '',
                    password2: '',
                    auth: ''
                },
                registerEnabled: true,
                countDown: {
                    isStart: false
                },
                requestId: ''
            };
        },

        components: {
            CountDown
        },

        methods: {
            ...mapActions([
                'checkUsername',
                'sendVerification',
                'register'
            ]),

            async handleCheckName(e) {
                try {
                    await this.checkUsername({
                        name: e.target.value
                    });
                } catch (error) {
                    console.error(error);
                }
            },

            handleCountEnd() {
                this.countDown.isStart = false;
            },

            async sendVerifyCode() {
                if (!this.validSendCode()) {
                    return;
                }

                this.$vux.loading.show({
                    text: '短信发送中'
                });
                let result = {};
                try {
                    result = await this.sendVerification({
                        phone: this.registerForm.phone
                    });
                } catch (error) {
                    console.error(error);
                }
                this.$vux.loading.hide();

                if (result.status === 'ok') {
                    this.requestId = result.requestId;
                    this.$vux.toast.show({
                        type: 'success',
                        text: '发送短信验证码成功，请查收'
                    });
                    this.countDown.isStart = true;
                } else {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '发送短信验证码失败，请稍后重试'
                    });
                }
            },

            async handleRegister() {
                if (!this.validRegister()) {
                    return;
                }

                this.$vux.loading.show({
                    text: '努力加载中'
                });
                let result = {};
                try {
                    result = await this.register({
                        ...this.registerForm,
                        requestId: this.requestId
                    });
                } catch (error) {
                    console.error(error);
                }
                this.$vux.loading.hide();

                if (result.status === 'ok') {
                    this.$vux.toast.show({
                        type: 'success',
                        text: '注册成功，请登录'
                    });
                    this.$emit('toLogin');
                }
            },

            validSendCode() {
                const {name, password1, password2, phone} = this.registerForm;

                if (!name) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '用户名不能为空'
                    });
                    return false;
                }
                if (!password1) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '密码不能为空'
                    });
                    return false;
                }
                if (!password2) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '确认密码不能为空'
                    });
                    return false;
                }
                if (password1 !== password2) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '两次输入密码不同'
                    });
                    return false;
                }
                if (!phone) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '手机号不能为空'
                    });
                    return false;
                } else if (!RegExp.PhoneReg.test(phone)) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '请填写正确的手机号'
                    });
                    return false;
                }

                return true;
            },

            validRegister() {
                const {name, phone, password1, password2, auth} = this.registerForm;

                if (!name) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '用户名不能为空'
                    });
                    return false;
                }
                if (!password1) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '密码不能为空'
                    });
                    return false;
                }
                if (!password2) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '确认密码不能为空'
                    });
                    return false;
                }
                if (password1 !== password2) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '两次输入密码不同'
                    });
                    return false;
                }
                if (!phone) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '手机号不能为空'
                    });
                    return false;
                } else if (!RegExp.PhoneReg.test(phone)) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '请填写正确的手机号'
                    });
                    return false;
                }
                if (!auth) {
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '短信验证码不能为空'
                    });
                    return false;
                }

                return true;
            }
        }
    };
</script>
<style lang="less">
    .register-block {
        background-color: #fff;
        border-radius: 8px;
        margin-bottom: 34px;
        .register {
            color: #7b7b7b;
            .verify-code-btn {
                position: absolute;
                right: 0;
                top: 0;
                width: 40%;
                height: 38px;
                line-height: 38px;
                background-color: #20a0ff;
                color: #fff;
                padding: 0 5px;
                border-radius: 5px;
                text-decoration: none;
                border: none;
                cursor: pointer;
                outline: none;
                &:disabled {
                    background-color: #999;
                }
            }
            .phone-input {
                width: 55%;
            }
            .btn-default {
                background: linear-gradient(#0099E8, #027FF3);
                background-color: #027FF3;
                color: #fff;
                line-height: 44px;
            }
            .btn-large {
                width: 100%;
                height: 40px;
                line-height: 40px;
            }
            .btn-disabled {
                background-color: #CCC;
            }
        }
        .input {
            height: 40px;
            background-color: #f3f4f5;
            color: #027FF3;
            padding: 0 15px;
            border-radius: 4px;
        }
        .input:focus {
            border-color: #027FF3;
        }
    }
</style>
