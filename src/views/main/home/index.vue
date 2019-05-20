<template>
<div class="home-container">
  <div style="height: 44px" v-if="isSearching==true">
    <search ref="encySearch" v-model="searchText" position="absolute" auto-scroll-to-top @on-change="handleSearchChange" @on-focus="handleActions({}, 'encySearch')" @on-cancel="handleActions({}, 'encySearchCancel')">
    </search>
  </div>
  <div v-else-if="showScreenList == true" class="screen-type-list">
    <div v-show="showTimeInput == true">
      <p>时间区间</p>
      <div style="justify-content: space-around;">
        <input type="number" name="startTime" placeholder="开始时间" /> <i>—</i>
        <input type="number" name="emdTime" placeholder="结束时间" />		</div>
      </div>
      <div v-for="item in screenTypeList" :style="{height:item.height + 'px'}">
        <p>{{item.type}}<span v-show="item.list.length > 3" @click="showAll(item)">全部</span></p>
        <checker v-model="screenChecked" type="checkbox" default-item-class="list-item" selected-item-class="list-item-selected">
          <checker-item v-for="list in item.list" :value="list.id" :key="list.id">
            <div>{{list.name}}</div>
          </checker-item>
        </checker>
      </div>
      <p><span @click="confirmScreen">确定</span><span>|</span><span @click="handelReset">重置</span></p>
    </div>
    <div v-else-if="isSearching==false">
      <swiper loop auto :aspect-ratio="290/748" interval="6000" class="swiper">
        <swiper-item v-for="(item, index) in list" :key="index">
          <img :src="item.img" @click="handleSwiperImageClick(item)" style="background-color: rgb(76, 130, 193);">
          </swiper-item>
      </swiper>
      <div class="tab-fun">
        <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item v-for="item in tabIconList" :key="item.id" :link="{path:item.url}">
            <span class="grid-center">
              <badge v-if="item.badgeValue!=null" :text="item.badgeValue" class="item-badge"></badge>
              <img  slot="icon" style="height:48px;width:48px;margin-bottom:5px;" src="../../../assets/tabIcon/gdzz.png">
              <br>
              <p style='font-size:12px;color: #adadad;'>{{item.title}}</p>
              </span>
          </grid-item>
        </grid>
      </div>
      <div class="nav">
        <sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="0">
          <tab class="tab-container" :line-width="1" bar-active-color="#28b1ea" active-color="#28b1ea">
            <tab-item :selected="activeTab==='hy'" @on-item-click="handleDefault">
              <div class="tab-item-container">
                <span class="text f13">&nbsp;&nbsp;待办</span>
                <span class="f13">共5条</span>
              </div>
            </tab-item>
            <tab-item :selected="activeTab==='sh'" @on-item-click="handleTimeOrder">
              <div class="tab-item-container">
                <span class="text f13">时间排序</span>
                <img class="icon-order" :src="timeOrder.img" ref="timeOrderImg" />
              </div>
            </tab-item>
            <tab-item :selected="activeTab==='qt'" @on-item-click="handleScreen">
              <div class="tab-item-container">
                <span class="text f13">筛选</span>
                <img class="icon-screen" :src="screenType.img" />
              </div>
            </tab-item>
            <tab-item :selected="activeTab==='wfl'" @on-item-click="handleSearch">
              <div class="tab-item-container">
                <span class="text f13">搜索</span>
                <img class="icon-search" :src="search.img" />
              </div>
            </tab-item>
          </tab>
        </sticky>

        <y-scroll :onInfinite="onInfinite">
         <!--  <load-more tip="努力加载中" v-if="!encyList"></load-more> -->
          <div class="block-content items" :class="{pT05Rem: isSearching}" v-if="encyList&&encyList.length!==0" v-for="item in encyList" :key="item.id" @click="handleActions(item, 'todoDetail')">
            <div class="content-main  group-content-main">
              <div class="info">
                <div class="info-item">
                  <span class="f14 info-span-item-title">工单编号 2018081610019882 因系统区域域中心</span>
                </div>
                <div class="info-item">
                  <span>
                    <span class="f12 c999">需求时间管理流程</span>
                  </span>
                  <span>
                    <span class="f12 c999">2018-02-04</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </y-scroll>
      </div>
    </div>
    <div v-if="isSearching==true">
      <div v-if="!searchText&&encyList&&encyList.length===0" class="more-description">
        请输入你搜索条件~~~
      </div>
      <div v-if="searchText&&encyList&&encyList.length===0" class="more-description">
        暂无数据,请输入~~~
      </div>
    </div>
    <div v-if="isSearching==false">
      <div v-if="encyList&&encyList.length===0" class="more-description">
        <divider v-if="encyList.length===0">我的有底线的</divider>
        暂无可购买的生物，请去别处逛逛~~~
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="less" src="./style.less" scoped></style>
