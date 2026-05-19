import { ref } from 'vue'

// ========== 个人基本信息 ==========
export const personalInfo = {
  name: 'J Are',
  avatar: '/images/头像.png',
  title: '数字媒体技术 · 大三在读',
  intro: '热爱 IP 衍生、游戏美术与三维动效设计，让创意高效落地。',
  email: '1447288960@qq.com',
  phone: '18035184799',
  qq: '1447288960',
  wechat: 'hjr00512988',
  school: '华中师范大学',
  major: '数字媒体技术'
}

// ========== 技能列表 ==========
export const skills = ref([
  { name: '天生绘画', level: 95, category: '绘画' },
  { name: 'Sai2', level: 95, category: '绘画' },
  { name: 'CSP', level: 70, category: '绘画' },
  { name: 'Photoshop', level: 90, category: '设计' },
  { name: 'Illustrator', level: 85, category: '设计' },
  { name: 'After Effects', level: 70, category: '动效' },
  { name: 'Rive', level: 50, category: '动效' },
  { name: 'Blender', level: 75, category: '建模' },
  { name: 'ZBrush', level: 50, category: '建模' },
  { name: 'Unity', level: 50, category: '游戏' },
  { name: 'CDR', level: 75, category: '设计' },
  { name: 'Aseprite', level: 65, category: '游戏' }
])

// ========== 成长历程 ==========
export const timeline = ref([
  {
    time: '2025.03 — 2025.06',
    title: '周黑鸭品牌校园合作设计项目 · 设计负责人',
    description: '主导项目设计方向，统筹创意概念输出与视觉风格定调。负责衍生插画、周边产品（徽章、亚克力挂件、PP夹、杯垫、PVC袋等）、KT板（背景板/涂鸦板）及整体布展视觉设计。与团队成员共同完成商家对接、需求梳理、活动方案策划及策展布展落地执行。'
  },
  {
    time: '2023.10 — 2026.03',
    title: '大学生创新创业训练计划项目 · IP衍生设计',
    description: '负责IP形象衍生设计，包括插画、动画、表情包、周边产品及活动视觉物料。参与从策划、设计、工厂对接到线下落地售卖的全流程，周边产品成功售罄。使用 Photoshop、Illustrator、CSP、Blender、Warudo 等工具完成设计与动画输出，配合虚拟主播账号运营。'
  },
  {
    time: '2024 — 2025',
    title: '中国大学生计算机设计大赛 · 一、二、三等奖',
    description: '分别在微课赛道（一等奖）、海报赛道（二等奖）、游戏开发赛道（三等奖）获奖，展现了跨媒介的设计与创作能力。'
  },
  {
    time: '2025',
    title: 'Unity 游戏开发课程项目 · 独立美术设计',
    description: '在《Alien Cat》像素平台跳跃游戏中负责全部美术设计，包括角色设计、场景绘制、UI界面与逐帧动画制作，独立完成游戏美术全案交付。'
  },
  {
    time: '2024 — 2025',
    title: '杭州边锋网络技术有限公司 · 美术设计委托创作',
    description: '在旗下画加平台承接美术设计委托，长期服务角色插画、美工设计类商业订单，具备成熟的客户沟通与独立交付能力。'
  },
  {
    time: '2023.09 — 2024.06',
    title: '华大青年融媒体中心 · 图像视觉部',
    description: '负责活动海报、封面、活动展板等视觉设计，多次被评为优秀设计作品并发布于公众号平台。'
  }
])

