<template>
    <div class="city-comm-container">
        <div class="header">
            <span @click.stop="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
            </span>
            <span class="f16">各地交流</span>
            <span></span>
        </div>
        <scroller :on-refresh="handleDataRefresh">
            <div class="button-tab">
                <button-tab :height="35">
                    <button-tab-item :selected="active==='qq'" @on-item-click="handleTabItemChange('qq')">
                        本地QQ群
                    </button-tab-item>
                    <button-tab-item :selected="active==='wx'" @on-item-click="handleTabItemChange('wx')">
                        本地团长微信
                    </button-tab-item>
                </button-tab>
            </div>
            <load-more tip="努力加载中" v-if="!QQs||!WXs"></load-more>
            <div class="block" v-if="active==='qq'">
                <div class="block-content" v-for="item in QQs" :key="item.id">
                    <div class="content-main">
                        <div class="avatar">
                            <img :src="item.userAvatar" alt="qq">
                        </div>
                        <div class="info">
                            <div class="info-item">
                                <span class="name f15">
                                    <span>{{item.name}}</span>
                                    <popover placement="right" @on-show="onShow" @on-hide="onHide">
                                        <span slot="content" class="popover-demo-content">
                                            {{item.desc}}
                                        </span>
                                        <button>
                                            <icon class="el-icon-coral-feedback f15 c999"></icon>
                                        </button>
                                    </popover>
                                </span>
                                <span>
                                    <icon class="el-icon-coral-coordinates f12 c999"></icon>
                                    <span class="f12 c999">{{item.province.name}}</span>
                                </span>
                            </div>
                            <div class="info-item">
                                <span>
                                    <icon class="el-icon-coral-label f12 c999"></icon>
                                    <span class="f12 c999">{{item.id}}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block" v-else>
                <div class="block-content" v-for="item in WXs" :key="item.id">
                    <div class="content-main">
                        <div class="avatar">
                            <img :src="item.userAvatar" alt="wx">
                        </div>
                        <div class="info">
                            <div class="info-item">
                                <span class="name f15">
                                    <span>{{item.name}}</span>
                                    <popover placement="right" @on-show="onShow" @on-hide="onHide">
                                        <span slot="content" class="popover-demo-content">
                                            {{item.desc}}
                                        </span>
                                        <button>
                                            <icon class="el-icon-coral-feedback f15 c999"></icon>
                                        </button>
                                    </popover>
                                </span>
                                <span>
                                    <icon class="el-icon-coral-coordinates f12 c999"></icon>
                                    <span class="f12 c999">{{item.province.name}}</span>
                                </span>
                            </div>
                            <div class="info-item">
                                <span>
                                    <icon class="el-icon-coral-label f12 c999"></icon>
                                    <span class="f12 c999">{{item.id}}</span>
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
