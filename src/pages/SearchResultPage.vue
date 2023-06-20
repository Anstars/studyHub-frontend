<template>
  <user-card-list :loading="loading" :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import { showSuccessToast, showFailToast } from 'vant';
import myAxios from "../plugins/myAxios";
import qs from 'qs'

const route = useRoute();
const {tags} = route.query;
const userList = ref([]);

const loading = ref(true);

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params,{indices:false})
    }
  })
  .then(function (response) {
    console.log('/user/search/tags succeed',response);
    // showSuccessToast('请求成功');
    return response?.data;
  })
  .catch(function (error) {
    console.log('/user/search/tags error',error);
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

// const mockUser = ref({
//   id: 1,
//   userName: 'lizh',
//   userAccount: 'lizh',
//   profile: '努力活着，活得更好,啦啦啦啦啦啦啦啦啦阿巴阿巴八八八',
//   gender: '男',
//   phone: '12345',
//   email: '1253728@qq.com',
//   planetCode: '123',
//   tags: ['java', 'emo', '打工中', 'emo', '打工中'],
//   avatar: 'https://p3-passport.byteimg.com/img/user-avatar/4662379aea1f9d583d9fa7dd868c4ff7~180x180.awebp',
//   gmtCreate: new Date().toDateString()
// })

</script>

<style scoped>

</style>