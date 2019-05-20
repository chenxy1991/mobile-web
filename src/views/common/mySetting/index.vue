<template>
    <div class="my-setting-container">
        <div class="header">
            <div @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
            </div>
            <div class="name">
                <span class="f16">我的设置</span>
            </div>
            <span></span>
        </div>
        <div class="user-name">
            <div class="name-title f14">
                <span class="rect"></span>
                <span>昵称</span>
            </div>
            <div>{{user.name}}</div>        
        </div>
        <div>
            <group>
                <group-title slot="title" class="group-title">
                    <span>
                        <span class="rect"></span>
                        <span>头像</span>
                    </span>
                </group-title>
                <div class="img-uploader">
                    <label class="uploader-wrap">
                        <input type="file" @change="upload($event, 'avatar')"/>
                        <icon class="el-icon-coral-add"></icon>
                        <img :src="avatarImgPath" v-if="avatarImgPath">
                    </label>
                </div>
            </group>
            <group>
                <group-title slot="title" class="group-title">
                    <span>
                        <span class="rect"></span>
                        <span>支付二维码</span>
                    </span>
                    <div>
                        <img :src="require('../../../assets/weixin_on.png')" v-if="user.pay_type==='wx'">
                        <img :src="require('../../../assets/weixin_off.png')" v-else @click="handleActions({}, 'wx')">
                        <img :src="require('../../../assets/zhifubao_on.png')" v-if="user.pay_type==='zfb'">
                        <img :src="require('../../../assets/zhifubao_off.png')" v-else @click="handleActions({}, 'zfb')">
                    </div>
                </group-title>
                <div class="img-uploader">
                    <label class="uploader-wrap" v-if="user.pay_type==='zfb'">
                        <input type="file" @change="upload($event, 'taobao')"/>
                        <icon class="el-icon-coral-add"></icon>
                        <img :src="taobaoImgPath" v-if="taobaoImgPath">
                    </label>
                    <label class="uploader-wrap" v-else>
                        <input type="file" @change="upload($event, 'wechat')"/>
                        <icon class="el-icon-coral-add"></icon>
                        <img :src="wechatImgPath" v-if="wechatImgPath">
                    </label>
                </div>
            </group>
            <group>
                <group-title slot="title" class="group-title">
                    <span>
                        <span class="rect"></span>
                        <span>我的信息</span>
                    </span>
                </group-title>
                <x-input title="手机号码" placeholder="请填写手机号码" is-type="china-mobile" v-model="user.phone"></x-input>
                <popup-picker title="所在城市" :data="chinaCities" :columns="2" v-model="nowCity" value-text-align="left" show-name></popup-picker>
                <x-textarea v-if="isSeller" title="详细地址" placeholder="请填写详细地址" :rows="3" v-model="user.address"></x-textarea>
                <x-input v-if="isSeller" title="联系人名" placeholder="请填写联系人名" v-model="user.contacts"></x-input>               
                <x-textarea v-if="isSeller" title="自我介绍" placeholder="请填写自我介绍" :rows="4" v-model="user.description"></x-textarea>
            </group>
            <div style="padding: 0 0.1rem; margin-top: 0.1rem;">
                <x-button type="primary" @click.native="handleSubmit">提交</x-button>
            </div>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
