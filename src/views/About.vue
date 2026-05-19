<template>
  <div class="about-page">
    <h1 class="page-title">✦ 关于我 ✧</h1>

    <div class="about-card card">
      <div class="about-header">
        <img :src="personalInfo.avatar" :alt="personalInfo.name" class="avatar" />
        <div class="about-info">
          <h2>{{ personalInfo.name }}</h2>
          <p class="about-major">{{ personalInfo.school }} · {{ personalInfo.major }} · 大三（2027届）</p>
          <p class="about-intro">{{ personalInfo.intro }}</p>
        </div>
      </div>

      <div class="about-section">
        <h3>📖 详细介绍</h3>
        <p>我是 J Are，就读于华中师范大学数字媒体技术专业，目前大三在读，预计 2027 年毕业。作为一名专注于数字创意设计的创作者，我具备从创意构思到落地交付的全流程设计能力，擅长品牌 IP 衍生设计、游戏美术、视觉动效与三维建模。</p>
        <p>在校期间，我多次参与学科竞赛与项目实践，在中国大学生计算机设计大赛中，分别在微课、海报、游戏开发赛道斩获一、二、三等奖；同时作为核心成员参与大学生创新创业训练计划项目，主导 IP 形象衍生设计，完成插画、动画、表情包、周边产品等物料开发，并推动周边落地售卖，积累了完整的商业设计流程经验。</p>
        <p>在周黑鸭品牌校园合作项目中，我担任设计负责人，主导创意方向与视觉风格，统筹衍生插画、周边产品及线下活动物料设计，兼顾品牌调性与校园场景适配，锻炼了跨部门沟通与项目统筹能力。</p>
        <p>我对数字媒体领域的设计与创作始终保持热情，期待在更多项目中发挥创意与技术能力，在实践中不断打磨专业技能，与团队共同推进创意落地。</p>
      </div>

      <div class="about-section">
        <h3>📬 联系方式</h3>
        <div class="contact-list">
          <div class="contact-item">
            <span class="contact-label">✉ 邮箱</span>
            <a :href="'mailto:' + personalInfo.email">{{ personalInfo.email }}</a>
          </div>
          <div class="contact-item">
            <span class="contact-label">📱 手机</span>
            <span>{{ personalInfo.phone }}</span>
          </div>
          <div class="contact-item">
            <span class="contact-label">💬 QQ</span>
            <span>{{ personalInfo.qq }}</span>
          </div>
          <div class="contact-item">
            <span class="contact-label">✎ 微信</span>
            <span>{{ personalInfo.wechat }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { personalInfo } from '../data/projects.js'
</script>

<style scoped>
.about-page { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
.about-card { padding: 32px; }
.about-header {
  display: flex;
  gap: 24px;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 24px;
}
.avatar {
  width: 100px; height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2.5px solid var(--purple);
  box-shadow: 0 0 24px rgba(176, 59, 187, 0.15);
  flex-shrink: 0;
}
.about-info h2 { margin: 0 0 8px; font-size: 24px; font-weight: 500; color: var(--white); }
.about-major {
  color: var(--purple-light);
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 6px;
}
.about-intro {
  color: var(--text-secondary);
  font-size: 15px;
  margin: 0;
  line-height: 1.6;
}

.about-section { margin-bottom: 28px; }
.about-section:last-child { margin-bottom: 0; }
.about-section h3 {
  font-size: 17px;
  font-weight: 500;
  color: var(--white);
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.about-section p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0 0 12px;
  text-indent: 2em;
}
.about-section p:last-child { margin-bottom: 0; }

.contact-list { display: flex; flex-direction: column; gap: 12px; }
.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
}
.contact-label {
  min-width: 80px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
}
.contact-item a, .contact-item span {
  font-size: 15px;
  color: var(--text-secondary);
  text-decoration: none;
}
.contact-item a:hover { color: var(--purple-light); }
</style>
