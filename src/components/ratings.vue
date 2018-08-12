<template>
	<div class="ratingsWrapper" ref="ratingsWrapper">
		<div class="ratings-content">
			<div class="info">
				<div class="mark">
					<div class="num">{{datas.seller.score}}</div>
					<div class="text">综合评分</div>
					<div class="contrast">高于周边商家{{datas.seller.rankRate}}%</div>
				</div>
				<div class="stars">
					<div class="serviceScore">
						<div class="text">服务态度</div>
						<star :score="datas.seller.serviceScore" :size="36"></star>
						<span class="num">{{datas.seller.serviceScore}}</span>
					</div>
					<div class="foodScore">
						<div class="text">商品评分</div>
						<star :score="datas.seller.foodScore" :size="36"></star>
						<span class="num">{{datas.seller.foodScore}}</span>
					</div>
				</div>
			</div>
			<div class="divider"></div>
			<div class="evaluation" >
				<div class="classify">
					<span v-for="(item,i) in classify" class="item" :class="{active:item.active,bad:i===2,badActive:item.active && i===2}" :key="i" @click="swicth(item)">{{item.name}}
						<span class="count">{{item.count}}</span>
					</span>
				</div>
				<div class="switch">
					<span class="icon-check_circle" @click="flag = !flag" :class="{on:flag}"></span>
					<span class="text">只看有内容的评价</span>
				</div>
				<div class="evel-list">
					<ul>
						<li class="evel" v-for="(item,index) in commentsFlag" :key="index">
							<div class="avatar"><img :src="item.avatar" width="28" height="28" alt=""/></div>
							<div class="content">
								<div class="user">
									<span class="name">{{item.username}}</span>
									<span class="rateTime">{{item.rateTime}}</span>
								</div>
								<div class="star-wrapper">
									<star :size="24" :score="item.score"></star>
									<span class="deliveryTime">{{item.deliveryTime}}分钟送达</span>
								</div>
								<div class="text">{{item.text}}</div>
								<div class="recommend">
									<span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
									<span v-for="(dish,i) in item.recommend" :key="i" class="dish">{{dish}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script >
	import axios from 'axios'
	import star from '@/components/mods/star'
	import Scroll from 'better-scroll'
	export default {
		props:['datas'],
		data(){
			return {
				ratings:[],
				classify:[
				{
					name: "全部",
					count: 0,
					active: true,
					comment:[]
				},
				{
					name: "推荐",
					count: 0,
					active: false,
					comment:[]
				},
				{
					name: "吐槽",
					count: 0,
					active: false,
					comment:[]
				}
				],
				flag:true,
				comments:[]
			}

		},
		mounted(){
			axios.get('../static/data.json').then((res)=>{
				this.ratings=res.data.ratings;
				this.comments=this.ratings;
				this.ratings.forEach(val=>{
					this.classify[0].comment.push(val);
					this.classify[0].count++;
					if(val.rateType===0){
						this.classify[1].comment.push(val);
						this.classify[1].count++;
					}else{
						this.classify[2].comment.push(val);
						this.classify[2].count++;
					} 
				});
			})
		},
		activated(){
    		//不管是否有缓存都会执行,可以做到组件缓存，但数据可以更新
    		
    	},
    	methods:{
    		swicth(item){
    			this.classify.forEach(val=>{
    				val.active=false;
    			})
    			item.active=true;
    			this.comments = item.comment;
    		},
    		scroll(){
    			this.$nextTick(()=>{
    				if(!this.fs){
    					this.fs=new Scroll(this.$refs.ratingsWrapper,{
    						click:true
    					})
    				}else{
    					this.fs.refresh();
    				}
    			})
    			
    		}
    	},
    	computed:{
    		commentsFlag(){
    			let arr=[]
    			this.scroll()
    			if(this.flag){
    				this.comments.forEach(val=>{
    					if(val.text.trim().length > 0){
    						arr.push(val);
    					}
    				});
    				return arr;
    			}else{
    				return this.comments;
    			}
    		}
    	},
    	components:{
    		star
    	}
    }

</script>

<style scoped >

</style>