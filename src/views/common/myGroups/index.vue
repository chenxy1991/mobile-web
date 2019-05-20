<template>
    <div class="my-groups-container">
        <div class="header">
            <div @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
                <span class="f16" style="position: relative; top: -2px;">返回</span>
            </div>
            <div class="name">
                <span class="f16">我开的团购</span>
            </div>
            <div @click="handleActions({}, 'index')">
                <span class="f16" style="position: relative; top: -2px;">去首页</span>
                <icon class="el-icon-coral-enter f20"></icon>
            </div>
        </div>
        <scroller :on-refresh="handleDataRefresh">
            <div class="block">
                <div class="no-tips" v-if="groups&&groups.length===0">
                    空空如也，<a href="javascript: void(0);" @click="handleActions(null, 'main')">去开一个</a>？
                </div>
                <div class="block-content" v-else v-for="group in groups" :key="group.id"
                     @click="handleActions(group, 'userCarts')">
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
                                <span>
                                    <img src="../../../assets/download.svg"
                                         class="download"
                                         @click.stop="handleDownload(group)"
                                    />
                                </span>
                            </div>
                            <div class="info-item">
                                <span class="group-name f15">
                                    {{group.name}}
                                    <icon v-if="group.status===1"
                                          class="el-icon-coral-editor f18"
                                          @click.stop="handleEditGroup(group)">
                                    </icon>
                                </span>
                                <icon class="el-icon-coral-lock f20"
                                      v-if="group.status===1"
                                      @click.stop="handleFinishGroup(group)"
                                ></icon>
                                <icon class="el-icon-coral-unlock f20"
                                      @click.stop="handleReopenGroup(group)"
                                      v-else
                                ></icon>
                            </div>
                            <div class="info-item">
                                <span>
                                    <icon class="el-icon-coral-people f12 c999"></icon>
                                    <span class="f12 c999">{{group.supplierName}}</span>
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
        </scroller>
    </div>
</template>
<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
