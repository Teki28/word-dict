<template>
  <header>
    <h2 class="title">{{wordVal ? wordVal : 'dictionary'}}</h2>

    <input type="text" placeholder="Search a Word" v-model="wordVal" @input="emit('update:modelValue',$event.target.value)" :class="bw==true?'input-day':'input-night'">

    <!-- <el-button @click="showMyWordList">My Word List </el-button> -->
    <el-badge :value="Object.keys(wordList).length" :max="99" class="item">
      <el-button type="info" style="margin-left: 16px" @click="drawer = true">
        WordList
      </el-button>
    </el-badge>

    <el-drawer v-model="drawer" title="I am the title" :with-header="false" :class="bw==true?'el-drawer-night':'el-drawer-day'">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item v-for="(meaning,word) in wordList" :key="word" :title="word" :name="word">
          <div>
            {{meaning}}
            <el-row>
              <a href="javascipt:void(0)" @click.prevent="deleteword(word)">
                <el-icon :size="size" :color="'black'">
                  <Delete />
                </el-icon>
              </a>
            </el-row>
          </div>

        </el-collapse-item>
      </el-collapse>
    </el-drawer>

  </header>
</template>

<script setup>
import { ref, reactive, onUpdated, onMounted } from 'vue';
import { ElMessage } from 'element-plus'


const wordVal = ref();
const emit = defineEmits(['update:modelValue', 'show']);
const ifShow = ref(false)
const drawer = ref(false)
const activeNames = ref(['1'])
const props = defineProps({
  bw: Boolean
})


// Change show status for WordList component
// function showMyWordList () {
//   ifShow.value = !ifShow.value
//   emit('show', ifShow.value)
//   for (var i = 0; i < localStorage.length; i++) {
//     console.log(localStorage.key(i));
//     console.log(localStorage.getItem(localStorage.key(i)));
//   }
// }
var obj = new Object();
for (var i = 0; i < localStorage.length; i++) {

  var key = localStorage.key(i);
  var val = localStorage.getItem(key);
  obj[key] = val;
}
var wordList = reactive(obj)


// window.onload = () => {
//   window.addEventListener("setItemEvent", function (e) {
//     console.log('chanded');
//     for (var i = 0; i < localStorage.length; i++) {

//       var key = localStorage.key(i);
//       var val = localStorage.getItem(key);
//       obj[key] = val;
//     }
//   })
// }
onMounted(() => {
  window.addEventListener("setItemEvent", function (e) {
    console.log('aaaaaaaaaaaaa');
    for (var i = 0; i < localStorage.length; i++) {

      var key = localStorage.key(i);
      var val = localStorage.getItem(key);
      wordList.key = val
      // var obj = {};
      // obj[key] = val;
    }
  })

})

function deleteword (word) {
  console.log(word);
  localStorage.removeItem(word);

  const msg = () => {
    ElMessage({
      message: 'Successfully deleted',
      type: 'success',
      showClose: true,
      duration: 5000
    })
  }
  // location.reload();
  msg();
  setTimeout('location.reload()', 3000)
}


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
.input-day {
  width: 50vw;
  border: none;
  background-color: #282c34;
  border-bottom: 1px solid rgba(197, 188, 188);
  padding: 5px;
  font-size: 18px;
  color: white;
}
.input-night::-webkit-input-placeholder {
  color: #282c34;
}
.input-night {
  width: 50vw;
  border: none;
  background-color: white;
  border-bottom: 1px solid rgba(197, 188, 188);
  padding: 5px;
  font-size: 18px;
  color: #282c34;
}
.input-wrap .item {
  margin-left: 10px;
}
input:focus {
  outline: none;
  border-bottom: 1px solid white;
}
input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
:deep(.el-drawer) {
  background-color: gainsboro !important;
}
:deep(.el-collapse-item__header) {
  background-color: gainsboro !important;
  color: black;
}
:deep(.el-collapse-item__wrap) {
  background-color: gainsboro !important;
  color: black;
}
:deep(.el-collapse-item__content) {
  background-color: gainsboro !important;
  color: black;
}
</style>