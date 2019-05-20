<template>
  <div style="font-size: 1.4rem;background-color: #ffffff;height: 100vh;overflow: auto;margin-bottom: 44px;"
       class="reset-cell">
    <!--头部固定-->
    <header style="position: fixed;top: 0;left: 0;right: 0;z-index: 20;">
      <x-header class="reset-header" :left-options="{backText: '返回'}">部门管理</x-header>
      <search v-model="searchValue" position="absolute" auto-scroll-to-top placeholder="输入部门名称、成员名称" top="46px"
              ref="search"></search>
    </header>
    <section style="margin-top: 90px;">
      <!--tabbar-->
      <aside style="background-color: #ffffff;">
        <!--已选标题栏-->
        <div class="weui-cell vux-tap-active weui-cell_access vux-cell-no-border-intent">
          <div class="vux-cell-bd vux-cell-primary ellipsy">
            <span @click="returnMain">主目录</span><span v-for="(item,idx) in chooseList" :key="idx"
                                                      @click="returnPrew(item)"> > {{item.name}}</span>
          </div>
          <div class="weui-cell__ft vux-cell-arrow-transition" @click="showAll = !showAll"
               :class="showAll?'vux-cell-arrow-up':'vux-cell-arrow-down'"></div>
        </div>
        <!--弹出已点击标题栏-->
        <div class="slide" :class="showAll?'animate':''">
          <div style="background-color: #ffffff;padding: 0 15px;line-height: 42px;">
            <span @click="returnMain">主目录 </span><span v-for="(item,idx) in chooseList" :key="idx"
                                                       @click="returnPrew(item)"> > {{item.name}}</span>
          </div>
        </div>
      </aside>
      <aside>
        <ul>
          <li class="no-select-li"><img src="../../../../assets/img/man.png" alt="">人员</li>
          <li class="no-select-li"><img src="../../../../assets/img/config.png" alt="">下级组织</li>
        </ul>
      </aside>
      <!--列表选项-->
      <template v-if="showList">
        <div style="border-bottom: 1px solid #e5e5e5;">
          <cell-box v-for="(item,idx) in checkerList" :key="idx" class="sub-item" is-link
                    @click.native="checkListItem(item)">{{item.name}}
          </cell-box>
        </div>
      </template>
      <!--tab选项-->
      <template v-if="showTab">
        <div style="margin: 10px">
          <checker
                  v-model="checkerItem"
                  type="checkbox"
                  default-item-class="check-item"
                  selected-item-class="check-item-selected">
            <checker-item v-for="(item,idx) in checkerTabList" :key="idx" :value="item">{{item.name}}</checker-item>
          </checker>
        </div>
      </template>
      <footer class="foot-style">
        <cell :title="'已选['+checkerItem.length+']'"
              style="width: 70px;max-width: 100px;display: inline-block;color: #ff7900" is-link :border-intent="false"
              :arrow-direction="showChooseAll ? 'down' : 'up'"
              @click.native="showChooseAll = !showChooseAll"></cell>
        <span class="sure-btn">确定</span>
      </footer>
      <div class="slidefoot" @touchmove.prevent :class="showChooseAll?'animatefoot':''">
        <section class="pot-bottom">
          <p class="pot-tom-cancel"><img @click="showChooseAll = !showChooseAll" src="../../../../assets/img/check-cancel.png"
                                         alt=""></p>
          <checker
                  v-model="checkercancel"
                  type="checkbox"
                  default-item-class="checks-item-selected"
                  selected-item-class="">
            <checker-item v-for="(item,idx) in checkerItem" :key="idx" :value="item.id"
                          @on-item-click="cancelItem(idx)">{{item.name}}
            </checker-item>
          </checker>
        </section>
      </div>
    </section>
  </div>
</template>
<script>
    import {XHeader, Search, Cell, CellBox, Checker, CheckerItem} from 'vux'

    export default {
        data() {
            return {
                searchValue: '',//搜索值
                showAll: false,//是否向下展开
                showChooseAll: false,//已选项展开
                showList: true,//下级是否列表
                showTab: false,//下级是否选项
                checkerItem: [],//tab多选值
                checkercancel: [],//cancel
                checkerList: [{
                    id: 1,
                    name: '组织机构'
                }],//选项列表
                checkerTabList: [{
                    id: 1,
                    name: '组织机构'
                }],//tab选项列表
                chooseList: []
            }
        },
        components: {XHeader, Search, Cell, CellBox, Checker, CheckerItem},
        mounted() {
        },
        methods: {
            cancelItem(idx) {
                let self = this
                self.checkerItem.splice(idx, 1)
            },//弹框取消选择项
            checkListItem(item) {
                this.showList = false
                this.showTab = true
                this.chooseList.push(item)
            },//列表选中
            returnMain() {
                this.showList = true
                this.showTab = false
//          重新获取第一次的列表，并清空已选值
                this.chooseList = []
                this.checkerItem = []
            },//返回主目录
            returnPrew(item) {
                /*
                //      是列表的就获取赋值
                        this.showList=true
                        this.showTab=false
                        this.chooseList=[]
                        */
            },//      是列表的就获取赋值
        }
    }
</script>
<style scoped>
  .vux-header.reset-header {
    background-color: #3cbcd5 !important;
  }

  .slide {
    overflow: hidden;
    max-height: 0;
    position: absolute;
    top: 143px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    box-sizing: border-box;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .animate {
    overflow: visible;
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }

  .no-select-li {
    height: 42px;
    background-color: #F7F7F7;
    padding: 0 15px;
    line-height: 49px;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    position: relative;
  }

  .no-select-li:after {
    content: " ";
    display: inline-block;
    height: 40px;
    width: 6px;
    position: absolute;
    top: 2px;
    left: 0;
    background: #C8C9C9;
  }

  .no-select-li img {
    padding-right: 10px;
    margin-top: -5px;
    display: inline-block;
    width: 22px;
  }

  .check-item {
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
    position: relative;
  }

  .check-item-selected {
    background: #ffffff url(../../../../assets/img/cancel.png) no-repeat right bottom;
    background-size: 12%;
    border-color: #3CBED7;
  }

  .checks-item-selected {
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    margin-right: 6px;
    position: relative;
    background: #ffffff url('../../../../assets/img/cancel.png') no-repeat right bottom;
    background-size: 12%;
    border: 1px solid #3CBED7;
  }

  .slidefoot {
    overflow: hidden;
    max-height: 100vh;
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 43px;
    box-sizing: border-box;
    display: none;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  .animatefoot {
    overflow: visible;
    max-height: 100vh;
    min-height: 100px;
    display: block;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
    z-index: 1000;
  }

  .pot-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    min-height: 6px;
    padding: 10px;
  }

  .pot-tom-cancel {
    height: 20px;
    position: relative;
  }

  .pot-tom-cancel img {
    width: 20px;
    position: absolute;
    right: 0px;
    top: 0px;
  }

  .foot-style {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
    background: #ffffff;
  }

  .sure-btn {
    display: inline-block;
    width: 60px;
    height: 42px;
    line-height: 42px;
    background: #23ade5;
    position: absolute;
    right: 0;
    text-align: center;
  }

  .ellipsy {
    width: 130px !important;
    margin-right: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
