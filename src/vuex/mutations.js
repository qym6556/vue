export default {
	vxaddCart(state,val){
		state.vxfood.push(val);
	},
	vxdecreaseCart(state,val){
		state.vxfood.forEach((item,index)=>{
			if(item.name === val.name){
				state.vxfood.splice(index,1);
			}
		})
	}
}