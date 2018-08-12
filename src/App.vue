<template>
  <div id="app">
    <vheader :seller="datas.seller"></vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :datas="datas" ref="abc"/>
    </keep-alive>
  </div>
</template>

<script>
  import vheader from '@/components/mods/header'
  import axios from 'axios'
  export default {
    name: 'App',
    mounted(){
      axios.get('./static/data.json').then(res=>{
        this.datas.seller=res.data.seller;
        this.datas.goods=res.data.goods;
        this.datas.ratings=res.data.ratings;
        this.$nextTick(()=>{
          if(this.$refs.abc && this.$refs.abc.scroll){
            this.$refs.abc.scroll();
          }
        });
      });
    },
    data(){
      return {
        datas:{
        //商户信息
        seller:{},
        //商品信息
        goods:[],
        //评论
        ratings:[]
      }
    }
  },
  components:{
    vheader
  }
}
</script>

<style scoped>
.tab .tab-item .router-link-active{
  color:#f01414;
}
</style>
