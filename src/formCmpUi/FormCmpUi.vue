<template>
	<div class="formComponent">
	    <!-- 基础组件 -->
	    <el-form-item v-if="formItem.type === 'button'" :label="formItem.label">
	        <el-button>{{ formItem.label }}</el-button>
	    </el-form-item>
	    <!-- 表单组件 -->
	    <el-form-item v-if="formItem.type === 'input'" :label="formItem.label">
	        <el-input v-model="formItem.default"></el-input>
	    </el-form-item>
	    <el-form-item
	        v-if="formItem.type === 'textarea'"
	        :label="formItem.label"
	    >
	        <el-input type="textarea" v-model="formItem.default"></el-input>
	    </el-form-item>
	    <el-form-item v-if="formItem.type === 'radio'" :label="formItem.label">
	        <el-radio></el-radio>
	    </el-form-item>
	    <el-form-item
	        v-if="formItem.type === 'checkbox'"
	        :label="formItem.label"
	    >
	        <el-checkbox></el-checkbox>
	    </el-form-item>
	</div>
</template>

<script>
	import {computed} from "vue";
	export default{
		name:"element-ui",
		//子组件接收值
		props:{
			formComponent:Object,//props中的属性必须先定义类型，否则setup中获取的是undefind
		},
		setup(props){
			let formItem = computed(()=>{
				return props.formComponent;
			});
			return{
				formItem,
			}
		}
	}
	
</script>

<style lang="less" scoped>
	.el-form-item__label {
	    white-space: nowrap;
	}
</style>