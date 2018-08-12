<template>
	<div class="star " :class="'star-'+size">
		<span class="star-item" v-for="(item,i) in yimao" :key="i" :class="item"></span>
	</div>
</template>

<script >
	export default {
		props:["score","size"],
		computed:{
			yimao(){
				let arr=[];
				let sun=Math.floor(this.score);
				let s = (this.score - sun) >=0.5;
				for (let i = 0; i < sun; i++) {
					arr.push('on');
				}
				if(s)arr.push('half');
				while(arr.length<5){
					arr.push('off')
				}
				return arr;
			}
		}
	}

</script>

<style scoped >

</style>