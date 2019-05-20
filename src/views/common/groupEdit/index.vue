<template>
    <div class="group-edit-container">
        <div class="header">
            <span @click="handleActions({}, 'return')">
                <icon class="el-icon-coral-return f20"></icon>
            </span>
            <span class="f16 name">{{group.name}}</span>
            <span></span>
        </div>
        <div class="input-container m-t-10">
            <div class="input-item">
                <div class="title f14">
                    <span class="rect"></span>
                    <span class="title-text f14">团单名</span>
                </div>
                <input placeholder="请输入" v-model="form.name" disabled/>
            </div>
            <div class="input-item m-t-10">
                <div class="title f14">
                    <span class="rect"></span>
                    <span class="title-text f14">其他信息</span>
                </div>
                <quill-editor :options="editorOption" v-model="form.description"></quill-editor>
            </div>
            <button class="btn btn-full m-t-10 f16" @click="submit">确认编辑</button>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style lang="less" src="./style.less"></style>
