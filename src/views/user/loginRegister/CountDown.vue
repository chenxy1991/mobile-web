<template>
    <div>
        <span v-if="showInitContent">{{initContent}}</span>
        <span v-if="showCountDown">{{time}}秒后获取</span>
        <span v-if="showAfterContent">{{afterContent}}</span>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'CountDown',
    props: {
        isStart: Boolean,
        seconds: Number,
        initContent: String,
        afterContent: String,
        onCountEnd: Function
    },
    data () {
        return {
            showInitContent: true,
            showAfterContent: false,
            showCountDown: false,
            time: null,
            timeInterval: null
        };
    },
    activated () {
        this.time = this.seconds;
    },
    methods: {
        handleStart () {
            this.showInitContent = false;
            this.showAfterContent = false;
            this.countDown();
        },
        showContent () {
            this.showAfterContent = true;
            this.showCountDown = false;
            this.time = this.seconds;
        },
        countDown () {
            this.showCountDown = true;
            this.timeInterval = setInterval(() => {
                if (this.time <= 0) {
                    this.time = 0;
                    clearInterval(this.timeInterval);
                    this.showContent();
                    this.onCountEnd(true, 'countDown end');
                    return;
                }
                this.time--;
            }, 1000);
        }
    },
    watch: {
        isStart () {
            if (this.isStart) {
                this.handleStart();
                return;
            }
            this.timeInterval && clearInterval(this.timeInterval);
        }
    }
};
</script>
