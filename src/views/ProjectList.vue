<template>
  <div class="project-list">
    <h1 class="page-title">✦ 项目列表 ✧</h1>

    <!-- 筛选 -->
    <div class="filters card">
      <div class="filter-group">
        <span class="filter-label">状态：</span>
        <button
          v-for="s in statusOptions"
          :key="s.value"
          class="filter-btn"
          :class="{ active: currentStatus === s.value }"
          @click="setStatus(s.value)"
        >{{ s.label }}</button>
      </div>
      <div class="filter-group">
        <span class="filter-label">标签：</span>
        <TagList :tags="allTags" selectable @select="onTagSelect" />
      </div>
    </div>

    <!-- 项目卡片 -->
    <div v-if="filteredProjects.length" class="project-grid">
      <ProjectCard
        v-for="item in filteredProjects"
        :key="item.id"
        :project="item"
        @click="goToDetail"
      />
    </div>
    <div v-else class="empty">
      <p>(´；ω；`) 暂无匹配的项目</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { projects } from '../data/projects.js'
import ProjectCard from '../components/ProjectCard.vue'
import TagList from '../components/TagList.vue'

const router = useRouter()

const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '已完成', value: 'completed' },
  { label: '进行中', value: 'ongoing' }
]

const allTags = [...new Set(projects.value.flatMap(p => p.tags))]

const currentStatus = ref('all')
const selectedTags = ref([])

const filteredProjects = computed(() => {
  return projects.value.filter(p => {
    if (currentStatus.value !== 'all' && p.status !== currentStatus.value) return false
    if (selectedTags.value.length && !selectedTags.value.some(t => p.tags.includes(t))) return false
    return true
  })
})

function setStatus(val) { currentStatus.value = val }
function onTagSelect(tags) { selectedTags.value = tags }
function goToDetail(id) {
  router.push({ name: 'ProjectDetail', params: { id } })
}
</script>

<style scoped>
.project-list { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }

.filters {
  padding: 18px 22px;
  margin-bottom: 28px;
}
.filter-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}
.filter-group:last-child { margin-bottom: 0; }
.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  min-width: 44px;
}
.filter-btn {
  padding: 5px 16px;
  border-radius: 8px;
  border: 2px solid var(--border-light);
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.25s ease;
}
.filter-btn:hover {
  border-color: var(--purple);
  color: var(--purple-light);
}
.filter-btn.active {
  background: rgba(176, 59, 187, 0.2);
  border-color: var(--purple);
  color: var(--purple-light);
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 22px;
}
.empty {
  text-align: center;
  padding: 80px 0;
  color: var(--text-muted);
  font-size: 16px;
}
</style>
