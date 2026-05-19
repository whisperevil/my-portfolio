<template>
  <div class="skills-page">
    <h1 class="page-title">✦ 技能树 ✧</h1>

    <div v-for="cat in categories" :key="cat" class="skill-category">
      <h2 class="category-title" :style="{ '--cat-clr': catColors[cat] || '#8b5cf6' }">
        <span>{{ catIcons[cat] }}</span> {{ cat }}
      </h2>
      <div class="skill-list card">
        <SkillBar
          v-for="skill in filteredByCategory(cat)"
          :key="skill.name"
          :name="skill.name"
          :level="skill.level"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { skills } from '../data/projects.js'
import SkillBar from '../components/SkillBar.vue'

const categories = ['绘画', '设计', '动效', '建模', '游戏']

const catColors = {
  '绘画': '#c100e0',
  '设计': '#b03bbb',
  '动效': '#e07aeb',
  '建模': '#8a2e94',
  '游戏': '#c856d3'
}

const catIcons = {
  '绘画': '◈',
  '设计': '◐',
  '动效': '✬',
  '建模': '▣',
  '游戏': '◇'
}

function filteredByCategory(cat) {
  return skills.value.filter(s => s.category === cat)
}
</script>

<style scoped>
.skills-page { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
.skill-category { margin-bottom: 36px; }
.category-title {
  font-size: 20px;
  font-weight: 500;
  color: var(--cat-clr, var(--purple));
  margin: 0 0 14px;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 2px solid var(--cat-clr, var(--purple));
}
.skill-list {
  padding: 22px;
}
</style>
