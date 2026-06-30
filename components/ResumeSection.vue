<script setup lang="ts">
import type { ResumeSection } from '~/data/resume'

defineProps<{
  section: ResumeSection
  index: number
}>()
</script>

<template>
  <SummarySection
    v-if="section.type === 'summary'"
    :title="section.title"
    :text="section.text"
    :index="index"
    :hiddenFields="section.hiddenFields ?? []"
  />
  <SkillsSection
    v-else-if="section.type === 'skills'"
    :title="section.title"
    :groups="section.groups"
    :view="section.view"
    :cardColumns="(section as any).cardColumns ?? 2"
    :index="index"
    :hiddenFields="section.hiddenFields ?? []"
  />
  <WorkExperience
    v-else-if="section.type === 'experience'"
    :title="section.title"
    :jobs="section.items"
    :index="index"
    :hiddenFields="section.hiddenFields ?? []"
  />
  <ProjectsSection
    v-else-if="section.type === 'projects'"
    :title="section.title"
    :projects="section.items"
    :index="index"
    :hiddenFields="section.hiddenFields ?? []"
  />
  <EducationSection
    v-else-if="section.type === 'education'"
    :title="section.title"
    :education="section.items"
    :index="index"
    :hiddenFields="section.hiddenFields ?? []"
  />
  <CustomSection
    v-else-if="section.type === 'custom'"
    :title="section.title"
    :text="section.text"
    :index="index"
    :hiddenFields="section.hiddenFields ?? []"
  />
</template>
