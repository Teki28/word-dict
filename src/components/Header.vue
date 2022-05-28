<template>
  <header>
    <h2 class="title">{{wordVal ? wordVal : '百京的爷就是爷'}}</h2>
    <div class="input-wrap">
      <input type="text" name="" id="" placeholder="Search a Word" v-model="wordVal" @input="$emit('update:modelValue',$event.target.value)">
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
const wordVal = ref();
defineEmits(['update:modelValue']);


</script>

<style scoped>
header {
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
h2 {
  font-size: 7vw;
  font-weight: 100;
  @media (max-width: 1000px;) {
    font: size 11vw;
  }
}
.input-wrap input {
  width: 50vw;
  border: none;
  background-color: #282c34;
  border-bottom: 1px solid rgba(197, 188, 188);
  padding: 5px;
  font-size: 18px;
  color: white;
}
input:focus {
  outline: none;
  border-bottom: 1px solid white;
}
input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
</style>