// ========== 项目列表 ==========
export const projects = ref([{
    id: 1,
    title: '衍生品设计',
    description: '聚焦 IP 衍生周边设计，涵盖品牌校园合作与同人二次创作两大方向。在周黑鸭品牌校园合作项目中，以"莓事鸭"创意概念为核心，融合树莓趣味意象与品牌 IP 形象，完成徽章、亚克力挂件、PP夹、杯垫、PVC袋等周边衍生品设计及布展视觉物料统筹，兼顾品牌调性与校园场景适配。在同人衍生设计中，基于热门 IP 进行二次创作，适配徽章等周边载体完成造型与画面设计，平衡角色辨识度与审美表现。积累了从创意构思、工厂对接到线下售卖的完整衍生品设计流程经验。',
    techStack: ['PS', 'AI', 'CSP', 'Sai2', 'CDR', '天生绘画'],
    cover: '/images/衍生品设计/封面.jpg',
    images: [
      '/images/衍生品设计/1.jpg',
      '/images/衍生品设计/2.jpg',
      '/images/衍生品设计/3.jpg',
      '/images/衍生品设计/4.jpg'
    ],
    demo: '',
    github: '',
    status: 'completed',
    tags: ['IP设计'],
    createTime: 1711900800000
  },{
    id: 2,
    title: '矢量插画设计',
    description: '以 Illustrator 为核心工具进行矢量插画创作，聚焦角色设计、扁平风格插画与图形化视觉表达。从草图构思到矢量成稿，注重线条流畅度、色彩搭配与画面层次感，兼顾装饰性与叙事性。作品涵盖角色立绘、场景插画、图标图形及系列主题插画，适用于品牌视觉、媒体配图及衍生品开发等多种场景。',
    techStack: ['Illustrator', 'PS'],
    cover: '/images/矢量插画/封面.jpg',
    images: [
      '/images/矢量插画/1.jpg',
      '/images/矢量插画/2.jpg',
      '/images/矢量插画/3.jpg',
      '/images/矢量插画/4.jpg',
      '/images/矢量插画/5.jpg'
    ],
    demo: '',
    github: '',
    status: 'ongoing',
    tags: ['矢量插画'],
    createTime: 1746144000000
  },{
    id: 3,
    title: '《Alien Cat》像素平台跳跃游戏',
    description: '《Alien Cat》为像素风格平台跳跃类游戏，核心围绕粉色外星小猫的末世冒险展开，玩家操控角色躲避障碍、挑战末世物种。本人主要负责美术绘制与部分动画制作，完成场景、角色及道具界面的像素美术设计，制作角色与场景动态效果，保障游戏视觉呈现与玩法体验。',
    techStack: ['PS', 'AE', 'Aseprite', 'Unity'],
    cover: '/images/Alien Cat/封面.jpg',
    images: [
      '/images/Alien Cat/1.jpg',
      '/images/Alien Cat/2.jpg',
      '/images/Alien Cat/3.jpg',
      '/images/Alien Cat/小猫1.gif',
      '/images/Alien Cat/小猫2.gif',
      '/images/Alien Cat/小猫3.gif'
    ],
    demo: '',
    github: '',
    status: 'completed',
    tags: ['游戏美术'],
    createTime: 1735689600000
  },{
    id: 4,
    title: '建模设计',
    description: '聚焦 Q 版人物建模，重点完成角色整体造型搭建与 BJD 发型建模，注重造型的精致度与细节刻画，贴合 Q 版风格的可爱气质，确保建模造型符合设计需求，适配各类周边衍生或相关应用场景，兼顾美观度与实用性，精准呈现 Q 版人物的核心形象。',
    techStack: ['Blender', 'ZBrush'],
    cover: '/images/建模/封面.jpg',
    images: [
      '/images/建模/1.jpg',
      '/images/建模/2.jpg',
      '/images/建模/3.jpg',
      '/images/建模/4.jpg'
    ],
    demo: '',
    github: '',
    status: 'ongoing',
    tags: ['建模'],
    createTime: 1740787200000
  },{
    id: 5,
    title: '动效设计',
    description: '专注于动效设计工作，具体包含动态图标设计、界面动效设计及 UI 动效设计，通过流畅、贴合场景的动效呈现，增强视觉表现力，优化操作反馈，提升整体视觉体验与使用感，适配各类设计应用场景。',
    techStack: ['AE', 'Rive'],
    cover: '/images/动效/徽章.gif',
    images: [
      '/images/动效/徽章.gif',
      '/images/动效/按钮.gif',
      '/images/动效/动效预演.mp4'
    ],
    demo: '',
    github: '',
    status: 'ongoing',
    tags: ['动效设计'],
    createTime: 1743465600000
  }])

// ========== CRUD 操作 ==========
export function addProject(project) {
  const maxId = projects.value.reduce((max, p) => Math.max(max, p.id), 0)
  projects.value.push({
    ...project,
    id: maxId + 1,
    createTime: Date.now()
  })
}

export function updateProject(id, updates) {
  const index = projects.value.findIndex(p => p.id === id)
  if (index !== -1) {
    projects.value[index] = { ...projects.value[index], ...updates }
  }
}

export function deleteProject(id) {
  const index = projects.value.findIndex(p => p.id === id)
  if (index !== -1) {
    projects.value.splice(index, 1)
  }
}

export function getProjectById(id) {
  return projects.value.find(p => p.id === Number(id)) || null
}

export function filterProjects(status, tag) {
  return projects.value.filter(p => {
    if (status && status !== 'all' && p.status !== status) return false
    if (tag && !p.tags.includes(tag)) return false
    return true
  })
}
