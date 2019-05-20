<template>
    <div class="user-carts-container">
        <div class="header">
            <div @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
            </div>
            <div class="name">
                <span class="f16">{{group.name}}的订单</span>
            </div>
            <span></span>
        </div>
        <scroller :on-refresh="handleDataRefresh">
            <div class="block">
                <div class="no-tips" v-if="cartList&&cartList.length===0">
                    空空如也~~~
                </div>
                <div v-else>
                    <div style="padding: 0.1rem 0.1rem 0; margin: 0 auto;">
                        <step v-model="group.current_step" background-color='#fbf9fe' gutter="5px">
                            <step-item title="支付"></step-item>
                            <step-item title="缺货"></step-item>
                            <step-item title="报损"></step-item>
                            <step-item title="完成"></step-item>
                        </step>
                    </div>
                    <div class="block-content" v-for="cart in cartList" :key="cart.id">
                        <div class="content-main cart-content-main">
                            <div class="avatar" @click="handleActions(cart, 'cartItems')">
                                <img :src="cart.userAvatar" alt="用户头像">
                            </div>
                            <div class="info">
                                <div class="info-item">
                                    <span class="f14 c666">{{cart.user_name}}</span>
                                    <span>
                                        <icon class="el-icon-coral-mobilephone_fill f12 c999"></icon>
                                        <a class="f12 c999" :href="cart.telTo">{{cart.phone}}</a>
                                    </span>
                                </div>
                                <div class="info-item">
                                    <span>
                                        <icon class="el-icon-coral-naozhong f12"></icon>
                                        <span class="f12 c999">购买于{{mapDate(cart.insert_date)}}</span>
                                    </span>
                                </div>
                                <div class="info-item" @click="handleActions(cart, 'cartItems')">
                                    <span>
                                        <icon class="el-icon-coral-caiwu-xianxing f12"></icon>
                                        <span class="f12 c999">
                                            <span>应收款<span style="color: #ee735c;">￥{{cart.sum + cart.freight}}</span></span>
                                            <span style="font-size: 10px;">(含运费<span style="color: #ee735c;">￥{{cart.freight}}</span>)</span>
                                        </span>
                                    </span>
                                </div>
                                <div class="info-item" v-if="group.current_step===0">
                                    <span></span>
                                    <div @click="handleActions(cart, 'changeHasPay')" v-if="group.current_step===0">
                                        <check-icon :value.sync="cart.is_pay">
                                            <span v-if="cart.is_pay===2" style="color: #ee735c;">有变动</span>
                                            <span v-if="cart.is_pay" style="color: #ee735c;">已付款</span>
                                            <span v-if="!cart.is_pay">未付款</span>
                                        </check-icon>
                                    </div>
                                </div>
                                <div v-if="group.current_step!==0">
                                    <span class="f12 c999" style="display: flex; flex-direction: row;">
                                        <icon class="el-icon-coral-caiwu-xianxing f12"></icon>
                                        <span style="margin-left:4px; display: flex; flex-direction: row;">
                                            <span>应退款<span style="color: #ee735c">￥{{cart.lost_back + cart.damage_back}}</span></span>
                                            <popover placement="right">
                                                <span slot="content" class="popover-demo-content">
                                                    <div v-if="cart.lost_back">
                                                        <span style="color: #fff;">缺货应退款<span>￥{{cart.lost_back}}</span></span>
                                                    </div>
                                                    <div v-if="cart.damage_back" style="margin-top: 3px;">
                                                        <span style="color: #fff;">报损应退款<span>￥{{cart.damage_back}}</span></span>
                                                    </div>
                                                </span>
                                                <button>
                                                    <icon class="el-icon-coral-feedback f16 c999"></icon>
                                                </button>
                                            </popover>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <x-switch></x-switch>
                    <div style="padding: 0.1rem;">
                        <flexbox>
                            <flexbox-item v-if="group.current_step!==0">
                                <x-button type="default" @click.native="handleActions({}, 'preStep')">上一步</x-button>
                            </flexbox-item>
                            <flexbox-item>
                                <x-button type="primary" @click.native="handleActions({}, 'nextStep')">
                                    <span v-if="group.current_step!==4">下一步</span>
                                    <span v-else>回首页</span>
                                </x-button>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
