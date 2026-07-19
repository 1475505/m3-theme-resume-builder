import { ref, watch } from 'vue'
import {
  resumeData,
  type ResumeData,
  type ResumeSection,
  type SectionType,
  type Skill,
  createSummarySection,
  createSkillsSection,
  createExperienceSection,
  createProjectsSection,
  createEducationSection,
  createCustomSection,
  createEmptyJob,
  createEmptyProject,
  createEmptyEducation,
  createEmptySkillGroup,
  createEmptySkill,
} from '~/data/resume'

const STORAGE_KEY = 'm3-resume-data'

function migrateLegacyData(parsed: any): ResumeData {
  if (parsed?.sections && Array.isArray(parsed.sections)) {
    const result = parsed as ResumeData
    // Ensure introduction field exists on all Job and Project items
    for (const section of result.sections) {
      if (section.type === 'experience') {
        for (const job of section.items) {
          if (job.introduction === undefined) job.introduction = ''
          if (!Array.isArray(job.stack)) job.stack = []
        }
      } else if (section.type === 'projects') {
        for (const project of section.items) {
          if (project.introduction === undefined) project.introduction = ''
          if (!Array.isArray(project.highlights)) project.highlights = []
        }
      }
    }
    return result
  }
  // Migrate old flat format to component-based sections
  return {
    basics: parsed?.basics || structuredClone(resumeData.basics),
    sections: [
      createSummarySection('专业概述', parsed?.summary || ''),
      createSkillsSection('专业技能', parsed?.skills || []),
      createExperienceSection('工作经历', parsed?.experience || []),
      createProjectsSection('项目经历', parsed?.projects || []),
      createEducationSection('教育背景', parsed?.education || []),
    ],
  }
}

function loadInitialData(): ResumeData {
  if (typeof window === 'undefined') return structuredClone(resumeData)
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      const migrated = migrateLegacyData(parsed)
      if (migrated?.basics && Array.isArray(migrated?.sections)) {
        return migrated
      }
    }
  } catch {
    // ignore corrupt storage
  }
  return structuredClone(resumeData)
}

/**
 * Composable for resume data state management.
 * Provides reactive data and mutation methods for the editor.
 */
const data = ref<ResumeData>(loadInitialData())

if (typeof window !== 'undefined') {
  watch(
    data,
    (value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      } catch {
        // storage may be full or disabled
      }
    },
    { deep: true },
  )
}

const proficiencyOrder: Skill['proficiency'][] = ['expert', 'mastered', 'proficient', 'familiar', 'aware']

const sectionFactories: Record<SectionType, (title?: string) => ResumeSection> = {
  summary: (title) => createSummarySection(title || '专业概述', ''),
  skills: (title) => createSkillsSection(title || '专业技能', [createEmptySkillGroup()], 'list'),
  experience: (title) => createExperienceSection(title || '工作经历', [createEmptyJob()]),
  projects: (title) => createProjectsSection(title || '项目经历', [createEmptyProject()]),
  education: (title) => createEducationSection(title || '教育背景', [createEmptyEducation()]),
  custom: (title) => createCustomSection(title || '自定义', ''),
}

function assertSection<T extends ResumeSection>(index: number, type: T['type']): T {
  const section = data.value.sections[index]
  if (section.type !== type) {
    throw new Error(`Expected section ${index} to be ${type}, got ${section.type}`)
  }
  return section as T
}

