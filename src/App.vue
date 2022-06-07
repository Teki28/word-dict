<template>
  <div :class="bw==true? 'container-night' : 'container-day'">
    <el-switch v-model="bw" class="mt-2 bw-position" style="margin-left: 24px" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" active-color="black" />
    <div class="input-wrap">
      <main>
        <Header v-model="searchWord" @show="showList" :bw='bw'></Header>
        <!-- <word-list v-show="showWordlist"></word-list> -->
        <Definition :searchWord='searchWord' :bw='bw'></Definition>
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Definition from './components/Definition.vue'
import WordList from './components/WordList.vue'
import { ref, watch } from 'vue';
import { Sunny, Moon } from '@element-plus/icons-vue'
const bw = ref(true)
const searchWord = ref();
const wordList = ref();
const showWordlist = ref();
function showList (val) {
  showWordlist.value = val;
  // console.log(showWordlist.value);
}

</script>

<style scoped>
.bw-position {
  position: absolute;
  left: 1vh;
  top: 1vh;
}
#app {
  margin-top: 0;
}
.container-night {
  height: 100vh;
  overflow: hidden;
  background-color: #282c34;
  color: white;
}
.container-day {
  height: 100vh;
  overflow: hidden;
  background-color: white;
  color: #282c34;
}
main {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
</style>