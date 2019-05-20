<template>
    <div class="fish-stores-container">
        <div class="header">
            <span @click.stop="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
            </span>
            <span class="f16">鱼店列表</span>
            <span></span>
        </div>
        <scroller :on-refresh="handleDataRefresh">
            <div class="button-tab">
                <button-tab :height="35">
                    <button-tab-item :selected="active==='lss'" @on-item-click="handleTabItemChange('lss')">
                        本地鱼店
                    </button-tab-item>
                    <button-tab-item :selected="active==='pfs'" @on-item-click="handleTabItemChange('pfs')">
                        本地渔场
                    </button-tab-item>
                </button-tab>
            </div>
            <load-more tip="努力加载中" v-if="!LSS||!PFS"></load-more>
            <div class="block" v-if="active==='lss'">
                <div class="block-content" v-for="item in LSS" :key="item.id">
                    <div class="content-main">
                        <div class="avatar">
                            <img :src="item.userAvatar" alt="lss">
                        </div>
                        <div class="info">
                            <div class="info-item">
                                <span class="name f15">{{item.name}}</span>
                                <span>
                                    <icon class="el-icon-coral-coordinates f12 c999"></icon>
                                    <span class="f12 c999">{{item.city_name}}</span>
                                </span>
                            </div>
                            <div class="info-item">
                                <span>
                                    <icon class="el-icon-coral-people f12 c999"></icon>
                                    <span class="f12 c999">
                                        {{item.phone}}
                                        <span v-if="item.contacts && item.contacts.trim()">({{item.contacts}})</span>
                                    </span>
                                </span>
                                <span>
                                    <icon class="el-icon-coral-qrcode f12 c999">二维码</icon>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block" v-else>
                <div class="block-content" v-for="item in PFS" :key="item.id">
                    <div class="content-main">
                        <div class="avatar">
                            <img :src="item.userAvatar" alt="pfs">
                        </div>
                        <div class="info">
                            <div class="info-item">
                                <span class="name f15">{{item.name}}</span>
                                <span>
                                    <icon class="el-icon-coral-coordinates f12 c999"></icon>
                                    <span class="f12 c999">{{item.city_name}}</span>
                                </span>
                            </div>
                            <div class="info-item">
                                <span>
                                    <icon class="el-icon-coral-people f12 c999"></icon>
                                    <span class="f12 c999">
                                        {{item.phone}}
                                        <span v-if="item.contacts && item.contacts.trim()">({{item.contacts}})</span>
                                    </span>
                                </span>
                                <span>
                                    <icon class="el-icon-coral-qrcode f12 c999">二维码</icon>
                                    <span class="f12 c999"></span>
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
