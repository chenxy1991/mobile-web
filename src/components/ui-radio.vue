<template>
<div class="ui-radio">
  <label class="ui-radio" :class="{'checked':model==value,'disabled':disabled}">
    <input type="radio" ref="radio" :value="value" @click="updateVal" :disabled="disabled">
  </label>
  </div>
</template>
<script>
export default {
  name:'ui-radio',

  props:{
    value:{
      type:String,
      require:false
    },
    checked:{
      type:Boolean,
      default:false
    },
    disabled:{
      type:Boolean,
      default:false
    }
  },
  mounted:function(){
    if(this.checked===true){
        this.updateVal();
    }

  },
  methods:{
    updateVal:function(){
      this.$emit('change',this.$refs.radio.value);
    }
  }
}
</script>
<style lang="less" scoped>
.ui-radio{
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #4693fe;
  display: inline-block;
  position: relative;
}
.ui-radio.disabled{
  border-color: #ccc;
}
.ui-radio::after{
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -5px 0 0 -5px;
  background-color: #4693fe;
  transition: all .5s ease;
  opacity: 0;
  transform: scale(0);
}
.ui-radio.disabled::after{
  background-color: #ccc;
}
.ui-radio.checked::after {
   opacity: 1;
   transform: scale(1);
}
.ui-radio input[type=radio]{
  opacity: 0;
  margin: 0;
}
</style>
