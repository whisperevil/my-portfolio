<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <h2>(´；ω；`) 页面未找到</h2>
      <p>抱歉，您访问的页面不存在于这个次元。</p>
      <router-link to="/" class="btn-home">✦ 返回首页 ✦</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}
.error-code {
  font-size: 120px;
  font-weight: 500;
  margin: 0;
  line-height: 1;
  color: var(--purple);
  letter-spacing: -6px;
}
.not-found-content h2 {
  font-size: 26px;
  font-weight: 500;
  color: var(--white);
  margin: 12px 0 8px;
}
.not-found-content p {
  font-size: 16px;
  color: var(--text-muted);
  margin: 0 0 32px;
}
.btn-home {
  display: inline-block;
  padding: 12px 32px;
  border-radius: var(--radius);
  background: var(--purple);
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
}
.btn-home:hover {
  box-shadow: 0 6px 24px rgba(176, 59, 187, 0.3);
  transform: translateY(-2px);
}
</style>
