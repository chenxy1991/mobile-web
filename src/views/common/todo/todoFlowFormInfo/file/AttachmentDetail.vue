<template>
  <div class="WorkflowDetail">
    <x-header  :left-options="{showBack: showBack}">附件详情</x-header>
    <div v-html="html"></div>
  </div>
</template>

<script>
import { XHeader } from 'vux'

export default {
  name: 'WorkflowDetail',
  data () {
    return {
      html: '',
      DetailData: [],
      tabars: [],
      showBack:true,
    }
  },
  created () {
      this.$store.commit('isfoo',false)
      let self = this;
      var ext = self.$route.query.ext
      var path = self.$route.query.path
      var fildID = self.$route.query.fildID

      var token = localStorage.getItem('token')
      var url = ''

        if(window.plus){
          var dtask = plus.downloader.createDownload(path, {filename:'_downloads/'+fildID}, function ( d, status ) {
          if ( status == 200 ) {
           plus.runtime.openFile('_downloads/'+title);
          }
           else {alert( "Download failed: " + status );
         }
       });
       dtask.start();
  }else{
    window.open(path);
  }

      // this.$http.get(path, {
      //   // headers:{"token": token}
      //   accept: 'text/html, text/plain'
      // })
      // .then(function (response) {
      //   // alert(JSON.stringify(response.data))
      //   self.html = response.data
      // })
      // .catch(function (error) {
      //   console.log(error)
      //   // alert(JSON.stringify(error))
      // })
  },
  methods: {
      itemClick(index){

      }
  },
  components: {
      XHeader

    }
}
</script>


<style scoped>



</style>
