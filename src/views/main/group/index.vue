<template>
    <div class="group-tab-container">
        <scroller :on-refresh="handleDataRefresh">
            <div class="button-tab">
                <button-tab :height="35">
                    <button-tab-item :selected="active==='group'" @on-item-click="handleTabItemChange('group')">
                        同省热团
                    </button-tab-item>
                    <button-tab-item :selected="active==='bill'" @on-item-click="handleTabItemChange('bill')">
                        最新出单
                    </button-tab-item>
                </button-tab>
            </div>
            <load-more tip="努力加载中" v-if="!groups||!bills"></load-more>
            <div class="block" v-if="active==='group'">
                <div class="block-content"
                     v-for="group in (groupsInCurProvince.length ? groupsInCurProvince : groups)"
                     :key="group.id" @click="handleActions(group, 'groupDetail')"
                >
                    <div class="content-main group-content-main">
                        <div class="avatar">
                            <img :src="group.userAvatar" alt="同省商家头像">
                        </div>
                        <div class="info">
                            <div class="info-item">
                                <span v-if="group.status===1" class="group-status f11">热团中</span>
                                <span class="group-status group-status-disabled f11" v-else>已结束</span>
                                <span v-if="group.status===1">
                                    <icon class="el-icon-coral-naozhong f12"></icon>
                                    <span class="f12 c999">{{group.end_date}}结束</span>
                                </span>
                            </div>
                            <div class="info-item">
                                <span class="group-name f15">{{group.name}}</span>
                            </div>
                            <div class="info-item">
                                <span>
                                    <icon class="el-icon-coral-people f12 c999"></icon>
                                    <span class="f12 c999">{{group.contacts}}</span>
                                </span>
                                <span>
                                    <icon class="el-icon-coral-coordinates f12 c999"></icon>
                                    <span class="f12 c999">{{group.city}}</span>
                                </span>
                                <span>
                                    <icon class="el-icon-coral-caiwu-xianxing f12"></icon>
                                    <span class="f12 c999">{{group.sum}}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block" v-else>
                <div class="block-content">
                    <div class="content-main bill-content-main" v-for="item in bills" :key="item.id"
                         @click="handleActions(item, 'billDetail')">
                        <div class="bill-first-word" :style="{'background-color': billFirstWordColor[item.id%5]}">
                            <span class="f13">{{item.name[0]}}</span>
                        </div>
                        <div class="info">
                            <span class="bill-name f15">{{item.name}}</span>
                            <span class="upload-time f13">{{item.contacts}}上传于{{item.upload_date.split('T')[0]}}</span>
                        </div>
                        <div class="open-btn" v-if="item.status===1" @click.stop="handleActions(item, 'groupAdd')">
                            <span class="f13">我要开团</span>
                        </div>
                        <div class="open-btn open-btn-disabled" @click.stop="handleActions(item, 'tip')" v-else>
                            <span class="f13">我要开团</span>
                        </div>
                    </div>
                </div>
            </div>
        </scroller>
        <alert v-model="showTip" title="亲，" :content="`${currentItem.name}已结束，逛逛其他的吧~~~`"></alert>
    </div>
</template>
<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
