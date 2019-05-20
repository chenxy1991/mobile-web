<template>
    <div class="ency-detail-container">
        <div class="header">
            <div @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
            </div>
            <div class="name">
                <span class="f16">{{ency.name}}</span>
            </div>
            <span></span>
        </div>
        <scroller :on-refresh="handleDataRefresh">
            <div style="margin-top: 0.55rem">
                <swiper loop auto :list="encyImages"></swiper>
                <!--
                <div class="button-tab">
                    <button-tab :height="35">
                        <button-tab-item selected @on-item-click="handleTabItemChange('description')">
                            <icon class="el-icon-coral-order f15"></icon>
                            <span>生物简介</span>
                        </button-tab-item>
                        <button-tab-item @on-item-click="handleTabItemChange('message')">
                            <icon class="el-icon-coral-message f15"></icon>
                            <span>评论</span><span class="message-count">（27）</span>
                        </button-tab-item>
                        <button-tab-item @on-item-click="handleTabItemChange('share')">
                            <icon class="el-icon-coral-share f15"></icon>
                            <span>分享</span>
                        </button-tab-item>
                    </button-tab>
                </div>
                -->
                <div class="block" v-if="activeTab==='description'">
                    <div class="name f18">{{ency.name}}</div>
                    <div class="tags m-t-10">
                        <div class="tag" v-for="item in (ency.tag || '').trim().split(',')" :key="item">
                            <span class="f10">{{item}}</span>
                        </div>
                    </div>
                    <div class="more m-t-10">
                        <div class="item">
                            <span class="title f10">学名：</span><span class="f10">{{ency.sname}}</span>
                        </div>
                        <div class="item">
                            <span class="title f10">饲养难度：</span>
                            <rater :value="mapLevel(ency.level)" :font-size="10" disabled></rater>
                        </div>
                        <div class="item">
                            <span class="title f10">英文名：</span><span class="f10">{{ency.ename}}</span>
                        </div>
                        <div class="item">
                            <span class="title f10">团购指导价：</span><span class="price f10">￥{{ency.price}}</span>
                        </div>
                    </div>
                    <div class="desc m-t-10 f12">
                        <span v-html="ency.description"></span>
                    </div>
                </div>
            </div>
        </scroller>
        <group>
            <popup-picker
                    :show.sync="showSharePicker" :show-cell="false" confirm-text="确定" :data="shareTypes"
                    :columns="2" @on-change="handleShareTypeChange" @on-hide="handleCloseSharePicker">
            </popup-picker>
        </group>
    </div>
</template>
<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>

