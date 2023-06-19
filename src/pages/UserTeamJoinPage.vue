<template>
<div id="teamPage">
  <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch"/>
  <team-card-list :teamList = "teamList" />
  <van-empty v-if="teamList?.length < 1" description="请稍等片刻" />
</div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast,} from "vant";
import TeamCardList from "../components/TeamCardList.vue";

const router = useRouter()
const searchText = ref('')
const value = ref('');
const teamList = ref([])
const loading = ref(true);

/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = '',status = 0) => {
  const res = await myAxios.get('/team/list/my/join',{
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0){
    teamList.valueOf = res.data;
  } else {
    showFailToast("加载失败，请刷新重试");
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