<template>
  <ul class="list-group">
    <li v-for="item in list" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
      <span class="form-group form-check">
        <input type="checkbox" class="form-check-input" :id="item.id" v-model="item.done">
        <label class="form-check-label" :for="item.id" :class="item.done ? 'delete' : ''">{{item.task}}</label>
      </span>
      <span>{{item.time}}
      </span>
      <el-button type="danger" link @click="deleteItem(item.id)" size="small">delete</el-button>

      <span class="badge badge-success" v-if="item.done">finish</span>
      <span class="badge badge-warning" v-else>unfinish</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    list: {
      type: Array,
      required: true,
      default: [],
    }
  },
  emits: [''],
  methods: {
    deleteItem (id) {
      this.$emit('deleteItem', id)
    }
  }
}
</script>

<style lang="less" scoped>
.list-group {
  width: 400px;
}

.delete {
  text-decoration: line-through;
  color: gray;
  font-style: italic;
}
</style>