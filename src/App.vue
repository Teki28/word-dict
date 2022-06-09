<template>
  <div class="common-layout">

    <header>

      <h1>Todo List</h1>
      <todo-input @add="onAddNewTask"></todo-input>
      <todo-list :list="tasklist" class="mt-2" @deleteItem="deleteItem"></todo-list>
      <todo-button v-model:active="activeBtnIndex"></todo-button>
    </header>
    <aside>
      <!-- <div class="demo-progress">
        <el-progress type="dashboard" :percentage="80">
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
            <span class="percentage-label">Progressing</span>
          </template>
        </el-progress>
      </div> -->
      <div class="demo-progress">
        <el-progress :text-inside="true" :percentage="finishPercent" :stroke-width="26" status="success">
          <el-button text style="color:white">{{finishPercent}}% finished</el-button>
        </el-progress>
      </div>
    </aside>
    <main>
      <calendar :todolist="this.todolist"></calendar>
    </main>

  </div>
</template>
 
<script>
import TodoList from './components/Todo-list.vue'
import TodoInput from './components/Todo-input/Todo-input.vue'
import TodoButton from './components/Todo-button/Todo-button.vue'
import Calendar from './components/Calendar.vue'
import Progress from './components/Progress.vue'

import 'element-plus/theme-chalk/display.css'

export default {
  name: 'MyApp',
  components: {
    TodoList,
    TodoInput,
    TodoButton,
    Calendar,
    Progress
  },
  data () {
    return {
      todolist: [

      ],
      nextId: 4,
      activeBtnIndex: 0,
      percent: this.finishPercent
    }
  },
  methods: {
    onAddNewTask (taskname, dt) {
      this.todolist.push({
        id:
          this.todolist.length == 0 ? 1 : this.todolist[this.todolist.length - 1].id + 1,
        task: taskname,
        done: false,
        time: dt
      })
      this.nextId++
    },
    deleteItem (id) {
      this.todolist = this.todolist.filter((item) => {
        return item.id !== id
      })
    }
  },
  computed: {
    tasklist () {
      switch (this.activeBtnIndex) {
        case 0:
          return this.todolist
        case 1:
          return this.todolist.filter(x => x.done)
        case 2:
          return this.todolist.filter(x => !x.done)
      }
    },
    finishPercent () {
      var finish = 0;
      var total = 0;
      if (this.todolist.length == 0) {
        return 0
      }

      this.todolist.forEach((item) => {
        finish += item.done
        total += 1
      })
      return parseInt((finish / total) * 100)
    }
  },
  mounted () {
    console.log('App mounted!');
    if (localStorage.getItem('todolist')) this.todolist = JSON.parse(localStorage.getItem('todolist'));
  },
  watch:
  {
    todolist:
    {
      handler () {
        console.log('Todos changed!');
        localStorage.setItem('todolist', JSON.stringify(this.todolist));
      },
      deep: true,
    },

  },
}
</script>

<style lang="less" scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.demo-progress .el-progress--line {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 20em;
}
</style>
