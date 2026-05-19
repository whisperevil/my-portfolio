<template>
  <div class="project-card card" @click="$emit('click', project.id)">
    <div class="card-cover">
      <img :src="project.cover" :alt="project.title" />
      <span class="card-status" :class="project.status">
        {{ project.status === 'completed' ? '✔ 完成' : '◎ 进行中' }}
      </span>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ project.title }}</h3>
      <p class="card-desc">{{ project.description }}</p>
      <div class="card-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="card-techs">
        <span v-for="tech in project.techStack" :key="tech" class="tech">{{ tech }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true }
})
defineEmits(['click'])
</script>

<style scoped>
.project-card {
  overflow: hidden;
  cursor: pointer;
}
.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--purple);
  box-shadow: 0 8px 32px rgba(176, 59, 187, 0.18);
}
.card-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
}
.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.project-card:hover .card-cover img {
  transform: scale(1.05);
}
.card-status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(6px);
}
.card-status.completed {
  background: rgba(176, 59, 187, 0.2);
  color: var(--purple-light);
  border: 1px solid rgba(176, 59, 187, 0.3);
}
.card-status.ongoing {
  background: rgba(176, 59, 187, 0.2);
  color: var(--purple-light);
  border: 1px solid rgba(176, 59, 187, 0.3);
}
.card-body { padding: 18px; }
.card-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 500;
  color: var(--white);
}
.card-desc {
  margin: 0 0 14px;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-tags { margin-bottom: 8px; display: flex; flex-wrap: wrap; gap: 4px; }
.tag {
  display: inline-block;
  padding: 2px 10px;
  font-size: 11px;
  font-weight: 500;
  border-radius: 6px;
  background: rgba(176, 59, 187, 0.08);
  color: var(--purple-light);
  border: 1px solid rgba(176, 59, 187, 0.15);
}
.tech {
  display: inline-block;
  padding: 2px 8px;
  margin: 0 4px 4px 0;
  font-size: 11px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  border: 1px solid var(--border-light);
}
</style>
