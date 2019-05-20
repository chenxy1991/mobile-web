<template>
  <div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import MeScroll from './mescroll.js'
  import totop from './mescroll-totop.png'
  import empty from './mescroll-empty.png'
  //创建vue对象
  export default {
    props: {
      upCallback: {
        type: Function,
        default: null
      },
      emptyDataBtnClick: {
        type: Function,
        default: null
      },
      toTopClass: {
        type: String,
        default: 'mescroll-totop'
      },
      upAuto: {
        type: Boolean,
        default: true
      },
      warpId: {
        type: String,
        default: 'mescroll'
      },
      upUse: {
        type: Boolean,
        default: true
      },
      scrollId: {
        type: String,
        default: 'body'
      },
      scrollTop: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        mescroll: null,
        scrollIds:{},
      }
    },
    mounted() {
      //创建Mescroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
      //解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
      let self = this;
      this.mescroll = new MeScroll(self.scrollId, {
        down: {use: false},
        up: {
          use:self.upUse, //是否初始化上拉加载; 默认true
          auto: self.upAuto,//是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
          isLock: false, //是否锁定上拉,默认false;当列表没有更多数据时会自动锁定不可上拉;在endSuccess如果检查到有下一页数据,则会自动解锁true
          isBoth: false, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
          callback: self.upCallback, //上拉回调
          //以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10, //每页数据条数,默认10
            time: null //加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
          }, //可配置每页8条数据,默认10
          toTop: { //配置回到顶部按钮
            src: totop, //图片路径,默认null,支持网络图
            offset: 1000,//默认滚动到1000px显示,可配置offset修改
            warpClass: self.toTopClass,//按钮样式,参见mescroll.min.css
            showClass: "mescroll-fade-in", //显示样式,参见mescroll.min.css
            hideClass: "mescroll-fade-out", //隐藏样式,参见mescroll.min.css
            duration: 300 //回到顶部的动画时长,默认300ms
          },
          noMoreSize: 1,  //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
          empty: { //配置列表无任何数据的提示
            warpId: self.warpId,
            icon: empty,
            tip: "暂无相关数据哦~",
            btntext: "去逛逛~",
            btnClick: self.emptyDataBtnClick || self.btnClick,
          },
          loadFull: {
          use: false, //列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认false,因为可通过调高page.size避免这个情况
          delay: 500 //延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
          },
          /* offset: 0, //离底部的距离 */
          resetShowDownScroll: false, //重置上拉加载数据,是否显示下拉的进度布局;默认false,默认显示上拉加载的进度布局;
          warpId: self.warpId,
          htmlNodata: '<p class="upwarp-nodata">暂无更多数据哦~</p>',
          scrollbar: {use: true, barClass: "mescroll-bar"},
          htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
        }
      });
    },
    methods: {
      //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      endSuccess(curPageDataLength){
        this.mescroll && this.mescroll.endSuccess(curPageDataLength);
      },
      // (推荐): 后台接口有返回列表的总数据量 totalSize
      endSuccess(curPageDataLength, totalSize){
        this.mescroll && this.mescroll.endSuccess(curPageDataLength, totalSize);
      },
      endErr(){
        this.mescroll && this.mescroll.endErr();
      },
      deactivated(){
        this.mescroll && this.mescroll.deactivated();
      },
      activated(){
        if (!(this.mescroll && this.mescroll.beActivated)) {
          this.mescroll.activated();
        }
      },
      getScrollTop(){
        if(this.mescroll){
          return this.mescroll.getScrollTop();
        }
        return 0;
      },
      scrollTo(top,duration){
        this.mescroll && this.mescroll.scrollTo(top,duration);
      },
      btnClick() {
        alert("点击了去逛逛按钮,请具体实现业务逻辑");
      },
      resetUpScroll(){
        this.mescroll && this.mescroll.resetUpScroll();
      }
    },
    computed: {
      list() {
        return this.$store.state.base_data.list
      }
    },
    destroyed(){
      this.mescroll &&this.mescroll.destroy();
    },
    deactivated(){
      this.deactivated();
      let warpId = this.warpId;
      let scrollMap = {}
      scrollMap[warpId] = this.mescroll.preScrollY;
      this.$store.dispatch('setScrollTop', scrollMap)
    },
    activated(){
      this.activated();
      let scrollTop = 0;
      if(this.$store.state.scrollTops.hasOwnProperty(this.warpId)){
        scrollTop = this.$store.state.scrollTops[this.warpId];
      }
      this.scrollTo(scrollTop,0)
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import './mescroll.css';
</style>
