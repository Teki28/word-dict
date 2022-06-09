<template>
  <form @submit.prevent="onforSubmit">
    <div class="form-row align-items-center">
      <div class="col-auto">
        <label class="sr-only" for="inlineFormInput">Name</label>
        <input type="text" class="form-control mb-2" style="width:20rem;" placeholder="Input new task here" v-model.trim="taskname">
      </div>
      <div class="col-auto">
        <span class="demonstration">Default</span>
        <el-date-picker v-model="dt" type="datetime" placeholder="Select date and time" value-format="YYYY-MM-DD" />
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary mb-2">Add</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "TodoInput",
  data () {
    return {
      taskname: '',
      dt: ''
    }
  },
  methods: {
    onforSubmit () {

      if (!this.taskname) return alert('not null')

      this.$emit('add', this.taskname, this.dt)

      this.taskname = ""
    }
  },
}
</script>

<style lang="less" scoped>
</style>