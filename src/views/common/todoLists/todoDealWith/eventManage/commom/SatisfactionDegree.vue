<template>
<div class="SatisfactionDegree">
  <!--预处理DIV-->
  <div v-if="showPreDealDiv===true">
    <group :gutter="10" >
			<cell
				:title="('是否预处理')"
				is-link
				:border-intent="false"
				:arrow-direction="showIsPreDeal ? 'up' : 'down'"
				@click.native="showIsPreDeal = !showIsPreDeal">
         <img style="display: inline-block;width: 20px;" src="../../../../../../assets/images/icon/request.svg" slot="icon">
			</cell>
			<p class="content" :class="showIsPreDeal?'animate':''">
          <group gutter="0">
              <selector placeholder="请选择" v-model="isPreDeal" ref="isPreDealRef" direction="ltr" title="是否预处理:"  :options="isPreDealOptions" @on-change="handleChangeIsPreDealOptions"></selector>
              <div class="vux-1px-t" v-show="showPreDealCont===true">
                 <selector placeholder="请选择" v-model="preDealCont" ref="preDealContRef" direction="ltr" title="未预处理原因：" name="preDealCont" :options="preDealContOptions" @on-change="handleChangePreDealContOptions"></selector>
              </div>
            </group>
        </p>
	   	</group>
  </div>
  <!--故障原因DIV-->
  <div v-if="showCauseOfFailureDiv===true">
  <group :gutter="10" >
			<cell
				:title="('故障原因')"
				is-link
				:border-intent="false"
				:arrow-direction="showCauseOfFailure ? 'up' : 'down'"
				@click.native="showCauseOfFailure = !showCauseOfFailure">
         <img style="display: inline-block;width: 20px;" src="../../../../../../assets/images/icon/request.svg" slot="icon">
			</cell>
			<p class="content" :class="showCauseOfFailure?'animate':''">
            <group gutter="0">
              <cell-box is-link @click.native="showCauseOfFailureTree=true">
             <!--  <cell-box is-link @click.native="HandleCheckerCauseOfFailureTreeClick"> -->
                <span>故障原因:</span>
                <span style="padding-left:1em;">{{causeOfFailureValue}}</span>
              </cell-box>
            </group>
         </p>
	  </group>
  </div>
  <!--版本上线问题DIV-->
  <div v-if="showCaseProblemsDiv===true">
     <group :gutter="10" >
			<cell
				:title="('引发问题')"
				is-link
				:border-intent="false"
				:arrow-direction="showCaseProblems ? 'up' : 'down'"
				@click.native="showCaseProblems = !showCaseProblems">
         <img style="display: inline-block;width: 20px;" src="../../../../../../assets/images/icon/request.svg" slot="icon">
			</cell>
			<p class="content" :class="showCaseProblems?'animate':''">
            <group gutter="0">
              <selector placeholder="请选择" v-model="onLineIssue" ref="onLineIssueRef" direction="rtl" title="是否版本上线引发问题:"  :options="onLineIssueOptions" @on-change="handleChangeOnLineIssueOptions"></selector>
              <selector placeholder="请选择" v-model="relatedEvents" ref="relatedEventsRef" direction="rtl" title="是否关联重大/批量事件:"  :options="relatedEventsOptions" @on-change="handleChangeRelatedEventsOptions"></selector>
              <div class="vux-1px-t" v-show="showRelatedEventsDescInput===true">
                <x-textarea title="重大/批量事件说明:" @on-blur="handleBlurRelatedEventsDesc" v-model="relatedEventsDesc" placeholder="请输入" :show-counter="false" :rows="2" autosize></x-textarea>
              </div>
            </group>
           </p>
	  </group>
  </div>
  <!--集团处理标识-->
  <div v-show="showJTHandleFlagDiv===true">
    <group :gutter="10"  >
			<cell
				:title="('集团处理标识')"
				is-link
				:border-intent="false"
				:arrow-direction="showJTHandleFlag ? 'up' : 'down'"
				@click.native="showJTHandleFlag = !showJTHandleFlag">
         <img style="display: inline-block;width: 20px;" src="../../../../../../assets/images/icon/request.svg" slot="icon">
			</cell>
			<p class="content" :class="showJTHandleFlag?'animate':''">
            <group gutter="0">
              <selector placeholder="请选择" v-model="jtHandleFlag" ref="satisfiedRef" direction="rtl" title="集团处理标识:" name="district" :options="jtHandleFlagOptions" @on-change="handleChangeJTHandleFlagOptions"></selector>
            </group>
      </p>
	  </group>
  </div>

  <!--集团处理满意度评价-->
   <div v-if="showJTSatisfiedEvaluateDiv===true">
    <group :gutter="10" >
			<cell
				:title="('集团相关')"
				is-link
				:border-intent="false"
				:arrow-direction="showJTSatisfiedEvaluate ? 'up' : 'down'"
				@click.native="showJTSatisfiedEvaluate = !showJTSatisfiedEvaluate">
         <img style="display: inline-block;width: 20px;" src="../../../../../../assets/images/icon/request.svg" slot="icon">
			</cell>
			<p class="content" :class="showJTSatisfiedEvaluate?'animate':''">
            <group gutter="0">
              <selector placeholder="请选择" v-model="jtSatisfyDegree" ref="jtSatisfyDegreeRef" direction="rtl" title="集团处理满意度:" name="district" :options="jtSatisfyDegreeOptions" @on-change="handleChangeJTSatisfyDegreeOptions"></selector>
              <selector placeholder="请选择" v-model="jtEndCode" ref="satisfiedRef" direction="rtl" title="集团事件解决情况:" name="district" :options="jtEndCodeOptions" @on-change="handleChangeJTEndCodeOptions"></selector>
            </group>
          </p>
	  </group>
  </div>

  <!--处理工单满意度评价-->
    <div v-if="showSatisfactionDiv===true">
    <group :gutter="10" >
			<cell
				:title="('满意度评价')"
				is-link
				:border-intent="false"
				:arrow-direction="showSatisfiedAssess ? 'up' : 'down'"
				@click.native="showSatisfiedAssess = !showSatisfiedAssess">
         <img style="display: inline-block;width: 20px;" src="../../../../../../assets/images/icon/request.svg" slot="icon">
			</cell>
			<p class="content" :class="showSatisfiedAssess?'animate':''">
            <group gutter="0">
              <selector placeholder="请选择" v-model="satisfaction" ref="satisfiedRef" direction="rtl" :title="satisfiedTitle" name="district" :options="satisfiedOptions" @on-change="handleChangeSatisfiedOptions"></selector>
              <div class="vux-1px-t" v-show="showNoSatisfiedInput===true">
                <x-textarea title="不满意原因" @on-blur="handleBlurNoSatisfiedReason" v-model="notSatisfyReason" placeholder="请输入原因" :show-counter="false" :rows="2" autosize></x-textarea>
              </div>
            </group>
         </p>
	  </group>
  </div>
  <!--显示故障原因-->
  <div v-transfer-dom>
    <popup v-if="showCauseOfFailureTree" v-model="showCauseOfFailureTree" position="right" width="100%">
      <cause-of-failure-tree :businessType="businessType"  @submitCaseOfFailureItemBtn="handleSelectCaseOfFailureItem"
      @hideCaseOfFailureDialog="handleHideCaseOfFailureDialog"></cause-of-failure-tree>
    </popup>
   </div>
