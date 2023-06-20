<template>
<div id="teamPage">
  <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch"/>
  <team-card-list :teamList = "teamList" />
  <van-empty v-if="teamList?.length < 1" description="请稍等片刻" />
</div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast,} from "vant";
import TeamCardList from "../components/TeamCardList.vue";

const router = useRouter()
const searchText = ref('')
const teamList = ref([])

/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get('/team/list/my/join',{
    params: {
      searchText: val,
      pageNum: 1,
    },
  });
  if (res?.code === 0){
    teamList.value = res.data;
  } else {
    showFailToast("加载队伍失败，请刷新重试");
  }
}

const onSearch =  (val) => {
  listTeam(val)
}

//页面加载时触发一次
onMounted( () => {
  listTeam();

})
</script>

<style scoped>

</style>