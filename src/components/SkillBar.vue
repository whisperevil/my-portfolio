<template>
  <div class="skill-bar-wrapper">
    <div class="skill-header">
      <span class="skill-name">{{ name }}</span>
      <span class="skill-level">{{ level }}%</span>
    </div>
    <div class="skill-track">
      <div
        class="skill-fill"
        :style="{ width: showedLevel + '%', background: barColor }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  level: { type: Number, required: true, validator: v => v >= 0 && v <= 100 },
  color: { type: String, default: '#8b5cf6' }
})

const showedLevel = ref(0)

const barColor = computed(() => {
  // hue=295° 固定紫色色相, 明度从 25% (level0) 到 85% (level100)
  const lightness = 25 + (props.level / 100) * 60
  return `hsl(295, 65%, ${lightness}%)`
})

onMounted(() => {
  setTimeout(() => {
    showedLevel.value = props.level
  }, 300)
})
</script>

<style scoped>
.skill-bar-wrapper { margin-bottom: 18px; }
.skill-bar-wrapper:last-child { margin-bottom: 0; }
.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.skill-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}
.skill-level {
  font-size: 13px;
  color: var(--text-muted);
  font-family: "Courier New", monospace;
}
.skill-track {
  height: 12px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border-light);
}
.skill-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