</div>
</template>

<script>
import { mapActions } from "vuex";
import { isEmpty } from "../../../../../../utils/common";
import CauseOfFailureTree from "./CauseOfFailureTree";
import {
  TransferDom,
  Group,
  XDialog,
  Cell,
  CellBox,
  Box,
  XTextarea,
  Checklist,
  CheckIcon,
  Checker,
  CheckerItem,
  Popup,
  Radio,
  Selector,
  Flexbox,
  FlexboxItem
} from "vux";
export default {
  name: "SatisfactionDegree",
   model: {    // 使用model， 这儿2个属性，prop属性说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
      prop: 'notSatisfyReason',
      event: 'blurNoSatisfiedReason',
    },
  props: {
    businessKey: {
      type: [String, Number],
      require: false
    },
    businessType: {
      type: [String, Number],
      require: false
    },
    currentTaskInfoId: {
      type: [String, Number],
      require: false
    },
    currentTaskName: {
      type: [String, Number],
      require: false
    },
    contentTemplateIndex: {
      type: [String, Number],
      require: false
    },
    causeOfFailureTree: {
      type: [String, Number],
      require: false
    },
    currentDealOrgId: {
      type: [String, Number],
      require: false
    },
    isPreDeal: {
      type: [String, Number],
      require: false
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Group,
    XDialog,
    Cell,
    CellBox,
    Box,
    XTextarea,
    Checklist,
    CheckIcon,
    Checker,
    CheckerItem,
    Popup,
    Radio,
    Selector,
    Flexbox,
    FlexboxItem,
    CauseOfFailureTree
  },
  data() {
    return {
      showPreDealDiv: false, //预处理DIV
      showIsPreDeal:false,//是否展开是否预处理
      isPreDeal:1,//是否预处理（1：是；0：否）
      isPreDealOptions:[{key: 0, value: "否" },{key: 1, value: "是" }],//下拉框
      showPreDealCont:false,//是否展开预处理内容
      preDealCont:"",//预处理内容
      preDealContOptions:[],//预处理内容下拉框

      showCauseOfFailureDiv: false, //故障原因DIV
      showJTHandleFlagDiv: false, //集团处理标识
      showJTHandleFlag:false,//展开集团处理标识
      jtHandleFlag:0,//0已解决1未解决
      jtHandleFlagOptions:[{key: 0, value: "已解决" },{key: 1, value: "未解决" }],//集团处理标识下拉值

      showJTSatisfiedEvaluateDiv: false, //集团处理满意度评价
      showJTSatisfiedEvaluate:false,//展开集团满意度评价
      jtSatisfyDegree:"",//集团满意度值
      jtSatisfyDegreeOptions:[],//集团满意度下拉值
      jtEndCode:"",//集团事件解决情况
      jtEndCodeOptions:[],//集团事件解决情况下拉值

      showSatisfactionDiv: false, //处理工单满意度评价
      showCauseOfFailure:false,//是否展开故障原因
      showSatisfiedAssess:false,//是否展开满意度评价
      satisfiedOptions: undefined,
      satisfiedTitle: "评价", // //满意度评价标题
      showNoSatisfiedInput: false, //显示不满意输入框
      showCauseOfFailureTree: false, //展示故障原因树
      causeOfFailureValue:"",//故障原因
      notSatisfyReason:"",//不满意的原因

      showCaseProblemsDiv:false,//引发问题DIV
      showCaseProblems:false,//展开引发问题选项
      onLineIssue:"",//版本上线问题的value
      onLineIssueOptions:[{key: 0, value: "否" },{key: 1, value: "是" }],//版本上线问题单选值
      relatedEvents:"",//相关事件问题的value
      relatedEventsOptions:[{key: 0, value: "否" },{key: 1, value: "是" }],//相关事件问题单选值
      showRelatedEventsDescInput:false,//是否显示相关事件的说明
      relatedEventsDesc:"",//相关事件的说明Value
    };
  },
  created() {
    //alert("进来了");
    console.log(
      "进来的参数",
      "businessKey:",
      this.businessKey,
      "businessType:",
      this.businessType,
      "currentTaskInfoId:",
      this.currentTaskInfoId,
      "currentTaskName:",
      this.currentTaskName,
      "contentTemplateIndex:",
      this.contentTemplateIndex,
      "causeOfFailureTree:",
      this.causeOfFailureTree,
      "currentDealOrgId:",
      this.currentDealOrgId,
      "isPreDeal:",
      this.isPreDeal
    );
  },
  mounted: function() {
    //只执行一次
    this.onInitAppendDiv();
    //console.log(2)
  },
  destroyed() {},
  computed: {},
  methods: {
    ...mapActions([
    'dynamicLoadingBlock',
    'getPreDealContOptionByDictType',
    'getJTSatisfyDegreeOption',
    'getJTEndCode',
    ]),
    onInitAppendDiv() {
      //alert("进来了");
      this.dynamicLoadingBlockApi();
    },
      /**集团满意度下拉值改变*/
      handleChangeJTSatisfyDegreeOptions(jtSatisfyDegree){
        let _jtSatisfyDegree = JSON.parse(JSON.stringify(jtSatisfyDegree))
        console.log("团满意度：_jtSatisfyDegree",_jtSatisfyDegree)
        this.$emit('changeJTSatisfyDegreeOptions', _jtSatisfyDegree);
      },
      /**集团事件解决情况下拉值改变*/
      handleChangeJTEndCodeOptions(){
        let _jtEndCode = JSON.parse(JSON.stringify(jtEndCode))
        console.log("集团事件解决情况：_jtEndCode",_jtEndCode)
        this.$emit('changeJTEndCodeOptions', _jtEndCode);
      },
    /**集团处理标识 */
    handleChangeJTHandleFlagOptions(jtHandleFlag){
      let _jtHandleFlag = JSON.parse(JSON.stringify(jtHandleFlag))
        console.log("预处理内容：_jtHandleFlag",_jtHandleFlag)
        this.$emit('changeJTHandleFlagOptions', _jtHandleFlag);
      },
    /** 预处理*/
    handleChangeIsPreDealOptions(isPreDeal){
      let _isPreDeal = JSON.parse(JSON.stringify(isPreDeal))
      if(_isPreDeal===0){
          this.dynamicLoadingPreDealContOptionApi();
      }else{
        this.showPreDealCont=false;
      }
      console.log("是否预处理：_isPreDeal",_isPreDeal)
      this.$emit('changeIsPreDealOptions', _isPreDeal);
    },//是否预处理

    handleChangePreDealContOptions(preDealCont){
        let _preDealCont = JSON.parse(JSON.stringify(preDealCont))
        console.log("预处理内容：_preDealCont",_preDealCont)
        this.$emit('changePreDealContOptions', _preDealCont);
    },//预处理内容
        /**引发问题 */
   handleChangeOnLineIssueOptions(isEditionCauseProblems){
    let _isEditionCauseProblems = JSON.parse(JSON.stringify(isEditionCauseProblems))
      console.log("版本上线：isEditionCauseProblems",_isEditionCauseProblems)
    this.$emit('changeOnLineIssueOptions', _isEditionCauseProblems);
  },//触发改变版本上线问题选项

    handleChangeRelatedEventsOptions(isMajorBatchEvent){
    let _isMajorBatchEvent = JSON.parse(JSON.stringify(isMajorBatchEvent))
    if(_isMajorBatchEvent===1){
        this.showRelatedEventsDescInput=true;
    }else{
        this.showRelatedEventsDescInput=false;
    }
      console.log("相关事件：isMajorBatchEvent",_isMajorBatchEvent)
    this.$emit('changeRelatedEventsOptions', _isMajorBatchEvent);
  },//触发改变相关事件问题选项

  handleBlurRelatedEventsDesc(){
    let _majorBatchEventExplain = this.relatedEventsDesc;
      console.log("相关事件说明：",_majorBatchEventExplain)
      this.$emit('blurRelatedEventsDesc', _majorBatchEventExplain);
  },//触发鼠标离开相关事件说明
  /**故障原因 */
  handleSelectCaseOfFailureItem(selectItem){
    let _selectItem = JSON.parse(JSON.stringify(selectItem));
    this.$emit('selectCaseOfFailureItem', _selectItem);
    if(!isEmpty(_selectItem)){
    this.causeOfFailureValue=_selectItem[0].name;
    this.showCauseOfFailureTree=false;
    console.log("已选择节点：",_selectItem)
    }

    },//改变故障原因的值
  handleHideCaseOfFailureDialog(){
      this.showCauseOfFailureTree=false;
      console.log("隐藏原因树  ")
  },//隐藏原因树
  handleBlurNoSatisfiedReason(){
       console.log("双向绑定不满意原因：",this.notSatisfyReason)
       this.$emit('blurNoSatisfiedReason', this.notSatisfyReason);

  },
      /**异步加载集团满意度下拉值 */
      async dynamicLoadingJTSatisfyDegreeOptionApi() {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
     try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          dictType: "jtSatisfyDegree",
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.getJTSatisfyDegreeOption(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','初始化加载集团满意度下拉值异常，原因:' + error);
      }
      //异步加载集团满意度下拉值
      console.log("异步加载集团满意度下拉值 ", result);
      if (result.meta.success == true) {
           let map=result.data.map;
           if(!isEmpty(map)){
              this.jtSatisfyDegreeOptions=map.jtSatisfyDegreeOptions;
              for (let jtSatisfyDegree of this.jtSatisfyDegreeOptions) {
              this.$set(jtSatisfyDegree, "key", jtSatisfyDegree.value);
              this.$set(jtSatisfyDegree, "value", jtSatisfyDegree.labelName);
              this.$set(jtSatisfyDegree, "item", jtSatisfyDegree);
            }
            console.log("集团满意度jtSatisfyDegreeOptions", this.jtSatisfyDegreeOptions);
           }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"初始化加载集团满意度下拉值失败，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
         },
     /**异步加载集团事件解决情况下拉值 */
      async dynamicLoadingJTEndCodeOptionApi() {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
     try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          dictType: "jtEndCode",
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.getJTEndCode(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','初始化加载集团事件解决情况下拉值异常，原因:' + error);
      }
      //异步加载集团事件解决情况下拉值
      console.log("异步加载集团事件解决情况下拉值getJTEndCode ", result);
      if (result.meta.success == true) {
           let map=result.data.map;
           if(!isEmpty(map)){
              this.jtEndCode=map.jtEndCodeOptions;
              for (let jtEndCode of this.jtEndCodeOptions) {
              this.$set(jtEndCode, "key", jtEndCode.value);
              this.$set(jtEndCode, "value", jtEndCode.labelName);
              this.$set(jtEndCode, "item", jtEndCode);
            }
            console.log("集团事件解决情况下拉值jtEndCodeOptions", this.jtEndCodeOptions);
           }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"初始化加载集团事件解决情况下拉值失败，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
      },
        /**异步加载预处理内容字典值 */
      async dynamicLoadingPreDealContOptionApi() {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
     try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          dictType: "preconditioningReasons",
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.getPreDealContOptionByDictType(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','初始化加载预处理内容字典值异常，原因:' + error);
      }
      //异步加载预处理内容字典值
      console.log("异步加载预处理内容字典值getPreDealContOptionByDictType ", result);
      if (result.meta.success == true) {
           let map=result.data.map;
           if(!isEmpty(map)){
              this.preDealContOptions=map.preDealContOptions;
              for (let preDealCont of this.preDealContOptions) {
              this.$set(preDealCont, "key", preDealCont.value);
              this.$set(preDealCont, "value", preDealCont.labelName);
              this.$set(preDealCont, "item", preDealCont);
              this.showPreDealCont=true;
            }
            console.log("预处理内容preDealContOptions", this.preDealContOptions);
           }
      }else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"初始化加载预处理内容字典值失败，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
        },
  /**动态加载模块 */
    async dynamicLoadingBlockApi() {
      let result = {};
      let userId=JSON.parse(this.storejs.get('LoginUserId'));
     try {
      const sendInfo = {
        headers: {
          userId: userId,
        },
        Jsondata: {
          businessKey: this.businessKey,
          currentTaskInfoId: this.currentTaskInfoId,
          currentTaskName: this.currentTaskName,
          contentTemplateIndex: this.contentTemplateIndex,
          causeOfFailureTree: this.causeOfFailureTree,
          currentDealOrgId: this.currentDealOrgId,
          isPreDeal: this.isPreDeal
        }
      };
      this.$vux.loading.show({ text: '努力加载中'  });
      result = await this.dynamicLoadingBlock(sendInfo);
      this.$vux.loading.hide();
      } catch (error) {
        console.error(error);
        alert(error);
        this.showToast(false,'warn','初始化动态模块异常，原因:' + error);
      }
      //获取动态模块
      console.log("动态加载模块", result);
      if (result.meta.success == true) {
        let returnMap = result.data.returnMap;
        if (!isEmpty(returnMap)) {
          let outMap = returnMap.outMap;

          //1.是否显示预处理DIV
          let isPreDealFlag = outMap.isPreDealFlag;
          if (!isEmpty(isPreDealFlag)) {
            //显示预处理DIV
            console.log("显示预处理DIV");
            this.showPreDealDiv = true;
            this.showIsPreDeal=true;
          }

          //2.是否显示故障原因DIV
          let topOrgType = outMap.topOrgType;
          let operRouteType = outMap.operRouteType;
          let businessType = this.businessType;
          if (!isEmpty(topOrgType) || !isEmpty(operRouteType)) {
            //显示故障原因DIV
             console.log("显示故障原因DIV");
            //加载原因树
            this.showCauseOfFailureDiv = true;
            this.showCauseOfFailure= true;//是否展开故障原因
          }

          //3.是否显示是否版本上线引发问题DIV
          if (!isEmpty(topOrgType)) {
            this.showCaseProblemsDiv = true; //显示是否版本上线引发问题DIV
            this.showCaseProblems = true; //显示展开引发问题选项
            console.log("显示是否版本上线引发问题DIV");
            //4.是否显示集团处理标识DIV
            if (!isEmpty(businessType) && businessType === "3") {
              this.showJTHandleFlagDiv = true; //显示集团处理标识DIV
              this.showJTHandleFlag=true;
              console.log("显示集团处理标识DIV");
              //5.是否显示集团满意度评价DIV
              if (
                !isEmpty(currentTaskName) &&
                currentTaskName === "申告人确认"
              ) {
                this.showJTSatisfiedEvaluateDiv = true; //显示集团满意度评价DIV
                this.showJTSatisfiedEvaluate=true;
                this.dynamicLoadingJTSatisfyDegreeOptionApi();
                this.dynamicLoadingJTEndCodeOptionApi();
                console.log("显示集团满意度评价DIV");
              }
            }
          }

          //6.是否显示处理工单满意度评价DIV
          let lastTaskInfoList = outMap.lastTaskInfoList;
          if (lastTaskInfoList.length > 0) {
            console.log("显示处理工单满意度评价DIV");
            let lastTaskInfoMap = lastTaskInfoList[0];
            this.satisfiedTitle = lastTaskInfoMap.task_name.concat("评价");
            let dictMapList = outMap.dictMapList;
            this.satisfiedOptions = dictMapList;
            for (let dict of this.satisfiedOptions) {
              this.$set(dict, "key", dict.value);
              this.$set(dict, "value", dict.labelName);
              this.$set(dict, "lastTaskInfo", lastTaskInfoMap);
            }
            console.log("获取满意度评价dictMapList", this.satisfiedOptions);
            this.showSatisfactionDiv = true; //显示处理工单满意度评价DIV
            this.showSatisfiedAssess= true; //是否展开满意度评价
          }
        }
      } else{
        let failDesc=result.meta.msg;
        let failCaused=result.data.errorMsg;
        this.showToast(false,'warn',"初始化加载动态模块失败，原因:"+failDesc+'，' + failCaused);
        //跳转到404页面
      }
    }, //动态加载各个模块
    routeClickInit() {},
    handleChangeSatisfiedOptions(satisfyOption) {
      if (satisfyOption === "4" || satisfyOption === "5") {
        this.alert({content: "请输入不满意原因！"});
        this.showNoSatisfiedInput = true;
      } else {
        this.showNoSatisfiedInput = false;
      }
       let _satisfyOption = JSON.parse(JSON.stringify(this.satisfiedOptions[satisfyOption-1]));
       console.log("改变满意度评价事件", _satisfyOption);
       this.$emit('changeSatisfiedOptions', _satisfyOption);
    } //改变满意度评价事件
  }
};
</script>

<style lang="less" scoped>
.content{
  padding:10 0rem;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
/* .slide {
  padding: 0 2rem;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
} */
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
/* .span-font{
  font-family: '黑体';
  color: black;
} */
.groupContent /deep/ .weui-cells:before {
    border-bottom: 0px solid #D9D9D9 !important;
}
.groupContent /deep/ .weui-cells:after {
    border-bottom: 0px solid #D9D9D9 !important;
}
/* .groupContent /deep/ .weui-cell:before{
  border-top: 0px solid #D9D9D9 !important;
}
.groupContent /deep/ .weui-cell:after{
  border-top: 0px solid #D9D9D9 !important;
} */

.cell-x-icon {
  display: block;
  float: left;
  text-align: left;
  fill: #1B82D1;
  margin-right: 5px;
}

.img-icon {
  /*  padding-right: 10px; */
  /* margin-top: -5px; */
  /*  display:block; */
  margin-right: 5px;
  display: inline-block;
  width: 22px;
}

.checker-item {
  width: 110px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: rgb(237, 241, 240);
  margin: 3px 3px;
}

.checker-item-selected {
  background: #ffffff
    url("../../../../../../assets/images/checker/checked_active.svg") no-repeat
    right bottom;
  border-color: #1296db;
}
</style>
