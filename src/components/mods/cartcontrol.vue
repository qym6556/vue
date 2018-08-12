<template>
	<div class="cartcontrol">
		<transition name="fadeRotate">
			<div class="cart-decrease" @click.stop="decreaseCart($event)" v-show="food.count>0">
				<span class="icon-remove_circle_outline inner"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add" @click.stop="addCart($event)">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import {mapState,mapMutations} from 'vuex'
	export default{
		props:["food"],
		data(){
			return {

			}
		},
		computed:{
			...mapState([
				'vxfood'
				])
		},
		methods:{
			...mapMutations([
				'vxaddCart',
				'vxdecreaseCart'
				]),
			addCart(e){
				if(!e._constructed){
					return false
				}
				if(typeof this.food.count === 'undefined'){
					Vue.set(this.food,'count',0);
					Vue.set(this.food,'active',true);
				}
				if(this.food.active){
					this.vxaddCart(this.food);
					this.food.active=false;
				}
				this.food.count++;
			},
			decreaseCart(e){
				if(!e._constructed){
					return false
				}
				this.food.count--;
				if(this.food.count===0){
					this.vxdecreaseCart(this.food);
					this.food.active=true;
				}
			}
		}
	}
</script>
<style scoped>
	
</style>