<template>
  <div class="home" @mousemove="onMouseMove">
    <!-- ====== 两侧像素怪兽 ====== -->
    <div class="monster monster-left" :class="{ sleeping: leftFace === '(◡_◡)' }" aria-hidden="true">
      <span class="snore">Z</span>
      <span class="monster-face">{{ leftFace }}</span>
    </div>
    <div class="monster monster-right" :class="{ sleeping: rightFace === '(◡_◡)' }" aria-hidden="true">
      <span class="snore">Z</span>
      <span class="monster-face">{{ rightFace }}</span>
    </div>

    <!-- ====== Hero ====== -->
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="avatar-wrapper">
        <img :src="personalInfo.avatar" :alt="personalInfo.name" class="avatar" />
      </div>
      <h1 class="name">{{ personalInfo.name }}</h1>
      <p class="title">{{ personalInfo.title }}</p>
      <p class="intro">{{ personalInfo.intro }}</p>
      <div class="hero-links">
        <router-link to="/projects" class="btn-primary">✦ 查看作品</router-link>
        <router-link to="/about" class="btn-outline">✧ 关于我</router-link>
      </div>
    </section>

    <!-- ====== 精选作品 ====== -->
    <section class="section">
      <h2 class="section-title"><span class="title-icon">✦</span> 精选作品 <span class="title-icon">✧</span></h2>
      <div class="project-grid">
        <ProjectCard
          v-for="item in featuredProjects"
          :key="item.id"
          :project="item"
          @click="goToDetail"
        />
      </div>
      <div class="section-footer">
        <router-link to="/projects" class="link-more">☞ 查看全部项目 ☜</router-link>
      </div>
    </section>

    <!-- ====== 快速导航 ====== -->
    <section class="section">
      <h2 class="section-title"><span class="title-icon">✦</span> 快速导航 <span class="title-icon">✦</span></h2>
      <div class="nav-grid">
        <router-link to="/skills" class="nav-card card">
          <span class="nav-icon">✧</span>
          <span class="nav-label">技能树</span>
        </router-link>
        <router-link to="/timeline" class="nav-card card">
          <span class="nav-icon">☾</span>
          <span class="nav-label">成长历程</span>
        </router-link>
        <router-link to="/manage" class="nav-card card">
          <span class="nav-icon">✦</span>
          <span class="nav-label">项目管理</span>
        </router-link>
      </div>
    </section>

    <!-- 底部装饰 -->
    <div class="home-footer">
      <span class="home-credit">✧ ﾟ *:· 感谢访问 ·:* ﾟ ✧</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { personalInfo, projects } from '../data/projects.js'
import ProjectCard from '../components/ProjectCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const featuredProjects = projects.value.slice(0, 4)

// ====== 怪兽表情 ======
const leftFace = ref('(◡_◡)')
const rightFace = ref('(◡_◡)')

function getFace(dist) {
  if (dist > 500) return '(◡_◡)'
  if (dist > 350) return '(￢_￢)'
  if (dist > 200) return '(◉_◉)'
  return '(⊙Д⊙)'
}

function onMouseMove(e) {
  // 表情随距离变化
  const w = window.innerWidth
  const h = window.innerHeight
  const lDist = Math.hypot(e.clientX - 70, e.clientY - h / 2)
  const rDist = Math.hypot(e.clientX - (w - 70), e.clientY - h / 2)
  leftFace.value = getFace(lDist)
  rightFace.value = getFace(rDist)
}

function goToDetail(id) {
  router.push({ name: 'ProjectDetail', params: { id } })
}
</script>

<style scoped>
.home { max-width: 1100px; margin: 0 auto; padding: 40px 20px 20px; }

