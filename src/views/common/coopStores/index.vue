<template>
    <div class="coop-stores-container">
        <div class="header">
            <span @click.stop="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
            </span>
            <span class="f16">合作商家</span>
            <span></span>
        </div>
        <scroller :on-refresh="handleDataRefresh">
            <div class="button-tab">
                <button-tab :height="35">
                    <button-tab-item :selected="active==='ency'" @on-item-click="handleTabItemChange('ency')">
                        生物批发
                    </button-tab-item>
                    <button-tab-item :selected="active==='equ'" @on-item-click="handleTabItemChange('equ')">
                        设备器材
                    </button-tab-item>
                </button-tab>
            </div>
            <load-more tip="努力加载中" v-if="!encyStores||!equStores"></load-more>
            <div class="block" v-if="active==='ency'">
                <div class="block-content" v-for="item in encyStores" :key="item.id">
                    <div class="content-main">
                        <div class="avatar">
                            <img :src="item.userAvatar" alt="ency">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block" v-else>
                <div class="block-content" v-for="item in equStores" :key="item.id">
                    <div class="content-main">
                        <div class="avatar">
                            <img :src="item.userAvatar" alt="equ">
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