export function useResume() {
  function resetToDefault() {
    data.value = structuredClone(resumeData)
  }

  // Basics
  function updateBasics(field: keyof ResumeData['basics'], value: string) {
    if (field === 'name') data.value.basics.name = value
    else if (field === 'title') data.value.basics.title = value
  }

  function updateContact(index: number, value: string) {
    data.value.basics.contacts[index].text = value
  }

  function updateContactIcon(index: number, icon: string) {
    data.value.basics.contacts[index].icon = icon
  }

  function addContact() {
    data.value.basics.contacts.push({ icon: 'link', text: '' })
  }

  function removeContact(index: number) {
    data.value.basics.contacts.splice(index, 1)
  }

  // Section management
  function addSection(type: SectionType, title?: string) {
    data.value.sections.push(sectionFactories[type](title))
  }

  function removeSection(index: number) {
    data.value.sections.splice(index, 1)
  }

  function moveSection(from: number, to: number) {
    const sections = data.value.sections
    if (to < 0 || to >= sections.length) return
    const [moved] = sections.splice(from, 1)
    sections.splice(to, 0, moved)
  }

  function updateSectionTitle(index: number, title: string) {
    data.value.sections[index].title = title
  }

  // Field visibility
  function toggleFieldVisibility(index: number, field: string) {
    const section = data.value.sections[index]
    if (!section.hiddenFields) section.hiddenFields = []
    const idx = section.hiddenFields.indexOf(field)
    if (idx === -1) {
      section.hiddenFields.push(field)
    } else {
      section.hiddenFields.splice(idx, 1)
    }
  }

  function isFieldHidden(index: number, field: string): boolean {
    return data.value.sections[index].hiddenFields?.includes(field) ?? false
  }

  // Summary
  function updateSummary(index: number, value: string) {
    assertSection<ReturnType<typeof createSummarySection>>(index, 'summary').text = value
  }

  function updateSkillsView(index: number, view: 'list' | 'cards') {
    assertSection<ReturnType<typeof createSkillsSection>>(index, 'skills').view = view
  }

  function updateSkillsCardColumns(index: number, columns: number) {
    assertSection<ReturnType<typeof createSkillsSection>>(index, 'skills').cardColumns = columns
  }

  // Skills
  function addSkillGroup(index: number) {
    assertSection<ReturnType<typeof createSkillsSection>>(index, 'skills').groups.push(createEmptySkillGroup())
  }

  function removeSkillGroup(index: number, groupIdx: number) {
    assertSection<ReturnType<typeof createSkillsSection>>(index, 'skills').groups.splice(groupIdx, 1)
  }

  function updateSkillGroup(index: number, groupIdx: number, field: keyof SkillGroup, value: string) {
    const section = assertSection<ReturnType<typeof createSkillsSection>>(index, 'skills')
    ;(section.groups[groupIdx] as any)[field] = value
  }

  function addSkill(index: number, groupIdx: number) {
    assertSection<ReturnType<typeof createSkillsSection>>(index, 'skills').groups[groupIdx].skills.push(createEmptySkill())
  }

  function removeSkill(index: number, groupIdx: number, skillIdx: number) {
    assertSection<ReturnType<typeof createSkillsSection>>(index, 'skills').groups[groupIdx].skills.splice(skillIdx, 1)
  }

  function updateSkill(index: number, groupIdx: number, skillIdx: number, field: keyof Skill, value: string | number) {
    const section = assertSection<ReturnType<typeof createSkillsSection>>(index, 'skills')
    ;(section.groups[groupIdx].skills[skillIdx] as any)[field] = value
  }

  function updateSkillYears(index: number, groupIdx: number, skillIdx: number, value: string) {
    const years = parseFloat(value)
    assertSection<ReturnType<typeof createSkillsSection>>(index, 'skills').groups[groupIdx].skills[skillIdx].years = Number.isNaN(years) ? 0 : years
  }

  function cycleSkillProficiency(index: number, groupIdx: number, skillIdx: number) {
    const skill = assertSection<ReturnType<typeof createSkillsSection>>(index, 'skills').groups[groupIdx].skills[skillIdx]
    const idx = proficiencyOrder.indexOf(skill.proficiency)
    skill.proficiency = proficiencyOrder[(idx + 1) % proficiencyOrder.length]
  }

  // Experience
  function addJob(index: number) {
    assertSection<ReturnType<typeof createExperienceSection>>(index, 'experience').items.push(createEmptyJob())
  }

  function removeJob(index: number, jobIdx: number) {
    assertSection<ReturnType<typeof createExperienceSection>>(index, 'experience').items.splice(jobIdx, 1)
  }

  function updateJob(index: number, jobIdx: number, field: string, value: string | string[]) {
    ;(assertSection<ReturnType<typeof createExperienceSection>>(index, 'experience').items[jobIdx] as any)[field] = value
  }

  function addHighlight(index: number, jobIdx: number) {
    assertSection<ReturnType<typeof createExperienceSection>>(index, 'experience').items[jobIdx].highlights.push('')
  }

  function removeHighlight(index: number, jobIdx: number, highlightIdx: number) {
    assertSection<ReturnType<typeof createExperienceSection>>(index, 'experience').items[jobIdx].highlights.splice(highlightIdx, 1)
  }

  function updateHighlight(index: number, jobIdx: number, highlightIdx: number, value: string) {
    assertSection<ReturnType<typeof createExperienceSection>>(index, 'experience').items[jobIdx].highlights[highlightIdx] = value
  }

  function updateJobStack(index: number, jobIdx: number, stackIdx: number, value: string) {
    assertSection<ReturnType<typeof createExperienceSection>>(index, 'experience').items[jobIdx].stack[stackIdx] = value
  }

  function removeJobStack(index: number, jobIdx: number, stackIdx: number) {
    assertSection<ReturnType<typeof createExperienceSection>>(index, 'experience').items[jobIdx].stack.splice(stackIdx, 1)
  }

  function addJobStack(index: number, jobIdx: number) {
    assertSection<ReturnType<typeof createExperienceSection>>(index, 'experience').items[jobIdx].stack.push('')
  }

  // Projects
  function addProject(index: number) {
    assertSection<ReturnType<typeof createProjectsSection>>(index, 'projects').items.push(createEmptyProject())
  }

  function removeProject(index: number, projIdx: number) {
    assertSection<ReturnType<typeof createProjectsSection>>(index, 'projects').items.splice(projIdx, 1)
  }

  function updateProject(index: number, projIdx: number, field: string, value: string | string[]) {
    ;(assertSection<ReturnType<typeof createProjectsSection>>(index, 'projects').items[projIdx] as any)[field] = value
  }

  function updateProjectStack(index: number, projIdx: number, stackIdx: number, value: string) {
    assertSection<ReturnType<typeof createProjectsSection>>(index, 'projects').items[projIdx].stack[stackIdx] = value
  }

  function removeProjectStack(index: number, projIdx: number, stackIdx: number) {
    assertSection<ReturnType<typeof createProjectsSection>>(index, 'projects').items[projIdx].stack.splice(stackIdx, 1)
  }

  function addProjectStack(index: number, projIdx: number) {
    assertSection<ReturnType<typeof createProjectsSection>>(index, 'projects').items[projIdx].stack.push('')
  }

  function addProjectHighlight(index: number, projIdx: number) {
    assertSection<ReturnType<typeof createProjectsSection>>(index, 'projects').items[projIdx].highlights.push('')
  }

  function removeProjectHighlight(index: number, projIdx: number, highlightIdx: number) {
    assertSection<ReturnType<typeof createProjectsSection>>(index, 'projects').items[projIdx].highlights.splice(highlightIdx, 1)
  }

  function updateProjectHighlight(index: number, projIdx: number, highlightIdx: number, value: string) {
    assertSection<ReturnType<typeof createProjectsSection>>(index, 'projects').items[projIdx].highlights[highlightIdx] = value
  }

  // Education
  function addEducation(index: number) {
    assertSection<ReturnType<typeof createEducationSection>>(index, 'education').items.push(createEmptyEducation())
  }

  function removeEducation(index: number, eduIdx: number) {
    assertSection<ReturnType<typeof createEducationSection>>(index, 'education').items.splice(eduIdx, 1)
  }

  function updateEducation(index: number, eduIdx: number, field: string, value: string) {
    ;(assertSection<ReturnType<typeof createEducationSection>>(index, 'education').items[eduIdx] as any)[field] = value
  }

  // Custom
  function updateCustom(index: number, value: string) {
    assertSection<ReturnType<typeof createCustomSection>>(index, 'custom').text = value
  }

  // JSON
  function importJSON(json: ResumeData) {
    data.value = migrateLegacyData(json)
  }

  function exportJSON(): string {
    return JSON.stringify(data.value, null, 2)
  }

  return {
    data,
    resetToDefault,
    updateBasics,
    updateContact,
    updateContactIcon,
    addContact,
    removeContact,
    addSection,
    removeSection,
    moveSection,
    updateSectionTitle,
    toggleFieldVisibility,
    isFieldHidden,
    updateSummary,
    updateSkillsView,
    updateSkillsCardColumns,
    addSkillGroup,
    removeSkillGroup,
    updateSkillGroup,
    addSkill,
    removeSkill,
    updateSkill,
    updateSkillYears,
    cycleSkillProficiency,
    addJob,
    removeJob,
    updateJob,
    addHighlight,
    removeHighlight,
    updateHighlight,
    updateJobStack,
    removeJobStack,
    addJobStack,
    addProject,
    removeProject,
    updateProject,
    updateProjectStack,
    removeProjectStack,
    addProjectStack,
    addProjectHighlight,
    removeProjectHighlight,
    updateProjectHighlight,
    addEducation,
    removeEducation,
    updateEducation,
    updateCustom,
    importJSON,
    exportJSON,
  }
}
