<template>
	<el-form size="small" label-width="100px">
		<el-tabs v-if="formComponents.length" v-model="activeName">
		    <el-tab-pane label="组件属性" name="formItem">
		        <!-- 组件属性 -->
		        <el-form-item label="组件标识">
		            <el-input v-model="formComponent.formItemId"></el-input>
		        </el-form-item>
		        <el-form-item label="组件名称">
		            <el-input v-model="formComponent.label"></el-input>
		        </el-form-item>
		        <el-form-item label="默认值">
		            <el-input v-model="formComponent.default"></el-input>
		        </el-form-item>
		    </el-tab-pane>
		    <!-- 表单属性 -->
		    <el-tab-pane label="表单属性" name="formInfo">
		        <el-form-item label="表单组件尺寸">
		            <el-select
		                v-model="formDesign.formInfo.formSize"
		                placeholder="请选择"
		            >
		                <el-option
		                    v-for="item in formSizeOptions"
		                    :key="item.value"
		                    :label="item.label"
		                    :value="item.value"
		                >
		                </el-option>
		            </el-select>
		        </el-form-item>
		    </el-tab-pane>
		</el-tabs>
		<el-empty v-else description="请选择组件"></el-empty>
	</el-form>
</template>

<script>
	import { inject, watch } from "@vue/runtime-core";
	import { ref, computed } from "@vue/reactivity";
	export default{
		name:"form-cmp-config",
		setup() {
			let ctx = inject("formDesign");	//获取formDesign实例
			let formDesign = computed(()=>{
				//利用计算机属性获取实例formDesign的实例ctx
				return ctx.value;
			});
			let formComponents = computed(()=>{
				//利用计算机属性将formDesign的formInfo.formItemList赋值给formComponents
				return formDesign.value.formInfo.formItemList || [];
			});
			let currentFormItemId = computed(()=>{
				//利用计算机属性获取实例formDesign当前选中的form组件的id
				return formDesign.value.formCmpId;
			});
			let formComponent = ref({});	//选中的formCmp
			
			watch(
				//监听选中组件并赋值
				() =>currentFormItemId.value.id,
				(newV) =>{
					console.log("-------")
					console.log(currentFormItemId.value.id)
					console.log(formComponents.value)
					formComponents.value.forEach((item) =>{
						if(item.formItemId === newV){
							formComponent.value = item;
						}
					});
					console.log(formComponents.value)
				}
			);
			let activeName = ref("formItem");		//tabs绑定值
			let formSizeOptions = ref([
				{label:"小",value:"samll"},
				{label:"中",value:"default"},
				{label:"大",value:"large"}
			]);
				
			return {
			    formDesign,
			    formComponents,
			    currentFormItemId,
			    formComponent,
			    activeName,
			    formSizeOptions,
			};
		}
	}
</script>

<style lang="less" scoped></style>