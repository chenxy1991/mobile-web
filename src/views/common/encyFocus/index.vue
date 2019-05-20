<template>
    <div class="ency-focused-container">
        <div class="header">
            <div @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
            </div>
            <div class="name">
                <span class="f16">关注的生物</span>
            </div>
            <span></span>
        </div>
        <div class="ency-list">
            <div class="block">
                <load-more tip="努力加载中" v-if="!encyList"></load-more>
                <div class="block-content" v-for="item in encyList" :key="item.id"
                     @click="handleActions(item, 'encyDetail')">
                    <div class="content-main ency-content-main">
                        <div class="pic">
                            <img :src="item.encyImage" alt="生物图片">
                        </div>
                        <div class="info">
                            <div class="name-price">
                                <span class="ency-name f15">{{item.name}}</span>
                                <span class="ency-price">
                                    <span class="price-title f12">团购指导价:</span><span class="price-text f12">
                                        ￥{{item.price}}
                                    </span>
                                </span>
                            </div>
                            <div class="tags">
                                <div class="tag" v-for="tag in item.tag.trim().split(',')" :key="tag">
                                    <span class="f10">{{tag}}</span>
                                </div>
                            </div>
                            <div class="others">
                                <rater :value="mapLevel(item.level)" :font-size="10"></rater>
                                <div class="actions">
                                    <!--
                                    <div class="action" @click.stop="handleActions(item, 'share')">
                                        <icon class="el-icon-coral-share f12"></icon>
                                        <img src="../../../assets/others/share.svg" alt="生物分享">
                                        <span class="f12">分享</span>
                                    </div>
                                    <div class="action" @click.stop="handleActions(item, 'comment')">
                                        <icon class="el-icon-coral-message f12"></icon>
                                        <img src="../../../assets/others/comm.svg" alt="生物评论">
                                        <span class="f12">评论(222)</span>
                                    </div>
                                    -->
                                    <div class="action" @click.stop="handleActions(item, 'focus')">
                                        <icon class="el-icon-coral-like_fill f16" :class="{focused: item.isFocused}"></icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
