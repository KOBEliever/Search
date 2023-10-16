<template>
  <a-list
      item-layout="horizontal"
      :grid="{ gutter: 16, column: 4 }"
      :data-source="props.pictureList"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable style="height: 300px">
          <template #cover>
            <img :src="item.url" />
          </template>
          <a-card-meta :description="item.title" />
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