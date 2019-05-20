<template>
    <div class="cart-items-container">
        <div class="header">
            <span @click.stop="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
            </span>
            <span class="f16">{{group.name}}</span>
            <span></span>
        </div>
        <div class="block">
            <div class="block-content m-b-10" v-for="item in detailsInCart" :key="item.id">
                <div class="img-container">
                    <img :src="item.encyImage" alt="生物图片">
                </div>
                <div class="info">
                    <span class="name f15">{{item.name}}</span>
                    <div>
                        <span class="size f12">{{item.size}}</span>
                        <span class="price f14">￥{{item.price}}</span>
                    </div>
                    <div class="count-container">
                        <x-number
                            v-model="item.count" 
                            :min="item.min" 
                            :max="item.max" 
                            width="40px"
                            @on-change="numberChange(item)"
                        >
                        </x-number>
                        <span v-if="group.current_step===0" @click.stop="deleteConfirmFun(item)">
                            <icon class="el-icon-coral-empty f18"></icon>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div class="total-count">
            <span class="f20">合计<span style="font-weight: bold;">
                <span style="color: #ee753c;">￥{{totalCount + totalFreight}}</span>
                <span class="f14">(含运费<span style="color: #ee735c;">￥{{totalFreight}}</span>)</span>
            </span></span>
        </div>
        -->
        <div style="margin-bottom: 20px;">
            <group v-if="cart.description && cart.description.trim()">
                <x-textarea
                    :max="200" 
                    name="description" 
                    placeholder="备注"
                    v-model="cart.description" 
                    :readonly="true"
                >
                </x-textarea>
            </group>
        </div>
        <confirm v-model="deleteConfirm" :title="`删除${currentItem.name}`"
                 @on-confirm="handleConfirmDelete">
            <p style="text-align:center;">亲，确认删除吗？</p>
        </confirm>
    </div>
</template>
<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
