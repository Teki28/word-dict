<template>
  <div class="demo-progress">
    <el-progress :percentage="100" status="success" />
  </div>
</template>

<script lang="ts" setup>
const format = percentage => (percentage === 100 ? 'Full' : `${percentage}%`)
</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>