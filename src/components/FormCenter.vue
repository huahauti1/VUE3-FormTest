<template>
	<div class="formCenter">
		<el-form
		  label-position="left"
		  :label-width="`${formDesign.formInfo.formItemLabelWidth}px`"
		  :size="`${formDesign.formInfo.formSize}`"
		>
			<ul class="centerUL">
				<draggable class="dargCenter"
				:group="{name:'form'}"
				:animation="300"
				chosen-class="chosenClass"
				drag-class="daragClass"
				ghost-class="ghostClass"
				:list="formCmpUI"
				item-key="formItemId"
				@add="FormDragAdd"
				>
					<template #item="{element}">
						<li class="dargLi"
						:class="element.formItemId == formDesign.formCmpID.id ? 'active' : '' "></li>
						根据表单组件type渲染对应的UI组件
					</template>
				</draggable>
			</ul>
		</el-form>
	</div>
</template>

<script>
	import {computed,inject} from "vue";
	import formCmpUI from "@/formCmpUi/FormCmpUi.vue"
	export default{
		name:"form-center",
		components:{
			formCmpUI,
		},
		setup(){
			//获取父组件FormDesign传过来的实例formDesign
			let ctx = inject("formDesign");
			console.log(ctx)
			let formDesign = computed(()=>{
				//利用计算机属性获取实例FormDesign的实例ctx
				return ctx.value.ctx;
			});
			console.log("*********");
			// console.log(ctx);
			// console.log(formDesign);
			let formCmpUI = computed(()=>{
				//利用计算机属性将formDesign的formInfo.formItemList赋值给formComponents
				return formDesign.value.formInfo.formItemList || [];
			});
			//拖动新增组件
			//evt对象包含被拖拽元素的实例，详见draggable官方文档add事件
			const FormDragAdd = (evt)=>{
				console.log(evt)
				//获取darggable组件列表新增项的下标
				const newIndex = evt.newIndex;
				const formCmp = JSON.parse(
					JSON.stringify(formCmpUI.value[newIndex])
				);
				if(!formCmp.formItemId){
					//生成唯一ID
					formCmp.formItemId =
						formCmp.type +
						"_" +
						Date.now()+
						"_"+
						Math.ceil(Math.random()*99999);	//生成随机数
				}
				//增加数据
				formCmpUI.value[newIndex] = formCmp;
			};
			
			return{
				formDesign,
				formCmpUI,
				FormDragAdd
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
	  border: 2px dashed #4395ff !important;
	}
	/* 选中的样式 */
	.chosenClass {
	  border: 2px dashed #4395ff !important;
	}
	/* 拖动的样式 */
	.dragClass {
	  border: 3px dashed #4395ff !important;
	  transform: scale(1.1);
	}
	.formCenter {
	  border-top: 1px solid #ccc;
	  min-height: 80vh;
	  overflow: hidden;
	  .centerUL {
	    min-height: 80vh;
	    padding: 5px;
	    .dargLi {
	      position: relative;
	      padding: 5px;
	      border: 1px dashed #ccc;
	      margin: 10px 0;
	      background-color: aliceblue;
	      animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1; // 移入
	      &:hover {
	        background-color: #cde3ff;
	      }
	      i {
	        position: absolute;
	        top: 0;
	        background-color: #4395ff;
	        color: #000;
	        padding: 5px;
	        &:hover {
	          cursor: pointer;
	          color: #fff;
	        }
	      }
	      .el-icon-delete {
	        right: 20px;
	      }
	      .el-icon-copy-document {
	        right: 0;
	      }
	    }
	    .active {
	      border-top: 4px solid #4395ff;
	      background-color: #cde3ff;
	    }
	    /deep/.el-form-item__label {
	      white-space: nowrap;
	      margin-right: 20px;
	    }
	  }
	}
</style>