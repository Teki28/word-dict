<template>
  <el-calendar v-model="value">
    <template #dateCell="{data}">
      <div class="calendar-item">
        <div class="calendar-time">
          {{ data.day.split('-').slice(2).join('')}}
        </div>
        <div>
          <span class="remark-text calendar-time" v-for="(item, index) in dealMyDate(data.day)" :key="index">
            {{ item }} <br>
          </span>
        </div>
      </div>
    </template>

  </el-calendar>
</template>

<script>
export default {
  data () {
    return {
      date: Date(),
    }
  },
  props: {
    todolist: Array
  },
  methods: {
    dealMyDate (v) {
      let res = [];
      for (var index = 0; index < this.todolist.length; index++) {

        if (this.todolist[index].time == v && this.todolist[index].done == false) {

          res.push(this.todolist[index].task)

        }
      }
      return res;
    }
  },
  // computed: {
  //   tododeal () {
  //     return this.todolist
  //   }
  // }
}
</script>

<style>
</style>