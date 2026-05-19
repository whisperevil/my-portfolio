<template>
  <div id="app" @mousemove="onMouseMove">
    <!-- 浮动符号装饰 -->
    <div class="float-symbols" aria-hidden="true">
      <span class="float-sym" style="top:15%;left:8%;animation-delay:0s;font-size:28px;--float-max:0.22">✦</span>
      <span class="float-sym" style="top:30%;right:6%;animation-delay:1.5s;font-size:22px;--float-max:0.28">✧</span>
      <span class="float-sym" style="top:55%;left:4%;animation-delay:3s;font-size:26px;--float-max:0.38">◈</span>
      <span class="float-sym" style="top:75%;right:10%;animation-delay:0.8s;font-size:20px;--float-max:0.48">✦</span>
      <span class="float-sym" style="top:90%;left:12%;animation-delay:2.2s;font-size:24px;--float-max:0.55">✧</span>
      <span class="float-sym" style="top:20%;right:15%;animation-delay:4s;font-size:18px;--float-max:0.25">◇</span>
      <span class="float-sym" style="top:65%;left:2%;animation-delay:1.2s;font-size:22px;--float-max:0.42">✦</span>
      <span class="float-sym" style="top:40%;right:3%;animation-delay:3.5s;font-size:28px;--float-max:0.33">◈</span>
      <span class="float-sym" style="top:85%;right:2%;animation-delay:0.5s;font-size:20px;--float-max:0.52">◇</span>
      <span class="float-sym" style="top:8%;left:18%;animation-delay:2.8s;font-size:22px;--float-max:0.18">✧</span>
    </div>

    <!-- 底部打光 -->
    <div class="spotlight spotlight-left" aria-hidden="true"></div>
    <div class="spotlight spotlight-right" aria-hidden="true"></div>

    <!-- 像素拖尾（全局） -->
    <div class="trail-container">
      <div
        v-for="p in particles"
        :key="p.id"
        class="trail-pixel"
        :style="{
          left: p.x + 'px',
          top: p.y + 'px',
          width: p.size + 'px',
          height: p.size + 'px',
          background: p.color,
          boxShadow: '0 0 6px ' + p.color
        }"
      />
    </div>

    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-inner">
        <router-link to="/" class="nav-brand">✦ {{ personalInfo.name }}</router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link" active-class="active" :class="{ active: $route.path === '/' }">首页</router-link>
          <router-link to="/projects" class="nav-link" active-class="active">作品</router-link>
          <router-link to="/skills" class="nav-link" active-class="active">技能</router-link>
          <router-link to="/timeline" class="nav-link" active-class="active">历程</router-link>
          <router-link to="/about" class="nav-link" active-class="active">关于</router-link>
          <router-link to="/manage" class="nav-link" active-class="active">管理</router-link>
        </div>
      </div>
    </nav>

    <!-- 像素装饰条纹 -->
    <div class="pixel-bar"></div>

    <!-- 路由视图 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-inner">
        <span class="footer-pixel">(´｡• ᵕ •｡`)</span>
        <span>&copy; 2024 {{ personalInfo.name }} · powered by ✦ Y2K ✦</span>
        <span class="footer-pixel">✧ ﾟ *:·</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { personalInfo } from './data/projects.js'

// ====== 像素拖尾 ======
const particles = ref([])
let pId = 0
let lastTrail = 0
const trailColors = ['#c100e0', '#b03bbb', '#fdbbff', '#d433f0']

function onMouseMove(e) {
  const now = Date.now()
  if (now - lastTrail > 40) {
    lastTrail = now
    const id = pId++
    particles.value.push({
      id,
      x: e.clientX,
      y: e.clientY,
      color: trailColors[Math.floor(Math.random() * trailColors.length)],
      size: 2 + Math.random() * 4
    })
    setTimeout(() => {
      particles.value = particles.value.filter(p => p.id !== id)
    }, 500)
    if (particles.value.length > 50) particles.value.splice(0, particles.value.length - 50)
  }
}
</script>

<style>
/* ========== 全局变量 — 黑紫白 Y2K ========== */
:root {
  --bg: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-card: #1a1a2e;
  --bg-hover: #222244;
  --text: #f0f0f0;
  --text-secondary: #b0b0c0;
  --text-muted: #6b7280;
  --border: #2d2d4a;
  --border-light: #3d3d5a;

  --purple: #b03bbb;
  --purple-dark: #c100e0;
  --purple-light: #fdbbff;
  --pink: #ec4899;
  --cyan: #06b6d4;
  --white: #f0f0f0;

  --radius: 3px;
  --shadow: 0 4px 24px rgba(176, 59, 187, 0.12);

  --breathe-from: 0 0 12px rgba(176, 59, 187, 0.05);
  --breathe-to: 0 0 40px rgba(176, 59, 187, 0.25);
}

/* ========== 像素字体引入 ========== */
@font-face {
  font-family: 'FusionPixel';
  src: url('/fonts/fusion-pixel-12px-proportional-zh_hans.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'FusionPixel8';
  src: url('/fonts/fusion-pixel-8px-proportional-zh_hans.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* ========== 全局重置 ========== */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: "FusionPixel", "Microsoft YaHei", sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  line-height: 1.6;
  letter-spacing: 1px;
  background-image:
    linear-gradient(rgba(176, 59, 187, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(176, 59, 187, 0.07) 1px, transparent 1px);
  background-size: 40px 40px, 40px 40px;
}

a { text-decoration: none; color: inherit; }

/* ========== 底部打光 ========== */
.spotlight {
  position: fixed;
  bottom: 0;
  width: 45vw;
  height: 40vh;
  pointer-events: none;
  z-index: -1;
}
.spotlight-left {
  left: 0;
  background: radial-gradient(ellipse farthest-corner at 0% 100%, rgba(176, 59, 187, 0.2) 0%, rgba(176, 59, 187, 0.06) 35%, rgba(176, 59, 187, 0) 65%, rgba(176, 59, 187, 0) 100%);
  animation: spotlightBreathe 4s ease-in-out infinite;
}
.spotlight-right {
  right: 0;
  background: radial-gradient(ellipse farthest-corner at 100% 100%, rgba(176, 59, 187, 0.2) 0%, rgba(176, 59, 187, 0.06) 35%, rgba(176, 59, 187, 0) 65%, rgba(176, 59, 187, 0) 100%);
  animation: spotlightBreathe 4s ease-in-out infinite;
}
@keyframes spotlightBreathe {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* ========== 浮动符号 ========== */
.float-symbols {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}
.float-sym {
  position: absolute;
  color: var(--purple-light);
  opacity: 0;
  animation: floatDrift 3.5s ease-in-out infinite alternate;
}
@keyframes floatDrift {
  0% { transform: translateY(0) rotate(0deg); opacity: 0.04; }
  100% { transform: translateY(-25px) rotate(15deg); opacity: var(--float-max, 0.2); }
}

/* ========== 像素装饰条（带呼吸） ========== */
.pixel-bar {
  height: 24px;
  background: linear-gradient(to bottom, var(--purple) 1px, rgba(176, 59, 187, 0.3) 4px, rgba(176, 59, 187, 0.05) 12px, transparent 20px);
  pointer-events: none;
  animation: breatheBar 3s ease-in-out infinite;
}
@keyframes breatheBar {
  0%, 100% { opacity: 0.65; }
  50% { opacity: 1; }
}

/* ========== 路由过渡 ========== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ========== 卡片通用 ========== */
.card {
  background: var(--bg-card);
  border: 3px solid var(--border);
  border-radius: var(--radius);
  transition: all 0.3s ease;
  box-shadow: var(--breathe-from);
}
.card:hover {
  border-color: var(--purple);
  box-shadow: var(--breathe-to), 0 0 20px rgba(176, 59, 187, 0.15);
  transform: translateY(-2px);
}

/* 按钮通用 */
.btn {
  padding: 8px 22px;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 500;
  border: 3px solid var(--border);
  background: var(--bg-card);
  color: var(--text);
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 2px 2px 0 0 var(--border);
}
.btn:hover {
  border-color: var(--purple);
  box-shadow: 2px 2px 0 0 var(--purple);
  transform: translate(-1px, -1px);
}

/* ========== 像素拖尾 ========== */
.trail-container {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}
.trail-pixel {
  position: absolute;
  border-radius: 1px;
  animation: trailFade 0.5s ease-out forwards;
  pointer-events: none;
}
@keyframes trailFade {
  0% { opacity: 0.9; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.3); }
}

/* ========== 通用组件样式 ========== */
.page-title {
  font-size: 22px;
  font-weight: 500;
  margin: 0 0 32px;
  color: var(--purple-light);
  letter-spacing: -0.5px;
}

/* ========== 滚动条 ========== */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--purple); }
</style>

<style scoped>
#app { min-height: 100vh; }

/* ========== 导航栏 ========== */
.navbar {
  background: #0d0d16;
  border-bottom: 3px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 3px 0 0 rgba(176, 59, 187, 0.08);
}
.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav-brand {
  font-size: 18px;
  font-weight: 500;
  color: var(--white);
  letter-spacing: 0.5px;
}
.nav-links { display: flex; gap: 4px; }
.nav-link {
  padding: 6px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  border: 3px solid transparent;
  transition: all 0.1s ease;
}
.nav-link:hover {
  color: var(--white);
  border-color: var(--border);
  box-shadow: 2px 2px 0 0 var(--border);
  transform: translate(-1px, -1px);
}
.nav-link.active {
  color: var(--white);
  background: rgba(176, 59, 187, 0.2);
  border-color: rgba(176, 59, 187, 0.35);
  box-shadow: 2px 2px 0 0 rgba(176, 59, 187, 0.3);
}

/* ========== 主内容 ========== */
.main-content {
  min-height: calc(100vh - 120px);
}

/* ========== 页脚 ========== */
.footer {
  border-top: 1px solid var(--border);
  padding: 20px;
  background: var(--bg-secondary);
}
.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--text-muted);
  flex-wrap: wrap;
}
.footer-pixel {
  color: var(--purple-light);
  font-size: 14px;
  font-family: "FusionPixel8", "Courier New", monospace;
}
</style>
