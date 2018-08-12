<template>
	<div class="shopCart">
		<div class="content" @click="showa">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo active">
						<i class="icon-shopping_cart"></i>
					</div>
					<div class="badge" v-show="totalPrice">{{totalCount}}</div>
				</div>
				<div class="price" :class="{active:totalPrice}">${{totalPrice}}</div>
				<div class="desc" v-show="totalPrice<99">另需配送费¥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" :class="{enough:totalPrice>=minPrice}">
				<div class="pay">{{payDesc}}</div>
			</div>
		</div>
		<transition name="transHeight">
			<div class="shopcart-list" v-show="totalCount && show" >
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listcontent" >
					<ul>
						<li class="food" v-for="(item,index) in food" :key="index">
							<span class="name">{{item.name}}</span>
							<div class="price">
								<span>${{item.price}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="item" ></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>

<script >
	import cartcontrol from "@/components/mods/cartcontrol"
	import Scroll from 'better-scroll'
	export default {
		props:["deliveryPrice","minPrice","food"],
		data(){
			return {
				show:false
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.food.forEach(val=>{
					total += val.price*val.count
				})
				return total;
			},
			totalCount(){
				let count=0;
				this.food.forEach(val=>{
					count += val.count
				})
				return count;
			},
			payDesc(){
				if(this.totalPrice===0){
					return `${this.minPrice}元起送`
				}else if(this.totalPrice < this.minPrice){
					return `还差${this.minPrice-this.totalPrice}元起送`;
				}else{
					return `去结算`
				}
			}
		},
		methods:{
			empty(){
				this.food.forEach(val=>{
					val.count=0;
				});
				this.show=false;
			},
			showa(){
				this.show = !this.show
				if(this.show){
					this.$nextTick(()=>{
						if(!this.sc){
							this.sc=new Scroll(this.$refs.listcontent,{
								click:true
							});
						}else{
							this.sc.refresh();
						}
					});
				}
			}
		},
		components:{
			cartcontrol
		}
	}

</script>

<style scoped >

</style>