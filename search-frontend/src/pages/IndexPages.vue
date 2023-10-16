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
        <PictureList :picture-list="pictureList" />
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

const router = useRouter();
const route = useRoute();
const activeKey = route.params.category;
const initSearchParams = {
  text : "",
  pageSize: 10,
  pageNum: 1,
};
const postList = ref([]);
const pictureList = ref([]);
const searchParam = ref(initSearchParams);
/**
 *
 */
const loadDataOld = ((params:any) => {
  const postQuery = {
    ...params,
    searchText: params.text,
  };
  myAxios.post('post/list/page/vo',postQuery).then((res:any) => {
    postList.value = res.records;
  })
  const pictureQuery = {
    ...params,
    searchText: params.text,
  };
  myAxios.post('picture/list/page/vo',pictureQuery).then((res:any) => {
    pictureList.value = res.records;
  })
})
const loadData = ((params:any) => {
  const query = {
    ...params,
    searchText: params.text,
  };
  myAxios.post('search/all',query).then((res:any) => {
    postList.value = res.postList;
    pictureList.value = res.pictureList;
  })
})
watchEffect(() => {
  searchParam.value = {
    ...initSearchParams,
    text: route.query.text,
  }as any
});

loadData(initSearchParams);
 const onSearch = (value : string) => {
   router.push({
     query : searchParam.value
   });
   loadData(searchParam.value);
 };

const onTabChange = (key : string) => {
  router.push({
    path : `/${key}`,
    query : searchParam.value,
  })
}
</script>
