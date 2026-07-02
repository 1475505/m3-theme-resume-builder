<script setup lang="ts">
import type { ResumeData, SectionType, ResumeSection } from '~/data/resume'
import { sectionToggleableFields } from '~/data/resume'
import { hasFormatting } from '~/composables/useFormat'

const props = defineProps<{
  data: ResumeData
}>()

const {
  resetToDefault,
  updateBasics, updateContact, updateContactIcon, addContact, removeContact,
  addSection, removeSection, moveSection, updateSectionTitle,
  toggleFieldVisibility, isFieldHidden,
  updateSummary, updateSkillsView, updateSkillsCardColumns,
  addSkillGroup, removeSkillGroup, updateSkillGroup, addSkill, removeSkill, updateSkill, updateSkillYears, cycleSkillProficiency,
  addJob, removeJob, updateJob, addHighlight, removeHighlight, updateHighlight,
  addProject, removeProject, updateProject,
  addEducation, removeEducation, updateEducation,
  updateCustom,
  importJSON, exportJSON,
} = useResume()

const proficiencyLabel: Record<string, string> = {
  expert: '精通',
  proficient: '熟练',
  familiar: '熟悉',
}

const contactIconOptions = [
  { value: 'phone', label: '电话', group: '基础' },
  { value: 'mail', label: '邮箱', group: '基础' },
  { value: 'location_on', label: '地址', group: '基础' },
  { value: 'github', label: 'GitHub', group: '社交平台' },
  { value: 'linkedin', label: 'LinkedIn', group: '社交平台' },
  { value: 'twitter', label: 'Twitter / X', group: '社交平台' },
  { value: 'wechat', label: '微信', group: '社交平台' },
  { value: 'juejin', label: '掘金', group: '社交平台' },
  { value: 'zhihu', label: '知乎', group: '社交平台' },
  { value: 'article', label: '网站', group: '其他' },
  { value: 'link', label: '链接', group: '其他' },
]

const contactGroups = computed(() => {
  const map = new Map<string, typeof contactIconOptions>()
  for (const opt of contactIconOptions) {
    const g = opt.group
    if (!map.has(g)) map.set(g, [])
    map.get(g)!.push(opt)
  }
  return Array.from(map.entries()).map(([name, options]) => ({ name, options }))
})

function contactPlaceholder(icon: string): string {
  const map: Record<string, string> = {
    phone: '138-0000-0000',
    mail: 'your@email.com',
    location_on: '城市',
    github: 'github.com/username',
    linkedin: 'linkedin.com/in/username',
    twitter: 'x.com/username',
    wechat: '微信号',
    juejin: 'juejin.cn/user/xxx',
    zhihu: 'zhihu.com/people/xxx',
    article: 'yourwebsite.com',
    link: 'https://example.com',
  }
  return map[icon] || '内容'
}

const sectionTypeOptions: { value: SectionType; label: string; icon: string }[] = [
  { value: 'summary', label: '概述', icon: 'edit_note' },
  { value: 'skills', label: '技能', icon: 'bolt' },
  { value: 'experience', label: '经历', icon: 'work' },
  { value: 'projects', label: '项目', icon: 'rocket_launch' },
  { value: 'education', label: '教育', icon: 'school' },
  { value: 'custom', label: '自定义', icon: 'note' },
]

const activeTab = ref<'form' | 'json'>('form')
const expandedSection = ref<string | null>('basics')

function toggleSection(id: string) {
  expandedSection.value = expandedSection.value === id ? null : id
}

// Live JSON editor
const jsonText = ref('')
const jsonError = ref('')

watch(
  () => props.data,
  () => {
    jsonText.value = exportJSON()
    jsonError.value = ''
  },
  { deep: true, immediate: true },
)

function onJsonInput() {
  try {
    const parsed = JSON.parse(jsonText.value)
    importJSON(parsed)
    jsonError.value = ''
  } catch {
    jsonError.value = 'JSON 格式错误，请检查括号、引号与逗号'
  }
}

