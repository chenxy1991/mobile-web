/*** Created by Homer on 2017/6/12***/
/**
 * 异或加密操作
 * 注意：
 * 1、参数：需加密的数据
 * 2、调用方法：this.$xor(m)
 */

export  default function xor  (m) {
  let keys='111111';
  let result='';
  let mm;
  for(let s in m){
    for(let r in keys){
      let k=keys.charCodeAt(r);
      mm=m.charCodeAt(s)^k;
    }
    result+=String.fromCharCode(mm)
  }
  return result;
}

