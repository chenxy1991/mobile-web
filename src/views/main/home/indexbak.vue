<template>
<div class="home-container">
  <scroller :on-refresh="handleDataRefresh">
    <swiper loop auto :aspect-ratio="306/750" interval="6000">
      <swiper-item v-for="(item, index) in list" :key="index">
        <img :src="item.img" @click="handleSwiperImageClick(item)" style="background-color: rgb(76, 130, 193);">
                </swiper-item>
    </swiper>
    <!--  <div class="tab-icons">
      <div v-for="(item, index) in list" :key="index" class="tab-icon" v-model="index" @click="handleActions({}, 'cityComm')">
        <img src="../../../assets/tabIcon/gdzz.png" alt="各地交流">
        <badge  text="11" class="item-badge"></badge>
        <span class="f12">各地交流</span>
      </div>
    </div> -->
    <div class="tab-icons">
      <div class="tab-icon" @click="handleActions({}, 'cityComm')">
        <badge text="1" class="item-badge"></badge>
        <img src="../../../assets/tabIcon/gdzz.png" alt="各地交流">
        <span class="f12">各地交流</span>
      </div>
      <div class="tab-icon" @click="handleActions({}, 'fishStores')">
        <img src="../../../assets/tabIcon/ydlb.png" alt="鱼店列表">
        <span class="f12">鱼店列表</span>
      </div>
      <div class="tab-icon" @click="handleActions({}, 'coopStores')">
        <img src="../../../assets/tabIcon/hzsj.png" alt="合作商家">
        <span class="f12">合作商家</span>
      </div>
      <div class="tab-icon" @click="handleActions({}, 'groupHelp')">
        <img src="../../../assets/tabIcon/tggz.png" alt="团购规则">
        <span class="f12">团购帮助</span>
      </div>
    </div>
    <div class="tab-icons">
      <div class="tab-icon" @click="handleActions({}, 'todoLists')">
        <img src="../../../assets/tabIcon/gdzz.png" alt="各地交流">
        <span class="f12">待办列表</span>
      </div>
      <div class="tab-icon" @click="handleActions({}, 'fishStores')">
        <img src="../../../assets/tabIcon/ydlb.png" alt="鱼店列表">
        <span class="f12">鱼店列表</span>
      </div>
      <div class="tab-icon" @click="handleActions({}, 'coopStores')">
        <img src="../../../assets/tabIcon/hzsj.png" alt="合作商家">
        <span class="f12">合作商家</span>
      </div>
      <div class="tab-icon" @click="handleActions({}, 'groupHelp')">
        <img src="../../../assets/tabIcon/tggz.png" alt="团购规则">
        <span class="f12">团购帮助</span>
      </div>
    </div>
    <div class="block">
      <div class="block-title vux-1px-b">
        <span class="title-text f16 ">&nbsp;&nbsp;&nbsp;&nbsp;所有待办</span>
        <span class="title-text f16 vux-1px-r">  共17条</span>
        <span class="title-text f16 vux-1px-r">&nbsp;&nbsp;排序&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="title-text f16">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;筛选</span>
        <span class="cart" @click="handleActions({}, 'search')">
                搜索<icon class="el-icon-coral-search"></icon>
            </span>
      </div>
      <load-more tip="努力加载中" v-if="encyList.length === 0"></load-more>
      <div class="block-content" v-for="item in encyList" :key="item.id" @click="handleActions(item, 'encyDetail')">
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
    </div>
  </scroller>
  <group>
    <popup-picker :show.sync="showProvincesPicker" :show-cell="false" :data="provinces" :columns="2" @on-change="handleProvinceChange" v-model="curProvince">
    </popup-picker>
  </group>
  <x-dialog v-model="showNotice">
    <div>
      <img :src="showNoticeImage" style="max-width:100%">
            </div>
      <div class="dialog-read-btn">
        <x-button mini type="warn" @click.native="handleHasReadNotice">已阅读并关闭</x-button>
      </div>
  </x-dialog>
  <x-dialog v-model="showAd">
    <div>
      <img :src="showAdImage" style="max-width:100%">
            </div>
      <div class="dialog-read-btn">
        <x-button mini type="warn" @click.native="handleAdDialog">关闭</x-button>
      </div>
  </x-dialog>
</div>
</template>

<script src="./script.js"></script>

<style lang="less" src="./style.less"></style>
