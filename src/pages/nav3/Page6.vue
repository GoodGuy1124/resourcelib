<template>
<el-switch
  v-model="value1"
  on-text=""
  off-text="">
</el-switch>

</template>
<script>
  export default {
    data() {
      return {
        value1: true,
        value2: true
      }
    }
  };
</script>