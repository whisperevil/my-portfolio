<template>
  <div class="timeline-node">
    <div class="timeline-dot"><span class="dot-inner"></span></div>
    <div class="timeline-content card">
      <span class="timeline-time">{{ time }}</span>
      <h3 class="timeline-title">{{ title }}</h3>
      <p class="timeline-desc">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  time: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
})
</script>

<style scoped>
.timeline-node {
  position: relative;
  padding-left: 40px;
  padding-bottom: 28px;
}
.timeline-node:last-child { padding-bottom: 0; }
.timeline-node::before {
  content: '';
  position: absolute;
  left: 18px;
  top: 12px;
  bottom: 0;
  width: 2px;
  background: var(--purple);
}
.timeline-node:last-child::before { display: none; }
.timeline-dot {
  position: absolute;
  left: 10px;
  top: 6px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--purple);
  box-shadow: 0 0 12px rgba(176, 59, 187, 0.2);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dot-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--purple);
}
.timeline-content {
  padding: 18px 22px;
}
.timeline-content:hover {
  border-color: var(--purple);
  box-shadow: 0 4px 24px rgba(176, 59, 187, 0.12);
  transform: translateX(4px);
}
.timeline-time {
  display: inline-block;
  padding: 2px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--purple-light);
  background: rgba(176, 59, 187, 0.08);
  border: 1px solid rgba(176, 59, 187, 0.15);
  margin-bottom: 10px;
}
.timeline-title {
  margin: 0 0 6px;
  font-size: 17px;
  font-weight: 500;
  color: var(--white);
}
.timeline-desc {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}
</style>
