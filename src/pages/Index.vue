<template>
  <user-card-list :loading="loading" :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>
<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import { showSuccessToast, showFailToast } from 'vant';
import myAxios from "../plugins/myAxios";

const route = useRoute();
const {tags} = route.query;
const userList = ref([]);

const loading = ref(true);

onMounted(async () => {
  const userListData = await myAxios.get('/user/recommend', {
    params: {
      pageSize: 8,
      pageNum: 1,
    },
  })
      .then(function (response) {
        console.log('/user/recommend succeed',response);
        showSuccessToast('请求成功');
        return response?.data?.records;
      })
      .catch(function (error) {
        console.log('/user/recommend error',error);
        showFailToast('请求失败');
      })
  console.log(userListData)
  if (userListData){
    userListData.forEach(user => {
      if (user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
})


</script>

<style scoped>

</style>