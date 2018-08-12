<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li class="menu-item" v-for="(item,i) in datas.goods" :key="i">
					<span class="text">
						<span v-show="item.type>0" class="iconMap" :class="icon[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li class="food-list food-list-hook" v-for="(item,i) in datas.goods" :key="i">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li class="food-item" v-for="(food,i2) in item.foods" :key="i2" @click="detail(food)">
							<div class="icon"><img :src="food.icon" alt="" width="57" height="57" /></div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="description">{{food.description}}</p>
								<div class="sell-info">
									<span class="sellCount">月售{{food.sellCount}}份</span>
									<span class="rating">好评率{{food.rating}}</span>
									<div class="price">
										<span class="newPrice">${{food.price}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol :food="food" ></cartcontrol>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice" :food="food"></shopcart>
		<foodDetail ref="foodDetail" :foodDetails="foodDetails"></foodDetail>
	</div>
</template>

<script >
	import icon from '@/components/mods/icon'
	import Scroll from 'better-scroll'
	import shopcart from '@/components/mods/shopcart'
	import cartcontrol from '@/components/mods/cartcontrol'
	import foodDetail from '@/components/mods/foodDetail'
	export default {
		props:["datas"],
		data(){
			return {
				icon:icon,
				goods:this.datas.goods,
				foodDetails:{}
			}
		},
		computed:{
			food () {
				let arr=[];
				this.datas.goods.forEach((val,index)=>{
					val.foods.forEach((food,i)=>{
						if(food.count>0){
							arr.push(food);
						}
					});
				});
				return arr;
			}
		},
		mounted(){
			//dom更新完后
			this.$nextTick(()=>{
				
			})
			
		},
		methods:{
			scroll(){
				new Scroll(this.$refs['foodsWrapper'],{
					click:true
				});
				new Scroll(this.$refs['menuWrapper']);
			},
			detail(food){
				this.$refs.foodDetail.foodshow();
				this.foodDetails=food;
			}
		},
		components:{
			shopcart,
			cartcontrol,
			foodDetail
		}
	}

</script>

<style scoped >

</style>