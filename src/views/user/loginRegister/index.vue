<template>
    <div class="user-login-register-container"  v-bind:style="{height: height + 'px' }">
        <!--  <div class="bg-color">
            <img src="../../../../static/images/itsm_logo.png">
        </div> -->
        <img class="login-border" src="../../../../static/images/itsm_logo.png">
        <div style="padding: 0 60px;">
            <tab :line-width="3" custom-bar-width="60px" active-color="#47C9FF">
                <tab-item :selected="index===0" @on-item-click="handleTabItemClick(0)">账号登录</tab-item>
                <tab-item :selected="index===1" @on-item-click="handleTabItemClick(1)">手机登陆</tab-item>
            </tab>
        </div>
        <div v-if="index===0" style="padding: 0 10px">
            <login></login>
        </div>
        <div v-if="index===1" style="padding: 0 10px">
            <register @toLogin="index = 0"></register>
        </div>
        <!--
        <div v-if="index===0" style="padding: 0 10px">
            <div class="btn-and-other">
                <div class="actions">
                    <span class="forget-pass">忘记密码</span>
                    <span>没有账户？<strong @click="handleTabItemClick(1)">注册</strong></span>
                    <span>暂不登录，<strong @click="handleActions({}, 'return')">去首页</strong></span>
                </div>
            </div>
        </div> -->
        <!--<div v-if="index===1" style="padding: 0 10px">
            <div class="btn-and-other">
                 <div class="actions">
                    <span>已有注册账户？<strong @click="handleTabItemClick(0)">登录</strong></span>
                    <span>暂不注册，<strong @click="handleActions({}, 'return')">去首页</strong></span>
                </div>
            </div>
        </div>-->
    </div>
</template>

<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
