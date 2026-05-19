<template>
  <div class="project-detail">
    <div v-if="project" class="detail-container">
      <button class="btn-back" @click="goBack">← 返回列表</button>

      <div class="detail-header">
        <h1 class="detail-title">{{ project.title }}</h1>
        <span class="detail-status" :class="project.status">
          {{ project.status === 'completed' ? '✔ 完成' : '◎ 进行中' }}
        </span>
      </div>

      <div class="detail-cover card">
        <img :src="project.cover" :alt="project.title" />
      </div>

      <div class="detail-body card">
        <h3>📖 项目描述</h3>
        <p class="detail-desc">{{ project.description }}</p>

        <h3>🔧 技术栈</h3>
        <div class="tech-list">
          <span v-for="tech in project.techStack" :key="tech" class="tech-item">{{ tech }}</span>
        </div>

        <h3>🏷 标签</h3>
        <div class="tag-list">
          <span v-for="tag in project.tags" :key="tag" class="tag-item">{{ tag }}</span>
        </div>

        <div v-if="project.demo || project.github" class="links">
          <a v-if="project.demo" :href="project.demo" target="_blank" class="link-btn demo">▶ 在线演示</a>
          <a v-if="project.github" :href="project.github" target="_blank" class="link-btn github">⌘ 查看源码</a>
        </div>

        <div v-if="project.images && project.images.length" class="detail-gallery">
          <h3>{{ isMotionProject ? '🎬 动效展示' : '🖼 作品展示' }}</h3>
          <div class="gallery-grid">
            <div v-for="(row, ri) in galleryRows" :key="ri" class="gallery-row">
              <div v-for="(file, ci) in row" :key="ci" class="gallery-item card">
                <img v-if="!isVideo(file)" :src="file" :alt="project.title" />
                <video v-else :src="file" controls playsinline></video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 上下项目导航 -->
      <div class="detail-nav">
        <button v-if="prevProject" class="nav-btn" @click="goToProject(prevProject.id)">
          ← {{ prevProject.title }}
        </button>
        <span v-else></span>
        <button v-if="nextProject" class="nav-btn" @click="goToProject(nextProject.id)">
          {{ nextProject.title }} →
        </button>
      </div>
    </div>

    <div v-else class="not-found-state">
      <h2>(´；ω；`) 项目未找到</h2>
      <p>抱歉，没有找到对应的项目。</p>
      <router-link to="/projects" class="btn-back">返回项目列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projects, getProjectById } from '../data/projects.js'

const route = useRoute()
const router = useRouter()

const project = ref(null)

const isMotionProject = computed(() =>
  project.value && project.value.tags.includes('动画动效')
)

const projectList = computed(() => projects.value)
const currentIndex = computed(() =>
  projectList.value.findIndex(p => p.id === project.value?.id)
)
const prevProject = computed(() =>
  currentIndex.value > 0 ? projectList.value[currentIndex.value - 1] : null
)
const nextProject = computed(() =>
  currentIndex.value < projectList.value.length - 1 ? projectList.value[currentIndex.value + 1] : null
)

watch(() => route.params.id, (id) => {
  project.value = getProjectById(id)
}, { immediate: true })

const galleryRows = computed(() => {
  if (!project.value?.images) return []
  const groups = []
  let catGroup = []
  let badgeGroup = []
  for (const file of project.value.images) {
    if (file.includes('小猫')) {
      catGroup.push(file)
    } else if (file.includes('徽章') || file.includes('按钮')) {
      badgeGroup.push(file)
    } else {
      groups.push([file])
    }
  }
  if (badgeGroup.length) groups.push(badgeGroup)
  if (catGroup.length) groups.push(catGroup)
  return groups
})

function isVideo(file) {
  return file.endsWith('.mp4')
}

function goBack() {
  router.push({ name: 'ProjectList' })
}

function goToProject(id) {
  router.push({ name: 'ProjectDetail', params: { id } })
}
</script>

<style scoped>
.project-detail { max-width: 860px; margin: 0 auto; padding: 40px 20px; }
.btn-back {
  display: inline-block;
  padding: 8px 20px;
  border-radius: var(--radius);
  border: 2px solid var(--border);
  background: transparent;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  transition: all 0.25s ease;
}
.btn-back:hover {
  border-color: var(--purple);
  color: var(--purple-light);
  box-shadow: 0 0 12px rgba(176, 59, 187, 0.1);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}
.detail-title {
  font-size: 28px;
  font-weight: 500;
  margin: 0;
  color: var(--white);
}
.detail-status {
  padding: 4px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}
.detail-status.completed {
  background: rgba(176, 59, 187, 0.12);
  color: var(--purple-light);
  border: 1px solid rgba(176, 59, 187, 0.25);
}
.detail-status.ongoing {
  background: rgba(176, 59, 187, 0.12);
  color: var(--purple-light);
  border: 1px solid rgba(176, 59, 187, 0.25);
}

.detail-cover {
  overflow: hidden;
  margin-bottom: 28px;
  padding: 4px;
}
.detail-cover img { width: 100%; max-height: 400px; object-fit: cover; border-radius: calc(var(--radius) - 2px); display: block; }

.detail-body { padding: 28px; margin-bottom: 24px; }
.detail-body h3 {
  font-size: 17px;
  font-weight: 500;
  color: var(--white);
  margin: 24px 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.detail-body h3:first-child { margin-top: 0; }
.detail-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.8;
}
.tech-list, .tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
.tech-item {
  padding: 4px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-secondary);
  border: 1px solid var(--border-light);
}
.tag-item {
  padding: 4px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: rgba(176, 59, 187, 0.08);
  color: var(--purple-light);
  border: 1px solid rgba(176, 59, 187, 0.15);
}
.links { display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap; }
.link-btn {
  padding: 10px 26px;
  border-radius: var(--radius);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}
.link-btn.demo {
  background: var(--purple);
  color: #fff;
}
.link-btn.demo:hover {
  box-shadow: 0 6px 24px rgba(176, 59, 187, 0.3);
  transform: translateY(-2px);
}
.link-btn.github {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-secondary);
  border: 2px solid var(--border);
}
.link-btn.github:hover {
  border-color: var(--purple);
  color: var(--purple-light);
  transform: translateY(-2px);
}

.motion-section {
  margin-top: 28px;
  padding: 20px;
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.02);
  border: 2px dashed var(--border);
}
.motion-placeholder { text-align: center; padding: 32px; color: var(--text-muted); }
.motion-placeholder .hint { font-size: 13px; margin-top: 8px; }
.motion-placeholder code {
  background: rgba(255, 255, 255, 0.04);
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--purple-light);
  border: 1px solid var(--border-light);
}

.detail-nav {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
.nav-btn {
  padding: 8px 20px;
  border-radius: var(--radius);
  border: 2px solid var(--border);
  background: transparent;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease;
}
.nav-btn:hover {
  border-color: var(--purple);
  color: var(--purple-light);
  box-shadow: 0 0 12px rgba(176, 59, 187, 0.1);
}

.detail-gallery { margin-top: 28px; }
.detail-gallery h3 { margin-bottom: 16px; }
.gallery-grid { display: flex; flex-direction: column; gap: 16px; }
.gallery-row { display: flex; gap: 16px; }
.gallery-item {
  flex: 1;
  overflow: hidden;
  padding: 4px;
  min-width: 0;
}
.gallery-item img,
.gallery-item video {
  width: 100%;
  height: auto;
  display: block;
  border-radius: calc(var(--radius) - 1px);
}

.not-found-state { text-align: center; padding: 100px 0; }
.not-found-state h2 { font-size: 24px; color: var(--white); margin: 0 0 8px; }
.not-found-state p { color: var(--text-muted); margin: 0 0 24px; }
</style>
