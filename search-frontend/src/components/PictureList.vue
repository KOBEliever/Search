<template>
  <a-list
      item-layout="horizontal"
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
      :data-source="props.pictureList"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable>
          <template #cover>
            <img :src="item.url" />
          </template>
          <a-card-meta :title="item.title" />
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
//传入参数为pictureList
interface Props {
  pictureList: any[],
}
//默认为空列表
const props = withDefaults(defineProps<Props>(),{
  pictureList:() => []
})
</script>
<style scoped>

</style>