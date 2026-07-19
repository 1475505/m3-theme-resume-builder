<script setup lang="ts">
import type { Education } from '~/data/resume'

const props = defineProps<{
  title: string
  education: Education[]
  index: number
  hiddenFields: string[]
}>()

const { updateSectionTitle, updateEducation } = useResume()

function isHidden(field: string) {
  return props.hiddenFields.includes(field)
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
    <div v-for="(edu, ei) in education" :key="edu.school + ei">
      <div class="edu-row">
        <span class="edu-school">
          <EditableText :modelValue="edu.school" @update:modelValue="updateEducation(index, ei, 'school', $event)" />
        </span>
        <span v-if="!isHidden('date')" class="edu-date">
          <EditableText :modelValue="edu.startDate" @update:modelValue="updateEducation(index, ei, 'startDate', $event)" /> —
          <EditableText :modelValue="edu.endDate" @update:modelValue="updateEducation(index, ei, 'endDate', $event)" />
        </span>
      </div>
      <p v-if="!isHidden('detail') && edu.detail" class="edu-detail">
        <EditableText :modelValue="edu.detail" block @update:modelValue="updateEducation(index, ei, 'detail', $event)" />
      </p>
    </div>
  </section>
</template>
