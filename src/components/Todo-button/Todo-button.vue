<template>
  <div class="btn-group btn-container mt-3" role="group" aria-label="Basic example">
    <button type="button" class="btn" :class="active === 0 ? 'btn-primary' : 'btn-secondary'" @click="onClickBtn(0)">ALL</button>
    <button type="button" class="btn" :class="active === 1 ? 'btn-primary' : 'btn-secondary'" @click="onClickBtn(1)">Finish</button>
    <button type="button" class="btn" :class="active === 2 ? 'btn-primary' : 'btn-secondary'" @click="onClickBtn(2)">Unfinish</button>
  </div>
</template>

<script>
export default {
  name: "TodoButton",
  emits: ['update:active'],
  props: {
    active: {
      type: Number,
      required: true,
      default: 1,
    }
  },
  methods: {
    onClickBtn (index) {
      if (index === this.active) return
      this.$emit('update:active', index)
    }
  }
}
</script>

<style lang="less" scoped>
.btn-container {
  width: 20rem;
  text-align: center;
}
</style>