<template>
  <div class="definitions">
    <p v-if="!props.searchWord" class="tip">Start by typing a word in search...</p>
    <p v-else-if="props.searchWord && !result.length">
      Sorry,the definition of this word was not found
    </p>
    <div v-else class="definition" v-for="(definition,index) in result" :key="index">
      <div class="phonetics">
        <span class="phonetic" @click="handleClick(index)">
          {{definition?.phonetics[0]?.text}}
        </span>
        <i class="iconfont icon-shengyin" @click="handleClick(index)"></i>
        <audio :src="definition?.phonetics[0]?.audio" ref="audio"></audio>
        <el-button round class="addBTN" type="info" @click="addToList(index)">Add to Today's List</el-button>
      </div>
      <div class="meanings">
        <div class="meaning" v-for="(meaning,index) in definition.meanings" :key="index">
          <span :class="bw==true?'partOfSpeech-night':'partOfSpeech-day'">{{meaning.partOfSpeech}}</span>
          <span class="word-meaning">
            {{
              meaning.definitions.map(definition=>definition.definition).join(' ')
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { watch, ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  searchWord: String,
  bw: Boolean
});
watch(() => props.searchWord, getData)
const result = ref([]);
const audio = ref();
const wordInfo = ref({ word: 'aa', definition: 'bb', value: 'cc' })
function handleClick (index) {
  audio.value[index].currentTime = 0;
  audio.value[index].play();
}

async function getData (newValue) {
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + newValue;
  result.value = [];
  try {
    const data = await axios.get(url);
    result.value = data.data;
  } catch (err) {
    console.log(err);
  }
}

function addToList (index) {
  let info = '';
  // console.log(JSON.parse(JSON.stringify(result.value[index].meanings)));
  let arr = JSON.parse(JSON.stringify(result.value[index].meanings));
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i].partOfSpeech);
    info += arr[i].partOfSpeech;
    info += ' : '
    for (var j = 0; j < arr[i].definitions.length; j++) {
      // console.log(arr[i].definitions[j].definition);
      info += arr[i].definitions[j].definition;
      info += ' \n '
    }
    info += '\n'
    // localStorage.setItem(props.searchWord, wordInfo.value)
  }
  localStorage.setItem(props.searchWord, info);
  const msg = () => {
    ElMessage({
      message: 'Added to your word list',
      type: 'success',
      showClose: true,
      duration: 5000
    })
  }
  // location.reload();
  msg();


}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
}

.definitions {
  border: 10px solid #696969;
  border-radius: 10px;
  height: 65vh;
  padding: 15px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tip {
  font-size: 18px;
}

.definition {
  margin-bottom: 10px;

  .addBTN {
    margin-left: 50px;
  }

  .phonetics {
    margin-bottom: 10px;

    .phonetic {
      cursor: pointer;
      border-radius: 5px;
      margin-right: 10px;
      &:hover {
        opacity: 0.8;
      }
    }

    .iconfont {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  &:last-child {
    .meanings {
      border-bottom: none;
    }
  }

  .meanings {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #c5bcbc;

    div.meaning {
      .partOfSpeech-night {
        margin-right: 10px;
        background-color: darkgray;
        opacity: 0.8;
        display: inline-block;
        padding-block: 3px;
        padding-inline: 5px;
        font-size: 14px;
        border-radius: 5px;
        line-height: 25px;
      }
      .partOfSpeech-day {
        margin-right: 10px;
        background-color: whitesmoke;
        opacity: 0.8;
        display: inline-block;
        padding-block: 3px;
        padding-inline: 5px;
        font-size: 14px;
        border-radius: 5px;
        line-height: 25px;
      }
      .word-meaning {
        line-height: 25px;
      }
    }
  }
}
</style>