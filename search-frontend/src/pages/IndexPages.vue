<template>
  <div class="index_page">
    <a-input-search
        v-model:value="searchParam.text"
        placeholder="input search text"
        enter-button="Search"
        size="large"
        @search="onSearch"
    />
    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="Post">
        <PostList :post-list="postList"/>
      </a-tab-pane>
      <a-tab-pane key="picture" tab="Picture">
        <PictureList />
      </a-tab-pane>
      <a-tab-pane key="user" tab="User">
        <UserList />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">

import {ref, watchEffect} from "vue";
import PostList from "@/components/PostList.vue";
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";
import MyDivider from "@/components/MyDivider.vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "@/plugins/MyAxios";

const router = useRouter()
const route = useRoute();
const activeKey = route.params.category;
const initSearchParams = {
  text : "",
  pageSize: 10,
  pageNum: 1,
};
const postList = ref([]);
const searchParam = ref(initSearchParams)
myAxios.post('post/list/page/vo',{}).then((res:any) => {
  postList.value = res.records;
})
watchEffect(() => {
  searchParam.value = {
    ...initSearchParams,
    text: route.query.text,
  }as any
})
 const onSearch = (value : string) => {
   alert(value);
   router.push({
     query : searchParam.value
   })
 };

const onTabChange = (key : string) => {
  router.push({
    path : `/${key}`,
    query : searchParam.value
  })
}
</script>
