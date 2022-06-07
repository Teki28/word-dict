<template>
  <div>
    <ul>
      <li v-for="(val,key) in wordList">
        {{key}} : {{val}}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

var obj = new Object();
for (var i = 0; i < localStorage.length; i++) {

  var key = localStorage.key(i);
  var val = localStorage.getItem(key);
  obj[key] = val;
}
console.log(obj);
const wordList = reactive(obj)
console.log(wordList);
</script>

<style>
</style>