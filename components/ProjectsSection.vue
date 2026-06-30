<script setup lang="ts">
import type { Project } from '~/data/resume'

const props = defineProps<{
  title: string
  projects: Project[]
  index: number
  hiddenFields: string[]
}>()

const { updateSectionTitle, updateProject, updateProjectStack, removeProjectStack, addProjectStack } = useResume()

function isHidden(field: string) {
  return props.hiddenFields.includes(field)
}

function detectLinkIcon(link: string): string {
  const lower = link.toLowerCase()
  if (lower.includes('github.com')) return 'github'
  if (lower.includes('gitee.com')) return 'link'
  return 'link'
}

function onStackInput(pi: number, si: number, e: Event) {
  const value = (e.target as HTMLElement).textContent || ''
  if (!value.trim()) {
    removeProjectStack(index, pi, si)
  } else {
    updateProjectStack(index, pi, si, value)
  }
}
</script>

<template>
  <section class="section">
    <div class="section-header">
      <div class="section-bar" />
      <h2 class="section-title">
        <EditableText :modelValue="title" @update:modelValue="updateSectionTitle(index, $event)" />
      </h2>
    </div>

    <div v-for="(project, pi) in projects" :key="project.name + pi" class="project-card">
      <div class="project-header">
        <span class="project-name">
          <EditableText :modelValue="project.name" @update:modelValue="updateProject(index, pi, 'name', $event)" />
        </span>
        <span v-if="!isHidden('stars') && project.stars" class="project-badge">
          &#9733;
          <EditableText :modelValue="project.stars" @update:modelValue="updateProject(index, pi, 'stars', $event)" />
          Stars
        </span>
      </div>
      <div v-if="!isHidden('link') || !isHidden('role')" class="project-meta">
        <a v-if="!isHidden('link') && project.link" :href="`https://${project.link}`">
          <BrandIcon :name="detectLinkIcon(project.link)" />
          <EditableText :modelValue="project.link" @update:modelValue="updateProject(index, pi, 'link', $event)" />
        </a>
        <span v-if="!isHidden('role')">
          <EditableText :modelValue="project.role" @update:modelValue="updateProject(index, pi, 'role', $event)" />
        </span>
      </div>
      <p v-if="!isHidden('description')" class="project-desc">
        <EditableText :modelValue="project.description" block @update:modelValue="updateProject(index, pi, 'description', $event)" />
      </p>
      <div v-if="!isHidden('stack')" class="project-stack">
        <span
          v-for="(tech, si) in project.stack"
          :key="tech + si"
          class="chip project-stack-chip"
          contenteditable="true"
          spellcheck="false"
          @input="onStackInput(pi, si, $event)"
        >{{ tech }}</span>
        <button class="chip project-stack-add" title="添加技术栈" @click="addProjectStack(index, pi)">+</button>
      </div>
    </div>
  </section>
</template>
