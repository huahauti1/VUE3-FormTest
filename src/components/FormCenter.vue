<template>
	<div class="formCenter">
		<el-form label-position="left">
			<ul class="centerUL">
				<Darggable class="dargCenter"
				:group="{name:'form'}"
				:animation="300"
				chosen-class="chosenClass"
				drag-class="daragClass"
				ghost-class="ghostClass"
				:list="formComponents"
				item-key="formItemId"
				@add="dargCenterAdd"
				>
					<template #item="{element}">
						<li class="dargLi"
						:class="element.formItemId == formDesign.formCmpID.id ? 'active' : '' "></li>
					</template>
				</Darggable>
			</ul>
		</el-form>
	</div>
</template>

<script>
	import {computed,inject} from "vue";
	export default{
		name:"form-center",
		setup(){
			let ctx = inject("formDesign");			//获取父组件FormDesign传过来的实例formDesign
			let formDesign = computed(()=>{
				return ctx.value.ctx;
			})
			console.log("*********")
			console.log(ctx);
			console.log(formDesign)
			return{
				formDesign,
			}
		}
	}
</script>

<style>
</style>