<template>
	<el-row  :gutter="20"  style="border: 1px solid black;">
		<el-col :span="4" class="leftVue">
			<!-- 左侧组件栏 -->
			<ul>
				<li class="formCpmTitle" v-for="(item,index) in configList" :key="index">
					<div class="title">{{item.title}}</div>
					<ul>
						<!-- chosen-class ===> 设置自定义样式，来区分当前哪个元素被选中
							 ghost-class ===>  设置目标位置占位符的样式及需要停靠的样式
							 drag-class ===>  设置目标拖拽时的样式
							 :sort  ===>  是否开启排序
							 :list  ===>  被绑定的数组-->
						<Draggable
							animation="300"
							:group="{				//实现不同数组之间相互拖拽
								name:'form',		//组名
								pull:'clone',		//是否允许脱出当前组'clone'克隆/复制，若不选该属性则会在拖拽时将原本显示的组件拖到展示页面上
								put:false,			//是否允许拖入当前组,组内的元素相互之间拖拽进入
							}"							
							chosen-class="chosenClass"				
							drag-class="daragClass"
							ghost-class="ghostClass"
							:sort="false"
							:list="item.list"
							item-key="name"
						>
							<template #item="{ element }">	
								<li class="formCmp">{{ element.label }}</li>
							</template>
						</Draggable>
					</ul>
				</li>
			</ul>
		</el-col>
		<el-col :span="16" class="midVue">中间显示
			<form-center ref="formCenter"></form-center>
		</el-col>
		<el-col :span="4" class="rightVue">右侧属性</el-col>
	</el-row>
</template>

<script>
	import formCmpConfig from "../config/FormCmpConfig.js";			//导入配置项
	import formCenter from "../components/FormCenter.vue";
	import {ref} from "@vue/reactivity";						//VUE3.0导入ref函数用于访问元素节点
	import {getCurrentInstance,provide} from "@vue/runtime-core";
	import { toRaw } from '@vue/reactivity'
	/*VUE3.0中所有组件所用到的数据，方法等均要配置在setup中
	setup的两种返回值：（1）返回一个对象，为模板提供数据，在模板中可直接使用此对象中的所有属性和方法
					 （2）若返回一个渲染函数：则可以以自定义渲染内容
		setup函数不能加async函数，因为其返回值不是return对象，而是promise*/
		
	export default{
		name:"form-design",			//在使用<script  setup>的单文件组件时，vue会根据组件文件名自动推导出name属性
		components: { formCenter,  },
		setup() {												
			let configList = ref(formCmpConfig);					//获取左侧组件列表数据
			let formDesign = ref(getCurrentInstance());				//获取当前组件实例并响应式
			console.log(formDesign.value);
			provide("formDesign",formDesign);						//依赖注入
			// const { proxy }  = getCurrentInstance();
			// console.log(JSON.stringify(proxy.$data))
			// console.log(JSON.stringify(proxy.$props))
			// console.log(JSON.stringify(proxy.$el))
			// console.log(JSON.stringify(proxy.$options))
			// console.log(JSON.stringify(proxy.$parent))
			// console.log(JSON.stringify(proxy.$root))
			// console.log(JSON.stringify(proxy.$slots))
			// console.log(JSON.stringify(proxy.$refs))
			// console.log(JSON.stringify(proxy.$attrs))
			// var list = toRaw(proxy)
			// console.log(list)
			console.log(import.meta.env)
			//配置表单属性
			let formInfo = ref({
				formSize: "mini",
				formItemLabelWidth: 40,
				formItemList: [],		//表单中的组件
			})
			return{
				configList,
				formInfo,
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-row {
	  margin: 0 !important;
	  padding-top: 50px;
	  .el-col {
	    // padding: 0 !important;
	    // margin: 0 5px;
	    // border: 1px solid #ccc;
	  }
	}
	ul,li{
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.leftVue>ul{
		border: 1px solid #ccc;
	}
	/*自定义要拖拽元素的样式*/
	.ghostClass {
	  border-top: 5px solid #4395ff;
	}
	/* 选中的样式 */
	.chosenClass {
	  opacity: 0.7;
	}
	/* 拖动的样式 */
	.dragClass {
	  background-color: #fff !important;
	  opacity: 0.7 !important;
	  border: 2px dashed #4395ff !important;
	  box-shadow: none !important;
	  outline: none !important;
	  background-image: none !important;
	}
	.formCpmTitle {
	  text-align: left;
	  color: rgba(0, 0, 0, 0.85);
	  font-size: 14px;
	  .title {
	    padding: 10px;
	    background-color: rgba(107, 107, 107, 0.1);
	  }
	  > ul {
	    > div {
	      width: 100%;
	      display: flex;
		  flex-wrap: wrap;
	    }
	    .formCmp {
	      font-size: 12px;
	      color: rgb(85, 85, 85);
	      min-width: 93px;
	      text-align: center;
	      border: 1px solid #ccc;
	      border-radius: 5px;
	      margin: 5px;
	      padding: 5px;
	      &:hover {
	        cursor: move;
	        color: #4395ff;
	        box-shadow: 1px 1px 2px 1px #4395ff;
	      }
	    }
	  }
	}
</style>