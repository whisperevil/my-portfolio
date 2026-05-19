<template>
  <div class="tag-list">
    <span
      v-for="tag in tags"
      :key="tag"
      class="tag-item"
      :class="{ active: selectedTags.includes(tag), selectable: selectable }"
      :style="{ '--tag-clr': tagColors[tag] || '#8b5cf6', '--tag-bg': tagBgColors[tag] || 'rgba(139,92,246,0.08)' }"
      @click="handleSelect(tag)"
    >
      {{ tag }}
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tags: { type: Array, required: true },
  selectable: { type: Boolean, default: false }
})
const emit = defineEmits(['select'])

const tagColors = {
  'IP设计': '#c100e0',
  '矢量插画': '#d433f0',
  '游戏美术': '#06b6d4',
  '建模': '#e67e22',
  '动效设计': '#b03bbb'
}

const tagBgColors = {
  'IP设计': 'rgba(193,0,224,0.08)',
  '矢量插画': 'rgba(212,51,240,0.08)',
  '游戏美术': 'rgba(6,182,212,0.08)',
  '建模': 'rgba(230,126,34,0.08)',
  '动效设计': 'rgba(176,59,187,0.08)',
}

const selectedTags = ref([])

function handleSelect(tag) {
  if (!props.selectable) return
  const idx = selectedTags.value.indexOf(tag)
  if (idx !== -1) {
    selectedTags.value.splice(idx, 1)
  } else {
    selectedTags.value.push(tag)
  }
  emit('select', selectedTags.value)
}
</script>

<style scoped>
.tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
.tag-item {
  display: inline-block;
  padding: 4px 14px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  background: var(--tag-bg);
  color: #fdbbff;
  border: 2px solid transparent;
  transition: all 0.25s ease;
}
.tag-item.selectable {
  cursor: pointer;
  border-color: rgba(253, 187, 255, 0.25);
}
.tag-item.selectable:hover {
  border-color: #fdbbff;
  box-shadow: 0 0 12px rgba(176, 59, 187, 0.1);
}
.tag-item.active {
  background: #fdbbff !important;
  color: #6d007a !important;
  border-color: #fdbbff !important;
}
</style>
