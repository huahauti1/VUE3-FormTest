<template>
	<div class="center">
		<el-form
		  label-position="left"
		  :label-width="`${formDesign.formInfo.formItemLabelWidth}px`"
		  :size="`${formDesign.formInfo.formSize}`"
		>
			<ul class="centerFormCmpS">
				<draggable class="dargCmpS"
				:group="{name:'form'}"
				:animation="300"
				chosen-class="chosenClass"
				drag-class="daragClass"
				ghost-class="ghostClass"
				:list="formComponents"
				item-key="formItemId"
				@add="handelFormCmpDragAdd"
				>
					<template #item="{element}">
						<div>
							<li class="dragComponent"
							@click="handelFormComponentClick(element)"
							:class="
								element.formItemId === formDesign.formCmpId.id ? 'active' : '' ">
							</li>
							<formCmpUI :formComponent="element"></formCmpUI>
							<el-icon
								@click="handleFormCmpDelet(element.formItemId)"
								v-show="element.formItemId === formDesign.formCmpId.id">
								<Delete />
							</el-icon>
							<el-icon
								v-show="element.formItemId === formDesign.formCmpId.id"
								@click="handleFoemCmpCopy(element)">
								<CopyDocument />
							</el-icon>
						</div>
						
					</template>
				</draggable>
			</ul>
		</el-form>
	</div>
</template>

<script>
	import {computed,inject} from "vue";
	import formCmpUI from "../formCmpUi/FormCmpUi.vue"
	export default{
		name:"form-center",
		components:{
			formCmpUI,
		},
		setup(){
			//获取父组件FormDesign传过来的实例formDesign
			let ctx = inject("formDesign");
			let formDesign = computed(()=>{
				//利用计算机属性获取实例FormDesign的实例ctx
				return ctx.value;
			});
			// console.log(formDesign)
			let formComponents = computed(()=>{
				//利用计算机属性将formDesign的formInfo.formItemList赋值给formComponents
				return formDesign.value.formInfo.formItemList || [];
			});
			//拖动新增组件
			//evt对象包含被拖拽元素的实例，详见draggable官方文档add事件
			const handelFormCmpDragAdd = (evt)=>{
				console.log(evt)
				//获取darggable组件列表新增项的下标
				const newIndex = evt.newIndex;
				const formCmp = JSON.parse(
					JSON.stringify(formComponents.value[newIndex])
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
				
				formDesign.value.formCmpId.id = formCmp.formItemId; // 将新增项的formItemId赋值给formDesign.formCmpId 用于判定是否选中
				
				formDesign.value.myIndex.index = newIndex;
				formComponents.value[newIndex] = formCmp;
			};
			// 点击新增组件
			const handelFormCmpClickAdd = (cmp) => {
			  const newCmp = JSON.parse(JSON.stringify(cmp));
			  if (!newCmp.formItemId) {
			    newCmp.formItemId = // 生成唯一id
			      newCmp.type +
			      "_" +
			      Date.now() +
			      "_" +
			      Math.ceil(Math.random() * 99999);
			  }
			  formDesign.value.formCmpId.id = newCmp.formItemId;
			  formComponents.value[formComponents.value.length] = newCmp;
			};
			// 中间区域组件点击
			const handelFormComponentClick = (e) => {
			  formDesign.value.formCmpId.id = e.formItemId; // 将点击项的formItemId赋值给formDesign.formCmpId 用于判定是否选中in
			};
			// 组件删除
			const handleFormCmpDelet = (id) => {
			  formComponents.value.forEach((item, index) => {
			    if (item.formItemId === id) {
			      formComponents.value.splice(index, 1);
			    }
			  });
			};
			// 组件复制
			const handleFoemCmpCopy = (cmp) => {
			  const newCmp = JSON.parse(JSON.stringify(cmp));
			  newCmp.formItemId = // 生成唯一id
			    newCmp.type + "_" + Date.now() + "_" + Math.ceil(Math.random() * 99999);
			  formDesign.value.formCmpId.id = newCmp.formItemId;
			  formComponents.value[formComponents.value.length] = newCmp;
			};
			return{
				formDesign,
				formComponents,
				handelFormCmpDragAdd,
				handelFormCmpClickAdd,
				handelFormComponentClick,
				handleFormCmpDelet,
				handleFoemCmpCopy,
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
.center {
  border-top: 1px solid #ccc;
  min-height: 80vh;
  overflow: hidden;
  .dargCmpS {
    min-height: 80vh;
    padding: 5px;
    .dragComponent {
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
    :deep(.el-form-item__label) {
      white-space: nowrap;
      margin-right: 20px;
    }
  }
}

// 动画
.slide-right {
  animation: slide-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1;
}
@keyframes slide-right {
  0% {
    transform: translateX(-100px);
    opacity: 0.1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.slide-out-left {
  animation: slide-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) 1; // 移出
}
@keyframes slide-out-left {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px);
    opacity: 0;
  }
}
</style>