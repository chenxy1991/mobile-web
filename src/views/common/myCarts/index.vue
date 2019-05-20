<template>
    <div class="my-carts-container">
        <div class="header">
            <div @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
            </div>
            <div class="name">
                <span class="f16">我的购物车</span>
            </div>
            <span></span>
        </div>
        <scroller :on-refresh="handleDataRefresh">
            <div class="block">
                <div class="no-tips" v-if="carts&&carts.length===0">
                    空空如也，<a href="javascript: void(0);" @click="handleActions(null, 'main')">去看看热团吧~~~</a>？
                </div>
                <div class="block-content" v-else v-for="cart in carts" :key="cart.id"
                     @click="handleActions(cart, 'cartDetail')">
                    <div class="content-main group-content-main">
                        <div class="avatar">
                            <img :src="cart.userAvatar" alt="同省商家头像">
                        </div>
                        <div class="info">
                            <div class="info-item">
                                <span v-if="cart.group_status===1" class="group-status f11">热团中</span>
                                <span class="group-status group-status-disabled f11" v-else>已结束</span>
                                <span>
                                    <icon class="el-icon-coral-naozhong f12"></icon>
                                    <span class="f12 c999">{{cart.insert_format_date}}购买</span>
                                </span>
                            </div>
                            <div class="info-item">
                                <span class="group-name f15">{{cart.group_name}}</span>
                                <icon class="el-icon-coral-empty f18" v-if="cart.group_status===1"
                                      @click.stop="handleDeleteCart(cart)"></icon>
                            </div>
                            <div class="info-item">
                                <span>
                                    <icon class="el-icon-coral-caiwu-xianxing f12"></icon>
                                    <span class="f12 c999">{{cart.sum + cart.freight}}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
