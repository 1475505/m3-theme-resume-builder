<script setup lang="ts">
import type { Job } from '~/data/resume'

const props = defineProps<{
  title: string
  jobs: Job[]
  index: number
  hiddenFields: string[]
}>()

const { updateSectionTitle, updateJob, updateHighlight } = useResume()

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

    <div v-for="(job, ji) in jobs" :key="job.company + ji" class="job-card">
      <div class="job-card-header">
        <span class="job-company">
          <EditableText :modelValue="job.company" @update:modelValue="updateJob(index, ji, 'company', $event)" />
        </span>
        <span v-if="!isHidden('date')" class="job-date">
          <EditableText :modelValue="job.startDate" @update:modelValue="updateJob(index, ji, 'startDate', $event)" /> —
          <EditableText :modelValue="job.endDate" @update:modelValue="updateJob(index, ji, 'endDate', $event)" />
        </span>
      </div>
      <div v-if="!isHidden('role')" class="job-role">
        <EditableText :modelValue="job.role" @update:modelValue="updateJob(index, ji, 'role', $event)" />
      </div>
      <p v-if="!isHidden('introduction') && job.introduction" class="job-introduction">
        <EditableText :modelValue="job.introduction" block @update:modelValue="updateJob(index, ji, 'introduction', $event)" />
      </p>
      <ul v-if="!isHidden('highlights')" class="job-highlights">
        <li v-for="(h, hi) in job.highlights" :key="hi">
          <EditableText :modelValue="h" block @update:modelValue="updateHighlight(index, ji, hi, $event)" />
        </li>
      </ul>
    </div>
  </section>
</template>
