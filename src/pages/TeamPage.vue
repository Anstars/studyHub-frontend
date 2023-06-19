<template>
<div id="teamPage">
  <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
  <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>
  <team-card-list :teamList = "teamList" />
  <van-empty v-if="teamList?.length < 1" description="数据为空" />
</div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast,} from "vant";
import TeamCardList from "../components/TeamCardList.vue";

const router = useRouter()
const searchText = ref('')

const doJoinTeam = () => {
  router.push({
    path:"/team/add"
  })
}

const teamList = ref([])
const loading = ref(true);

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get('/team/list',{
    params: {
      searchText: val,
      pageNum: 1,
    },
  });
  console.log(res)
  if (res?.code === 0){
    teamList.value = res.data;
  } else {
    showFailToast("加载失败，请刷新重试");
  }
}

//页面加载时触发一次
onMounted( () => {
  console.log(teamList.value)
  listTeam();
})

const onSearch = (val) => {
  listTeam(val)
}


</script>

<style scoped>

</style>