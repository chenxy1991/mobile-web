<template>
<div class="function-tab-container">
  <div class="header">
    <span></span>
    <span class="name f14">功能列表</span>
    <span></span>
  </div>
  <div class="items">
    <div class="item border-bottom-1 border-top-1" @click="handleActions('myGroups')">
      <div class="icon">
        <img src="../../../assets/others/setting_icon1.svg" alt="我开的团购">
                        </div>
        <div class="group">
          <span>我开的团购</span>
        </div>
        <div class="arrow">
          <icon class="el-icon-coral-enter"></icon>
        </div>
      </div>
      <div class="item border-bottom-1 border-top-1" @click="handleActions('myGroups')">
        <div class="icon">
          <img src="../../../assets/others/setting_icon1.svg" alt="我开的团购">
                        </div>
          <div class="group">
            <span>我开的团购</span>
          </div>
          <div class="arrow">
            <icon class="el-icon-coral-enter"></icon>
          </div>
        </div>
        <div class="item border-bottom-1 border-top-1" @click="handleActions('myGroups')">
          <div class="icon">
            <img src="../../../assets/others/setting_icon1.svg" alt="我开的团购">
                        </div>
            <div class="group">
              <span>我开的团购</span>
            </div>
            <div class="arrow">
              <icon class="el-icon-coral-enter"></icon>
            </div>
          </div>
          <div class="item border-bottom-1 border-top-1" @click="handleActions('myGroups')">
            <div class="icon">
              <img src="../../../assets/others/setting_icon1.svg" alt="我开的团购">
                        </div>
              <div class="group">
                <span>我开的团购</span>
              </div>
              <div class="arrow">
                <icon class="el-icon-coral-enter"></icon>
              </div>
            </div>
            <div class="item border-bottom-1 border-top-1" @click="handleActions('myGroups')">
              <div class="icon">
                <img src="../../../assets/others/setting_icon1.svg" alt="我开的团购">
                        </div>
                <div class="group">
                  <span>我开的团购</span>
                </div>
                <div class="arrow">
                  <icon class="el-icon-coral-enter"></icon>
                </div>
              </div>
              <div class="item border-bottom-1 border-top-1" @click="handleActions('myGroups')">
                <div class="icon">
                  <img src="../../../assets/others/setting_icon1.svg" alt="我开的团购">
                        </div>
                  <div class="group">
                    <span>我开的团购</span>
                  </div>
                  <div class="arrow">
                    <icon class="el-icon-coral-enter"></icon>
                  </div>
                </div>
                <div class="item border-bottom-1 border-top-1" @click="handleActions('myGroups')">
                  <div class="icon">
                    <img src="../../../assets/others/setting_icon1.svg" alt="我开的团购">
                        </div>
                    <div class="group">
                      <span>我开的团购</span>
                    </div>
                    <div class="arrow">
                      <icon class="el-icon-coral-enter"></icon>
                    </div>
                  </div>
                  <div class="item border-bottom-1 border-top-1" @click="handleActions('myGroups')">
                    <div class="icon">
                      <img src="../../../assets/others/setting_icon1.svg" alt="我开的团购">
                        </div>
                      <div class="group">
                        <span>我开的团购</span>
                      </div>
                      <div class="arrow">
                        <icon class="el-icon-coral-enter"></icon>
                      </div>
                    </div>
                    <div class="item border-bottom-1 border-top-1" @click="handleActions('myGroups')">
                      <div class="icon">
                        <img src="../../../assets/others/setting_icon1.svg" alt="我开的团购">
                        </div>
                        <div class="group">
                          <span>我开的团购</span>
                        </div>
                        <div class="arrow">
                          <icon class="el-icon-coral-enter"></icon>
                        </div>
                      </div>
                      <div class="item border-bottom-1 border-top-1" @click="handleActions('myGroups')">
                        <div class="icon">
                          <img src="../../../assets/others/setting_icon1.svg" alt="我开的团购">
                        </div>
                          <div class="group">
                            <span>我开的团购</span>
                          </div>
                          <div class="arrow">
                            <icon class="el-icon-coral-enter"></icon>
                          </div>
                        </div>
                        <div class="item border-bottom-1 border-top-1" @click="handleActions('myGroups')">
                          <div class="icon">
                            <img src="../../../assets/others/setting_icon1.svg" alt="我开的团购">
                        </div>
                            <div class="group">
                              <span>我开的团购</span>
                            </div>
                            <div class="arrow">
                              <icon class="el-icon-coral-enter"></icon>
                            </div>
                          </div>
                          <div class="item border-bottom-1" @click="handleActions('myCarts')">
                            <div class="icon">
                              <img src="../../../assets/others/setting_icon2.svg" alt="我的购物车">
                        </div>
                              <div class="group">
                                <span>我的购物车</span>
                              </div>
                              <div class="arrow">
                                <icon class="el-icon-coral-enter"></icon>
                              </div>
                            </div>

                            <div class="item border-bottom-1">
                              <div class="icon">
                                <img src="../../../assets/others/setting_icon3.svg" alt="我的消息">
                        </div>
                                <div class="group">
                                  <span>我的消息</span>
                                </div>
                                <div class="arrow">
                                  <icon class="el-icon-coral-enter"></icon>
                                </div>
                              </div>

                              <div class="item border-bottom-1" @click="handleActions('mySetting')">
                                <div class="icon">
                                  <img src="../../../assets/others/setting_icon4.svg" alt="我的信息">
                        </div>
                                  <div class="group">
                                    <span>我的设置</span>
                                  </div>
                                  <div class="arrow">
                                    <icon class="el-icon-coral-enter"></icon>
                                  </div>
                                </div>

                                <div class="item border-bottom-1">
                                  <div class="icon">
                                    <img src="../../../assets/others/setting_icon5.svg" alt="意见反馈">
                        </div>
                                    <div class="group">
                                      <span>意见反馈</span>
                                    </div>
                                    <div class="arrow">
                                      <icon class="el-icon-coral-enter"></icon>
                                    </div>
                                  </div>

                                  <div class="item border-bottom-1" @click="handleLogout">
                                    <div class="icon">
                                      <img src="../../../assets/others/setting_icon6.svg" alt="退出登录">
                        </div>
                                      <div class="group">
                                        <span>退出登录</span>
                                      </div>
                                      <div class="arrow">
                                        <icon class="el-icon-coral-enter"></icon>
                                      </div>
                                    </div>
                                  </div>
                                </div>
</template>

<script src="./script.js"></script>

<style lang="less" src="./style.less"></style>
