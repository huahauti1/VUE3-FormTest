<template>
  <el-form>
    <el-form-item v-for="(item, index) in newCmpList" :key="index">
      <form-cmp-ui :formComponent="item"></form-cmp-ui>
    </el-form-item>
  </el-form>
</template>

<script>
import formCmpUi from "../formCmpUi/FormCmpUi.vue"
import { computed, ref } from "@vue/reactivity";
export default {
  name: "form-viewer",
  components: { formCmpUi },
  props: {
    formInfo: Object,
  },
  setup(props) {
    let myFormInfo = computed(() => {
      return props.formInfo;
    });
    let cmpList = computed(() => {
      return myFormInfo.value.formItemList;
    });
    let newCmpList=ref(JSON.parse(JSON.stringify(cmpList.value)))
    return {
      myFormInfo,
      cmpList,
      newCmpList
    };
  },
};
</script>

<style>
</style>