// JSON file import/export
function handleExportJSON() {
  const json = exportJSON()
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'resume.json'
  a.click()
  URL.revokeObjectURL(url)
}

function handleImportJSON() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e: any) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string)
        importJSON(json)
      } catch {
        alert('JSON 格式错误')
      }
    }
    reader.readAsText(file)
  }
  input.click()
}

function sectionIcon(type: SectionType) {
  return sectionTypeOptions.find(o => o.value === type)?.icon || 'folder'
}
</script>

<template>
  <aside class="editor-panel">
    <div class="editor-header">
      <span class="editor-title">简历编辑器</span>
      <span class="editor-badge">实时同步</span>
    </div>

    <!-- Tabs -->
    <div class="editor-tabs">
      <button
        class="editor-tab"
        :class="{ active: activeTab === 'form' }"
        @click="activeTab = 'form'"
      >
        <span class="material-symbols-outlined">edit</span>
        表单
      </button>
      <button
        class="editor-tab"
        :class="{ active: activeTab === 'json' }"
        @click="activeTab = 'json'"
      >
        <span class="material-symbols-outlined">code</span>
        JSON
      </button>
    </div>

    <!-- Form Tab -->
    <div v-if="activeTab === 'form'" class="editor-scroll">
      <!-- Basics -->
      <div class="editor-section">
        <button
          class="editor-section-btn"
          :class="{ expanded: expandedSection === 'basics' }"
          @click="toggleSection('basics')"
        >
          <span class="material-symbols-outlined icon">person</span>
          <span class="label">基本信息</span>
          <span class="arrow">&#9662;</span>
        </button>
        <div v-if="expandedSection === 'basics'" class="editor-section-body">
          <div class="editor-field">
            <label class="editor-label">姓名</label>
            <input class="editor-input" :value="data.basics.name" @input="updateBasics('name', ($event.target as HTMLInputElement).value)" />
          </div>
          <div class="editor-field">
            <label class="editor-label">职位</label>
            <input class="editor-input" :value="data.basics.title" @input="updateBasics('title', ($event.target as HTMLInputElement).value)" />
          </div>
          <div v-for="(contact, i) in data.basics.contacts" :key="i" class="editor-contact-row">
            <div class="editor-contact-icon-preview">
              <BrandIcon :name="contact.icon" />
            </div>
            <div class="editor-contact-fields">
              <div style="display: flex; gap: 8px;">
                <select
                  class="editor-input"
                  style="flex: 0 0 120px; padding: 0 6px;"
                  :value="contact.icon"
                  @change="updateContactIcon(i, ($event.target as HTMLSelectElement).value)"
                >
                  <optgroup v-for="(group, gi) in contactGroups" :key="gi" :label="group.name">
                    <option v-for="opt in group.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </optgroup>
                </select>
                <input
                  class="editor-input"
                  style="flex: 1;"
                  :value="contact.text"
                  :placeholder="contactPlaceholder(contact.icon)"
                  @input="updateContact(i, ($event.target as HTMLInputElement).value)"
                />
                <button
                  v-if="data.basics.contacts.length > 1"
                  class="editor-contact-remove"
                  title="删除"
                  @click="removeContact(i)"
                >
                  <span class="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
          </div>
          <button class="editor-add-btn" @click="addContact">+ 添加联系方式</button>
        </div>
      </div>

      <!-- Sections -->
      <div v-for="(section, idx) in data.sections" :key="section.id" class="editor-section">
        <button
          class="editor-section-btn"
          :class="{ expanded: expandedSection === section.id }"
          @click="toggleSection(section.id)"
        >
          <span class="material-symbols-outlined icon">{{ sectionIcon(section.type) }}</span>
          <span class="label">{{ section.title || '未命名组件' }}</span>
          <span class="arrow">&#9662;</span>
        </button>

        <div v-if="expandedSection === section.id" class="editor-section-body">
          <!-- Section actions -->
          <div class="section-actions">
            <button class="section-action-btn" title="上移" :disabled="idx === 0" @click="moveSection(idx, idx - 1)">
              <span class="material-symbols-outlined">arrow_upward</span>
            </button>
            <button class="section-action-btn" title="下移" :disabled="idx === data.sections.length - 1" @click="moveSection(idx, idx + 1)">
              <span class="material-symbols-outlined">arrow_downward</span>
            </button>
            <button class="section-action-btn" style="color: var(--md-error);" title="删除组件" @click="removeSection(idx)">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>

          <!-- Field visibility toggles -->
          <div v-if="sectionToggleableFields[section.type]?.length" class="field-toggle-row">
            <span class="field-toggle-label">显示字段</span>
            <div class="field-toggle-chips">
              <button
                v-for="field in sectionToggleableFields[section.type]"
                :key="field.key"
                class="field-toggle-chip"
                :class="{ hidden: isFieldHidden(idx, field.key) }"
                @click="toggleFieldVisibility(idx, field.key)"
              >
                <span v-if="isFieldHidden(idx, field.key)" class="material-symbols-outlined" style="font-size: 14px;">visibility_off</span>
                <span v-else class="material-symbols-outlined" style="font-size: 14px;">visibility</span>
                {{ field.label }}
              </button>
            </div>
          </div>

          <!-- Summary -->
          <template v-if="section.type === 'summary'">
            <div class="editor-field">
              <label class="editor-label">组件标题</label>
              <input class="editor-input" :value="section.title" @input="updateSectionTitle(idx, ($event.target as HTMLInputElement).value)" />
            </div>
            <div class="editor-field">
              <label class="editor-label">
                概述文本
                <span v-if="hasFormatting(section.text)" class="format-badge" title="含富文本格式，请在预览区编辑">已格式化</span>
              </label>
              <textarea class="editor-textarea" :value="section.text" @input="updateSummary(idx, ($event.target as HTMLTextAreaElement).value)" />
            </div>
          </template>

          <!-- Skills -->
          <template v-if="section.type === 'skills'">
            <div class="editor-field">
              <label class="editor-label">组件标题</label>
              <input class="editor-input" :value="section.title" @input="updateSectionTitle(idx, ($event.target as HTMLInputElement).value)" />
            </div>
            <div class="editor-field">
              <label class="editor-label">展示形式</label>
              <div style="display: flex; gap: 8px;">
                <button
                  class="editor-choice"
                  :class="{ active: section.view === 'list' }"
                  @click="updateSkillsView(idx, 'list')"
                >
                  <span class="material-symbols-outlined">view_list</span> 列表
                </button>
                <button
                  class="editor-choice"
                  :class="{ active: section.view === 'cards' }"
                  @click="updateSkillsView(idx, 'cards')"
                >
                  <span class="material-symbols-outlined">grid_view</span> 卡片
                </button>
              </div>
            </div>
            <div v-if="section.view === 'cards'" class="editor-field">
              <label class="editor-label">卡片列数</label>
              <div style="display: flex; gap: 8px;">
                <button
                  v-for="col in [1, 2, 3]"
                  :key="col"
                  class="editor-choice"
                  :class="{ active: ((section as any).cardColumns ?? 2) === col }"
                  @click="updateSkillsCardColumns(idx, col)"
                >
                  <span class="material-symbols-outlined">{{ col === 1 ? 'view_day' : col === 2 ? 'view_module' : 'view_column' }}</span> {{ col }}列
                </button>
              </div>
            </div>
            <div v-for="(group, gi) in section.groups" :key="gi" style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--md-outline-variant);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 600; color: var(--md-primary);">{{ group.category || '新分类' }}</span>
                <button class="editor-add-btn" style="padding: 2px 8px; border-style: solid; color: var(--md-error); border-color: var(--md-error);" @click="removeSkillGroup(idx, gi)">删除分类</button>
              </div>
              <div class="editor-field">
                <label class="editor-label">分类名称</label>
                <input class="editor-input" :value="group.category" @input="updateSkillGroup(idx, gi, 'category', ($event.target as HTMLInputElement).value)" />
              </div>
              <div class="editor-field">
                <label class="editor-label">分类图标</label>
                <IconPicker :modelValue="group.icon" @update:modelValue="updateSkillGroup(idx, gi, 'icon', $event)" />
              </div>
              <div class="editor-field">
                <label class="editor-label">分类描述</label>
                <input class="editor-input" :value="group.description" @input="updateSkillGroup(idx, gi, 'description', ($event.target as HTMLInputElement).value)" />
              </div>
              <div v-for="(skill, si) in group.skills" :key="si" style="margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <input
                    class="editor-input"
                    style="flex: 1;"
                    :value="skill.name"
                    placeholder="技能名"
                    @input="updateSkill(idx, gi, si, 'name', ($event.target as HTMLInputElement).value)"
                  />
                  <input
                    class="editor-input"
                    style="width: 60px;"
                    :value="skill.years"
                    placeholder="年限"
                    @input="updateSkillYears(idx, gi, si, ($event.target as HTMLInputElement).value)"
                  />
                  <button
                    class="skill-proficiency"
                    :class="`skill-proficiency--${skill.proficiency}`"
                    style="font-size: 10px; cursor: pointer; border: none;"
                    title="点击切换熟练度"
                    @click="cycleSkillProficiency(idx, gi, si)"
                  >
                    {{ proficiencyLabel[skill.proficiency] }}
                  </button>
                  <button style="font-size: 10px; color: var(--md-error); background: none; border: none; cursor: pointer;" @click="removeSkill(idx, gi, si)">删除</button>
                </div>
                <textarea
                  class="editor-textarea"
                  style="min-height: 40px;"
                  placeholder="技能描述"
                  :value="skill.description"
                  @input="updateSkill(idx, gi, si, 'description', ($event.target as HTMLTextAreaElement).value)"
                />
              </div>
              <button class="editor-add-btn" @click="addSkill(idx, gi)">+ 添加技能</button>
            </div>
            <button class="editor-add-btn" @click="addSkillGroup(idx)">+ 添加技能分类</button>
          </template>

          <!-- Experience -->
          <template v-if="section.type === 'experience'">
            <div class="editor-field">
              <label class="editor-label">组件标题</label>
              <input class="editor-input" :value="section.title" @input="updateSectionTitle(idx, ($event.target as HTMLInputElement).value)" />
            </div>
            <div v-for="(job, ji) in section.items" :key="ji" style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--md-outline-variant);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 600; color: var(--md-primary);">{{ job.company || '新经历' }}</span>
                <button v-if="section.items.length > 1" class="editor-add-btn" style="padding: 2px 8px; border-style: solid; color: var(--md-error); border-color: var(--md-error);" @click="removeJob(idx, ji)">删除</button>
              </div>
              <div class="editor-field">
                <label class="editor-label">公司 · 部门</label>
                <input class="editor-input" :value="job.company" @input="updateJob(idx, ji, 'company', ($event.target as HTMLInputElement).value)" />
              </div>
              <div class="editor-field">
                <label class="editor-label">职位</label>
                <input class="editor-input" :value="job.role" @input="updateJob(idx, ji, 'role', ($event.target as HTMLInputElement).value)" />
              </div>
              <div class="editor-field">
                <label class="editor-label">
                  介绍
                  <span v-if="hasFormatting(job.introduction)" class="format-badge" title="含富文本格式，请在预览区编辑">已格式化</span>
                </label>
                <textarea class="editor-textarea" style="min-height: 40px;" :value="job.introduction" @input="updateJob(idx, ji, 'introduction', ($event.target as HTMLTextAreaElement).value)" />
              </div>
              <div style="display: flex; gap: 8px;">
                <div class="editor-field" style="flex: 1;">
                  <label class="editor-label">开始时间</label>
                  <input class="editor-input" :value="job.startDate" @input="updateJob(idx, ji, 'startDate', ($event.target as HTMLInputElement).value)" />
                </div>
                <div class="editor-field" style="flex: 1;">
                  <label class="editor-label">结束时间</label>
                  <input class="editor-input" :value="job.endDate" @input="updateJob(idx, ji, 'endDate', ($event.target as HTMLInputElement).value)" />
                </div>
              </div>
              <div v-for="(h, hi) in job.highlights" :key="hi" class="editor-field">
                <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 3px;">
                  <label class="editor-label" style="margin: 0; flex: 1;">亮点 {{ hi + 1 }}</label>
                  <span v-if="hasFormatting(h)" class="format-badge" title="含富文本格式，请在预览区编辑">已格式化</span>
                  <button v-if="job.highlights.length > 1" style="font-size: 10px; color: var(--md-error); background: none; border: none; cursor: pointer;" @click="removeHighlight(idx, ji, hi)">删除</button>
                </div>
                <textarea class="editor-textarea" style="min-height: 40px;" :value="h" @input="updateHighlight(idx, ji, hi, ($event.target as HTMLTextAreaElement).value)" />
              </div>
              <button class="editor-add-btn" @click="addHighlight(idx, ji)">+ 添加亮点</button>
            </div>
            <button class="editor-add-btn" @click="addJob(idx)">+ 添加工作经历</button>
          </template>

          <!-- Projects -->
          <template v-if="section.type === 'projects'">
            <div class="editor-field">
              <label class="editor-label">组件标题</label>
              <input class="editor-input" :value="section.title" @input="updateSectionTitle(idx, ($event.target as HTMLInputElement).value)" />
            </div>
            <div v-for="(project, pi) in section.items" :key="pi" style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--md-outline-variant);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 600; color: var(--md-primary);">{{ project.name || '新项目' }}</span>
                <button v-if="section.items.length > 1" class="editor-add-btn" style="padding: 2px 8px; border-style: solid; color: var(--md-error); border-color: var(--md-error);" @click="removeProject(idx, pi)">删除</button>
              </div>
              <div class="editor-field">
                <label class="editor-label">项目名称</label>
                <input class="editor-input" :value="project.name" @input="updateProject(idx, pi, 'name', ($event.target as HTMLInputElement).value)" />
              </div>
              <div style="display: flex; gap: 8px;">
                <div class="editor-field" style="flex: 1;">
                  <label class="editor-label">Stars</label>
                  <input class="editor-input" :value="project.stars" @input="updateProject(idx, pi, 'stars', ($event.target as HTMLInputElement).value)" />
                </div>
                <div class="editor-field" style="flex: 1;">
                  <label class="editor-label">角色</label>
                  <input class="editor-input" :value="project.role" @input="updateProject(idx, pi, 'role', ($event.target as HTMLInputElement).value)" />
                </div>
              </div>
              <div class="editor-field">
                <label class="editor-label">链接</label>
                <input class="editor-input" :value="project.link" @input="updateProject(idx, pi, 'link', ($event.target as HTMLInputElement).value)" />
              </div>
              <div class="editor-field">
                <label class="editor-label">
                  介绍
                  <span v-if="hasFormatting(project.introduction)" class="format-badge" title="含富文本格式，请在预览区编辑">已格式化</span>
                </label>
                <textarea class="editor-textarea" style="min-height: 40px;" :value="project.introduction" @input="updateProject(idx, pi, 'introduction', ($event.target as HTMLTextAreaElement).value)" />
              </div>
              <div class="editor-field">
                <label class="editor-label">
                  描述
                  <span v-if="hasFormatting(project.description)" class="format-badge" title="含富文本格式，请在预览区编辑">已格式化</span>
                </label>
                <textarea class="editor-textarea" :value="project.description" @input="updateProject(idx, pi, 'description', ($event.target as HTMLTextAreaElement).value)" />
              </div>
              <div class="editor-field">
                <label class="editor-label">技术栈（逗号分隔）</label>
                <input class="editor-input" :value="project.stack.join(', ')" @input="updateProject(idx, pi, 'stack', ($event.target as HTMLInputElement).value.split(',').map((s: string) => s.trim()).filter(Boolean))" />
              </div>
            </div>
            <button class="editor-add-btn" @click="addProject(idx)">+ 添加项目</button>
          </template>

          <!-- Education -->
          <template v-if="section.type === 'education'">
            <div class="editor-field">
              <label class="editor-label">组件标题</label>
              <input class="editor-input" :value="section.title" @input="updateSectionTitle(idx, ($event.target as HTMLInputElement).value)" />
            </div>
            <div v-for="(edu, ei) in section.items" :key="ei" style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--md-outline-variant);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 600; color: var(--md-primary);">{{ edu.school || '新教育经历' }}</span>
                <button class="editor-add-btn" style="padding: 2px 8px; border-style: solid; color: var(--md-error); border-color: var(--md-error);" @click="removeEducation(idx, ei)">删除</button>
              </div>
              <div class="editor-field">
                <label class="editor-label">学校 · 专业 · 学位</label>
                <input class="editor-input" :value="edu.school" @input="updateEducation(idx, ei, 'school', ($event.target as HTMLInputElement).value)" />
              </div>
              <div style="display: flex; gap: 8px;">
                <div class="editor-field" style="flex: 1;">
                  <label class="editor-label">开始时间</label>
                  <input class="editor-input" :value="edu.startDate" @input="updateEducation(idx, ei, 'startDate', ($event.target as HTMLInputElement).value)" />
                </div>
                <div class="editor-field" style="flex: 1;">
                  <label class="editor-label">结束时间</label>
                  <input class="editor-input" :value="edu.endDate" @input="updateEducation(idx, ei, 'endDate', ($event.target as HTMLInputElement).value)" />
                </div>
              </div>
              <div class="editor-field">
                <label class="editor-label">
                  详情
                  <span v-if="hasFormatting(edu.detail)" class="format-badge" title="含富文本格式，请在预览区编辑">已格式化</span>
                </label>
                <textarea class="editor-textarea" :value="edu.detail" @input="updateEducation(idx, ei, 'detail', ($event.target as HTMLTextAreaElement).value)" />
              </div>
            </div>
            <button class="editor-add-btn" @click="addEducation(idx)">+ 添加教育背景</button>
          </template>

          <!-- Custom -->
          <template v-if="section.type === 'custom'">
            <div class="editor-field">
              <label class="editor-label">组件标题</label>
              <input class="editor-input" :value="section.title" @input="updateSectionTitle(idx, ($event.target as HTMLInputElement).value)" />
            </div>
            <div class="editor-field">
              <label class="editor-label">
                内容
                <span v-if="hasFormatting(section.text)" class="format-badge" title="含富文本格式，请在预览区编辑">已格式化</span>
              </label>
              <textarea class="editor-textarea" :value="section.text" @input="updateCustom(idx, ($event.target as HTMLTextAreaElement).value)" />
            </div>
          </template>
        </div>
      </div>

      <!-- Add section -->
      <div class="editor-section">
        <div class="editor-section-body" style="padding-top: 12px;">
          <div class="editor-label" style="margin-bottom: 8px;">添加新组件</div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            <button
              v-for="opt in sectionTypeOptions"
              :key="opt.value"
              class="editor-add-btn"
              @click="addSection(opt.value, opt.label)"
            >
              + {{ opt.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- JSON Tab -->
    <div v-else class="editor-scroll">
      <div class="editor-section-body">
        <div class="editor-field">
          <label class="editor-label">实时 JSON（修改后自动同步）</label>
          <textarea
            class="editor-textarea"
            style="min-height: 360px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px;"
            :value="jsonText"
            @input="jsonText = ($event.target as HTMLTextAreaElement).value; onJsonInput()"
          />
          <div v-if="jsonError" style="font-size: 11px; color: var(--md-error); margin-top: 4px;">{{ jsonError }}</div>
        </div>
      </div>
    </div>

    <!-- Bottom actions -->
    <div class="editor-footer">
      <button class="editor-footer-btn" @click="handleImportJSON">导入 JSON</button>
      <button class="editor-footer-btn" @click="handleExportJSON">导出 JSON</button>
      <button class="editor-footer-btn" style="color: var(--md-error);" @click="resetToDefault">重置</button>
    </div>
  </aside>
</template>
