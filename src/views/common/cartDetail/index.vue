<template>
    <div class="cart-detail-container">
        <div class="header">
            <span @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
                <span class="f16" style="position: relative; top: -2px;">回首页</span>
            </span>
            <span class="name f16">{{group.name}}</span>
            <span @click="handleActions({}, 'groupDetail')">
                <span class="f16" style="position: relative; top: -2px;">去购物</span>
                <icon class="el-icon-coral-enter f20"></icon>
            </span>
        </div>
        <scroller>
            <!--
            <group style="margin-top: 0.45rem;">
                <div title="温馨提示" class="tip-cell">
                    <p>温馨提示:</p>
                    <p>团购结束前,购物车数据将实时同步给团长</p>
                    <p>团购结束后,购物车数据不能修改</p>
                </div>
            </group>
            -->
            <div class="block" style="margin-top: 0.45rem;">
                <div class="block-content m-b-10" v-for="item in detailsInCart" :key="item.id">
                    <div class="img-container">
                        <img :src="item.encyImage" alt="生物图片">
                    </div>
                    <div class="info">
                        <div>
                            <span class="name f15">{{item.name}}<span v-if="item.size" class="size f12">({{item.size}})</span></span>
                            <span class="price f14">￥{{item.price}}</span>
                        </div>
                        <div v-if="group.status===0">
                            <span class="f16">缺货<span style="color: #ee735c;">{{item.lostNum}}</span>条 应退<span style="color: #ee735c;">{{item.price * item.lostNum + item.lostBackFreight}}</span>元</span>
                        </div>
                        <div v-if="group.status===0">
                            <span class="f16">报损<span style="color: #ee735c;">{{item.damageNum}}</span>条 应退<span style="color: #ee735c;">{{item.price * item.damageNum}}</span>元</span>
                        </div>
                        <div class="count-container">
                            <x-number
                                    v-model="item.count" :min="item.min" :max="item.max" width="40px"
                                    @on-change="handleActions(item, 'numberChange')">
                            </x-number>
                            <span v-if="group.status!==0" @click.stop="handleActions(item, 'deleteConfirm')">
                            <icon class="el-icon-coral-empty f18"></icon>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="total-count">
                <div class="f18">合计<span style="font-weight: bold;">
                <span style="color: #ee753c;">￥{{((totalCount + totalFreight) || 0).toFixed(2)}}</span>
                <span class="f14">(商品<span style="color: #ee735c;">￥{{(totalCount || 0).toFixed(2)}}</span> 运费<span style="color: #ee735c;">￥{{(totalFreight || 0).toFixed(2)}}</span>)</span>
            </span></div>
                <div v-if="group.status===0" class="f18">应退<span style="font-weight: bold;">
                <span style="color: #ee753c;">￥{{((cart.damage_back + cart.lost_back) || 0).toFixed(2)}}</span>
                <span class="f14">(缺货应退<span style="color: #ee735c;">￥{{(cart.lost_back || 0).toFixed(2)}}</span> 报损应退<span style="color: #ee735c;">￥{{(cart.damage_back || 0).toFixed(2)}}</span>)</span>
            </span></div>
            </div>
            <div style="padding-bottom: 200px;">
                <group>
                    <x-input
                            placeholder="联系电话" is-type="china-mobile"
                            v-model="phone" :readonly="group.status===0"
                            @on-blur="handleActions({}, 'saveInfo')"
                    >
                    </x-input>
                    <x-textarea
                            :max="200" name="description" placeholder="备注"
                            v-model="remark" :readonly="group.status===0"
                            @on-blur="handleActions({}, 'saveInfo')"
                    >
                    </x-textarea>
                </group>
            </div>
        </scroller>
        <div class="submit" v-if="group.status===1">
            <button class="btn btn-full f15" @click="handleSubmit">确认购买</button>
        </div>
        <div class="submit" v-else>
            <button class="btn btn-full btn-disabled f15">确认购买</button>
        </div>
        <confirm v-model="deleteConfirm" :title="`删除${currentItem.name}`"
                 @on-confirm="handleConfirmDelete">
            <p style="text-align:center;">亲，确定删除吗？</p>
        </confirm>
    </div>
</template>
<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
