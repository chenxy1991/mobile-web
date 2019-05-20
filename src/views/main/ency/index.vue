<template>
    <div class="ency-tab-container">
        <div style="height: 44px">
            <search
                 v-model="searchText"
                 position="absolute"
                 auto-scroll-to-top
                 @on-change="handleSearchChange"
                 @on-focus="handleActions({}, 'encySearch')"
                 @on-cancel="handleActions({}, 'encySearchCancel')"
            >
            </search>
        </div>
        <div class="nav" v-if="!searching">
            <tab class="tab-container" bar-active-color="#28b1ea" active-color="#28b1ea">
                <tab-item :selected="activeTab==='tj'" @on-item-click="handleTabItemClick('tj')">
                    <div class="tab-item-container">
                        <span class="text f13">热门推荐</span>
                    </div>
                </tab-item>
                <tab-item :selected="activeTab==='hy'" @on-item-click="handleTabItemClick('hy')">
                    <div class="tab-item-container">
                        <span class="text f13">海水鱼</span>
                    </div>
                </tab-item>
                <tab-item :selected="activeTab==='rt'" @on-item-click="handleTabItemClick('rt')">
                    <div class="tab-item-container">
                        <span class="text f13">软体珊瑚</span>
                    </div>
                </tab-item>
                <tab-item :selected="activeTab==='yg'" @on-item-click="handleTabItemClick('yg')">
                    <div class="tab-item-container">
                        <span class="text f13">硬骨珊瑚</span>
                    </div>
                </tab-item>
                <tab-item :selected="activeTab==='qt'" @on-item-click="handleTabItemClick('qt')">
                    <div class="tab-item-container">
                        <span class="text f13">其他</span>
                    </div>
                </tab-item>
            </tab>
        </div>
        <div class="ency-list" :class="{mT40 : !searching}">
            <div class="types" v-if="!searching">
                <div class="type f12" :class="{'type-active': activeTypes[activeTab]===type.code}" v-for="type in types"
                     :key="type.code" @click="handleTypeChange(type)">
                    {{type.name}}
                </div>
            </div>
            <div class="block">
                <load-more tip="努力加载中" v-if="!encyList"></load-more>
                <div class="block-content" v-for="item in encyList" :key="item.id">
                    <div class="content-main ency-content-main">
                        <div class="pic">
                            <img :src="item.encyImage" @click="handleActions(item, 'encyDetail')">
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
