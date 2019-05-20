<template>
    <div class="loader-container">
        <div class="loader-mask"></div>
        <div class="loader" v-show="show"></div>
    </div>
</template>
<script>
    export default {
        name: 'v-loading',
        props: {
            show: {
                type: Boolean,
                'default': false
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './overall-loading.styl';
</style>
