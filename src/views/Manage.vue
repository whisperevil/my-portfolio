<template>
  <div class="manage-page">
    <h1 class="page-title">✦ 项目管理 ✧</h1>

    <div class="manage-toolbar">
      <button class="btn-add" @click="showForm = true">✦ 添加项目</button>
    </div>

    <!-- 表格 -->
    <div class="table-wrapper card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>状态</th>
            <th>标签</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in projects" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.title }}</td>
            <td>
              <span class="status-badge" :class="p.status">
                {{ p.status === 'completed' ? '✔ 完成' : '◎ 进行中' }}
              </span>
            </td>
            <td>
              <span v-for="tag in p.tags" :key="tag" class="tag-badge">{{ tag }}</span>
            </td>
            <td>{{ formatTime(p.createTime) }}</td>
            <td class="actions">
              <button class="btn-edit" @click="editProject(p)">编辑</button>
              <button class="btn-status" @click="toggleStatus(p)">
                {{ p.status === 'completed' ? '→ 进行中' : '→ 已完成' }}
              </button>
              <button class="btn-delete" @click="confirmDelete(p)">删除</button>
            </td>
          </tr>
          <tr v-if="projects.length === 0">
            <td colspan="6" class="empty-row">暂无项目数据</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 表单弹窗 -->
    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal card">
        <h2>{{ isEditing ? '✎ 编辑项目' : '✦ 添加项目' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>项目标题 <span class="required">*</span></label>
            <input v-model="form.title" required placeholder="请输入项目标题" />
          </div>
          <div class="form-group">
            <label>项目描述 <span class="required">*</span></label>
            <textarea v-model="form.description" required rows="4" placeholder="请输入项目描述"></textarea>
          </div>
          <div class="form-group">
            <label>技术栈 / 工具（逗号分隔）</label>
            <input v-model="form.techStackStr" placeholder="例如：PS, AI, Blender" />
          </div>
          <div class="form-group">
            <label>封面图 URL</label>
            <input v-model="form.cover" placeholder="可选，留空使用默认占位图" />
          </div>
          <div class="form-group">
            <label>标签（逗号分隔）</label>
            <input v-model="form.tagsStr" placeholder="例如：IP设计, 建模" />
          </div>
          <div class="form-group">
            <label>项目状态</label>
            <select v-model="form.status">
              <option value="ongoing">进行中</option>
              <option value="completed">已完成</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="closeForm">取消</button>
            <button type="submit" class="btn-submit">{{ isEditing ? '✎ 保存' : '✦ 添加' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 删除确认 -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="showDeleteConfirm = false">
      <div class="modal card modal-sm">
        <h2>⚠ 确认删除</h2>
        <p>确定要删除「{{ deletingProject?.title }}」吗？此操作不可撤销。</p>
        <div class="form-actions">
          <button class="btn-cancel" @click="showDeleteConfirm = false">取消</button>
          <button class="btn-delete-confirm" @click="doDelete">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { projects, addProject, updateProject, deleteProject } from '../data/projects.js'

const router = useRouter()
const showForm = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const showDeleteConfirm = ref(false)
const deletingProject = ref(null)

const defaultForm = () => ({
  title: '',
  description: '',
  techStackStr: '',
  cover: '',
  tagsStr: '',
  status: 'ongoing'
})

const form = ref(defaultForm())

function formatTime(ts) {
  if (!ts) return '-'
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function editProject(p) {
  isEditing.value = true
  editingId.value = p.id
  form.value = {
    title: p.title,
    description: p.description,
    techStackStr: p.techStack.join(', '),
    cover: p.cover || '',
    tagsStr: p.tags.join(', '),
    status: p.status
  }
  showForm.value = true
}

function handleSubmit() {
  const data = {
    title: form.value.title,
    description: form.value.description,
    techStack: form.value.techStackStr.split(',').map(s => s.trim()).filter(Boolean),
    cover: form.value.cover || '/images/placeholder.jpg',
    tags: form.value.tagsStr.split(',').map(s => s.trim()).filter(Boolean),
    status: form.value.status
  }
  if (isEditing.value) {
    updateProject(editingId.value, data)
    closeForm()
  } else {
    addProject(data)
    router.push({ name: 'ProjectList' })
  }
}

function closeForm() {
  showForm.value = false
  isEditing.value = false
  editingId.value = null
  form.value = defaultForm()
}

function toggleStatus(p) {
  updateProject(p.id, {
    status: p.status === 'completed' ? 'ongoing' : 'completed'
  })
}

function confirmDelete(p) {
  deletingProject.value = p
  showDeleteConfirm.value = true
}

function doDelete() {
  if (deletingProject.value) {
    deleteProject(deletingProject.value.id)
  }
  showDeleteConfirm.value = false
  deletingProject.value = null
}
</script>

<style scoped>
.manage-page { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }

.manage-toolbar { margin-bottom: 24px; }
.btn-add {
  padding: 10px 28px;
  border-radius: var(--radius);
  background: var(--purple);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
}
.btn-add:hover {
  box-shadow: 0 6px 24px rgba(176, 59, 187, 0.3);
  transform: translateY(-2px);
}

/* Table */
.table-wrapper { overflow-x: auto; padding: 0; }
table { width: 100%; border-collapse: collapse; font-size: 14px; }
th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--border);
}
td { padding: 12px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); color: var(--text-secondary); }
tr:hover td { background: rgba(176, 59, 187, 0.03); }
tr:last-child td { border-bottom: none; }
.empty-row { text-align: center; color: var(--text-muted); padding: 40px 0; }
.status-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}
.status-badge.completed {
  background: rgba(176, 59, 187, 0.12);
  color: var(--purple-light);
  border: 1px solid rgba(176, 59, 187, 0.2);
}
.status-badge.ongoing {
  background: rgba(176, 59, 187, 0.12);
  color: var(--purple-light);
  border: 1px solid rgba(176, 59, 187, 0.2);
}
.tag-badge {
  display: inline-block;
  padding: 2px 8px;
  margin: 0 2px 2px 0;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: rgba(176, 59, 187, 0.08);
  color: var(--purple-light);
  border: 1px solid rgba(176, 59, 187, 0.12);
}
.actions { display: flex; gap: 6px; flex-wrap: wrap; }
.actions button {
  padding: 4px 10px;
  border-radius: 6px;
  border: 2px solid var(--border-light);
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}
.actions button:hover { border-color: var(--purple); color: var(--purple-light); }
.btn-status:hover { border-color: var(--purple); color: var(--purple-light); }
.btn-delete:hover { border-color: #ff4757; color: #ff4757; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
}
.modal {
  padding: 28px 32px;
  width: 90%;
  max-width: 540px;
  max-height: 80vh;
  overflow-y: auto;
}
.modal-sm { max-width: 400px; }
.modal h2 { margin: 0 0 18px; font-size: 20px; font-weight: 500; color: var(--white); }
.modal p { color: var(--text-secondary); font-size: 15px; }
.form-group { margin-bottom: 16px; }
.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 6px;
}
.required { color: var(--pink); }
.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 2px solid var(--border-light);
  font-size: 14px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  box-sizing: border-box;
  transition: border-color 0.25s ease;
  font-family: inherit;
}
.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--purple);
  box-shadow: 0 0 12px rgba(176, 59, 187, 0.1);
}
.form-group input::placeholder,
.form-group textarea::placeholder { color: var(--text-muted); }
.form-group select option { background: var(--bg-card); color: var(--text); }
.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
}
.btn-cancel, .btn-submit, .btn-delete-confirm {
  padding: 10px 24px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s ease;
}
.btn-cancel {
  background: transparent;
  color: var(--text-secondary);
  border: 2px solid var(--border);
}
.btn-cancel:hover { border-color: var(--purple); color: var(--purple-light); }
.btn-submit {
  background: var(--purple);
  color: #fff;
  border: none;
}
.btn-submit:hover { box-shadow: 0 4px 20px rgba(176, 59, 187, 0.3); }
.btn-delete-confirm {
  background: #ff4757;
  color: #fff;
  border: none;
}
.btn-delete-confirm:hover { box-shadow: 0 4px 16px rgba(255, 71, 87, 0.3); }
</style>