/* ====== Hero ====== */
.hero {
  text-align: center;
  padding: 1vh 0 40px;
  min-height: 90vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hero-glow { display: none; }
.avatar {
  width: 150px; height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--purple);
  box-shadow: 0 0 20px rgba(176, 59, 187, 0.25);
  position: relative;
  z-index: 1;
  display: block;
}
.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}
.avatar-wrapper::after {
  content: '';
  position: absolute;
  top: -60px;
  left: -60px;
  right: -60px;
  bottom: -60px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(176, 59, 187, 0.3) 0%, rgba(176, 59, 187, 0.08) 40%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  animation: avatarBreathe 3s ease-in-out infinite;
}
@keyframes avatarBreathe {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}
.name {
  font-size: 40px;
  font-weight: 500;
  margin: 0 0 6px;
  color: var(--white);
  letter-spacing: -0.5px;
  text-shadow: 0 0 12px rgba(176, 59, 187, 0.3), 0 0 30px rgba(176, 59, 187, 0.1);
}
.title {
  font-size: 15px;
  font-weight: 600;
  color: var(--purple-light);
  margin: 0 0 12px;
  display: inline-block;
  padding: 3px 16px;
  border: 2px solid rgba(176, 59, 187, 0.3);
  border-radius: 20px;
  background: rgba(176, 59, 187, 0.06);
}
.intro {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 480px;
  margin: 0 auto 28px;
  line-height: 1.6;
}
.hero-links { display: flex; gap: 14px; justify-content: center; }
.btn-primary, .btn-outline {
  padding: 10px 26px;
  border-radius: var(--radius);
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
}
.btn-primary {
  background: var(--purple);
  color: #fff;
  border: none;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(176, 59, 187, 0.3);
}
.btn-outline {
  border: 2px solid var(--border);
  color: var(--text-secondary);
  background: transparent;
}
.btn-outline:hover {
  border-color: var(--purple);
  color: var(--purple-light);
  box-shadow: 0 0 16px rgba(176, 59, 187, 0.15);
}

/* ====== Sections ====== */
.section { margin: 50px 0 60px; }
.section-title {
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--white);
}
.title-icon {
  color: var(--purple);
  font-size: 18px;
}

/* ====== 项目卡片 ====== */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.section-footer { text-align: center; margin-top: 28px; }
.link-more {
  font-size: 15px;
  font-weight: 600;
  color: var(--purple-light);
  text-decoration: none;
  padding: 8px 20px;
  border-radius: var(--radius);
  border: 2px solid var(--border);
  display: inline-block;
  transition: all 0.3s ease;
}
.link-more:hover {
  border-color: var(--purple);
  box-shadow: 0 0 20px rgba(176, 59, 187, 0.15);
  transform: translateY(-2px);
}

/* ====== 快速导航 ====== */
.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 20px;
  text-decoration: none;
}
.nav-card:hover {
  transform: translateY(-4px);
  border-color: var(--purple);
}
.nav-icon { font-size: 32px; margin-bottom: 10px; color: var(--purple); transition: color 0.3s ease; }
.nav-card:hover .nav-icon { color: var(--white); }
.nav-label {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-secondary);
}
.nav-card:hover .nav-label { color: var(--purple-light); }

/* ====== 底部 ====== */
.home-footer {
  text-align: center;
  padding: 20px 0 10px;
}
.home-credit {
  font-size: 13px;
  color: var(--text-muted);
}

/* ====== 像素怪兽 ====== */
.monster {
  position: fixed;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  font-family: "FusionPixel8", "Courier New", monospace;
  font-size: 22px;
  color: var(--purple-light);
  opacity: 0.4;
  text-shadow: 0 0 12px rgba(176, 59, 187, 0.2);
  transition: opacity 0.3s;
}
.monster-face { display: block; }
.monster-left { left: 24px; top: 50%; transform: translateY(-50%); }
.monster-right { right: 24px; top: 50%; transform: translateY(-50%); }

/* ====== 呼噜 zZ ====== */
.snore {
  position: absolute;
  left: 50%;
  margin-left: -12px;
  font-size: 16px;
  opacity: 0;
}
.monster:not(.sleeping) .snore { display: none; }
.monster.sleeping .snore {
  display: block;
  animation: snoreFloat 2.8s ease-out infinite;
}
@keyframes snoreFloat {
  0% { transform: translateY(0) scale(0.5); opacity: 0; }
  20% { opacity: 0.7; }
  60% { opacity: 0; transform: translateY(-50px) scale(1.3); }
  100% { opacity: 0; transform: translateY(-50px) scale(1.3); }
}
@media (max-width: 900px) {
  .monster { display: none; }
}

</style>
