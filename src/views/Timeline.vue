<template>
  <div class="timeline-page">
    <h1 class="page-title">✦ 成长历程 ✧</h1>
    <div class="timeline-container">
      <TimelineItem
        v-for="(item, index) in timeline"
        :key="index"
        :time="item.time"
        :title="item.title"
        :description="item.description"
      />
    </div>
  </div>
</template>

<script setup>
import { timeline } from '../data/projects.js'
import TimelineItem from '../components/TimelineItem.vue'
</script>

<style scoped>
.timeline-page { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
.timeline-container { padding: 24px 0; }
</style>
