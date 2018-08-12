<template>
	<transition name="move">
		<div class="detailWrapper" v-show="showDetail" ref="detailWrapper">
			<div class="foodDetail">
				<div class="back" @click="showDetail = !showDetail">
					<i class="icon-arrow_lift "></i>
				</div>
				<img :src="foodDetails.image" width="100%" height="425" alt="" />
				<div class="info">
					<div class="title">{{foodDetails.name}}</div>
					<div class="desc">
						<span>月售{{foodDetails.sellCount}}</span>
						<span>好评率{{foodDetails.rating}}%</span>
					</div>
					<div class="price">¥{{foodDetails.price}}</div>
					<transition name="fade">
						<div class="shopCart" v-show="foodDetails.count === 0 || foodDetails.count == undefined" @click="add($event)">
							<div class="text">加入购物车</div>
						</div>
					</transition>
					<cartcontrol ref="foodcontrol" :food="foodDetails"></cartcontrol>
				</div>
				<div class="divider"></div>
				<div class="desc">
					<div class="title">商品介绍</div>
					<div class="content">{{foodDetails.info}}</div>
				</div>
				<div class="divider"></div>
				<div class="evaluation">
					<div class="title">商品评价</div>
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
								<div class="userInfo">
									<div class="time">{{item.ratetime}}</div>
									<div class="user">
										<span>{{item.ratetime}}</span>
										<span class="avatar"><img :src="item.avatar" width="12" height="12" alt=""/></span>
									</div>
								</div>
								<div class="content">
									<span class="icon " :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
									<span class="text">{{item.text}}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import cartcontrol from '@/components/mods/cartcontrol'
	import Scroll from 'better-scroll'
	export default{
		props:['foodDetails'],
		mounted(){
			
		},
		data(){
			return {
				showDetail:false,
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
				comments:[],
				flag:true
			}
		},
		methods:{
			add(e){
				this.$refs.foodcontrol.addCart(e);
			},
			foodshow(){
				this.showDetail=true;
				this.$nextTick(()=>{
					this.comments=this.foodDetails.ratings;
					this.foodDetails.ratings.forEach((item,index)=>{
						this.classify[0].comment.push(item);
						this.classify[0].count++
						if(item.rateType===0){
							this.classify[1].comment.push(item);
							this.classify[1].count++;
						}else{
							this.classify[2].comment.push(item);
							this.classify[2].count++;
						} 
					})
					if(!this.fs){
						this.fs=new Scroll(this.$refs.detailWrapper,{
							click:true
						});
					}else{
						this.fs.refresh();
					}
				})
			},
			swicth(item){
				this.classify.forEach(val=>{
					val.active=false;
				})
				item.active=true;
				this.comments = item.comment;
			},
			updatesc(){
				this.$nextTick(()=>{
					this.fs.refresh();
				})
			}
		},
		computed:{
			commentsFlag(){
				let arr=[]
				this.updatesc()
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
			cartcontrol
		}
	}
</script>
<style scoped>

</style>