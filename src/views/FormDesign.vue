<template>
	<el-row  :gutter="20"  style="border: 1px solid black;">
		<el-col :span="4" class="leftVue">
			<!-- 左侧组件栏 -->
			<ul>
				<li class="formCpmTitle" v-for="(item,itemIndex) in componentsList" :key="itemIndex">
					<div class="title">{{item.title}}</div>
					<ul>
						<!-- chosen-class ===> 设置自定义样式，来区分当前哪个元素被选中
							 ghost-class ===>  设置目标位置占位符的样式及需要停靠的样式
							 drag-class ===>  设置目标拖拽时的样式
							 :sort  ===>  是否开启排序
							 :list  ===>  被绑定的数组-->
						<draggable
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
							@start="onStart"
							@end="onEnd"
						>
							<template #item="{ element }">	
								<li class="formCmp" @click="formCmpClick(element)">
									{{ element.label }}
								</li>
							</template>
						</draggable>
					</ul>
				</li>
			</ul>
		</el-col>
		<el-col :span="16" class="midVue">
		  <div class="operating-area">
		    <el-tooltip class="item" effect="dark" content="预览" placement="top">
		      <el-button @click="handlePreviewForm()"><el-icon><View /></el-icon></el-button>
		    </el-tooltip>
		    <el-tooltip class="item" effect="dark" content="清空" placement="top">
		      <el-button @click="handleClearForItemList()"><el-icon><Delete /></el-icon></el-button>
		    </el-tooltip>
		  </div>
		  <form-center ref="formCenter"></form-center>
		</el-col>
		<!-- 右侧配置项 -->
		<el-col :span="4" class="rightVue">
			<form-config :formCmpId="formCmpId"></form-config>
		</el-col>
		<!-- 表单预览 -->
		<el-dialog
		  v-model="dialogVisible"
		  title="表单预览"
		  width="40%"
		>
		  <form-viewer :formInfo='formInfo'></form-viewer>
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button @click="dialogVisible = false">Cancel</el-button>
		      <el-button type="primary" @click="dialogVisible = false"
		        >Confirm</el-button
		      >
		    </span>
		  </template>
		</el-dialog>
	</el-row>
</template>

<script>
	import formCmpConfig from "../config/FormCmpConfig.js";			//导入配置项
	import formCenter from "../components/FormCenter.vue";
	import formConfig from "../components/FormCmpConfig.vue";
	import formViewer from "../views/FormViewer.vue";
	import {ref,toRaw} from "@vue/reactivity";						//VUE3.0导入ref函数用于访问元素节点
	import {getCurrentInstance,provide} from "@vue/runtime-core";
	/*VUE3.0中所有组件所用到的数据，方法等均要配置在setup中
	setup的两种返回值：（1）返回一个对象，为模板提供数据，在模板中可直接使用此对象中的所有属性和方法
					 （2）若返回一个渲染函数：则可以以自定义渲染内容
		setup函数不能加async函数，因为其返回值不是return对象，而是promise*/
		
	export default{
		name:"form-design",			//在使用<script  setup>的单文件组件时，vue会根据组件文件名自动推导出name属性
		components: { formCenter, formConfig,formViewer},
		setup() {												
			// console.log(formDesign.value);
			let formDesign = ref(getCurrentInstance().proxy); // 获取实例并响应式
			console.log(ref(getCurrentInstance().proxy))
			let raw = toRaw(ref(getCurrentInstance().proxy).value);
			console.log(raw)
			provide("formDesign",formDesign);						//依赖注入
			let componentsList = ref(formCmpConfig); // 左侧组件列表数据
			let formCmpId = ref({
				id:null,	//当前选中的组件的id
			});
			let myIndex = ref({
				index:null,		//当前选中组件的下标
			});
			//配置表单属性
			let formInfo = ref({
				formSize: "small",
				formItemLabelWidth: 40,
				formItemList: [],		//表单中的组件
			});
			//定义ref=formCenter
			const formCenter = ref(null);
			//组件点击新增
			const formCmpClick = (cmp) =>{
				formCenter.value.handelFormCmpClickAdd(cmp);
			};
			// 弹窗展示
			const dialogVisible=ref(false)
			// 预览
			const handlePreviewForm=()=>{
			    dialogVisible.value=true
			}
			// 清空
			const handleClearForItemList = () => {
			  formInfo.value.formItemList = [];
			};
			const onStart=(evt)=>{
				console.log("开始拖拽");
				console.log(evt);
			}
			const onEnd=(evt)=>{
				console.log("结束拖拽");
				console.log(evt);
			}
			return{
				componentsList,
				formCmpId,
				formInfo,
				myIndex,
				formCenter,
				formCmpClick,
				dialogVisible,
				handlePreviewForm,
				handleClearForItemList,
				onStart,
				onEnd,
			}
		}
	}
</script>

<style lang="less" scoped>
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
/*定义要拖拽元素的样式*/
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
.el-row {
  margin: 0 !important;
  padding-top: 50px;
  .el-col {
    padding: 0 !important;
    // margin: 0 12px;
    border: 1px solid #ccc;
  }
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
.operating-area {
  padding-left: 20px;
  i {
    font-size: 16px;
    color: rgb(131, 131, 131);
    font-weight: 700;
    &:hover {
      color: #4395ff;
    }
  }
}
:deep(.el-tabs__nav-scroll) {
  padding-left: 30px;
}
:deep(.el-tabs__content) {
  padding: 0 10px;
}
:deep(.el-form-item__label) {
  text-align: left;
}
</style>