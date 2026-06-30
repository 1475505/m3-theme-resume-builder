<script setup lang="ts">
const props = defineProps<{
  title: string
  text: string
  index: number
  hiddenFields: string[]
}>()

const { updateSectionTitle, updateCustom } = useResume()
</script>

<template>
  <section class="section">
    <div class="section-header">
      <div class="section-bar" />
      <h2 class="section-title">
        <EditableText :modelValue="title" @update:modelValue="updateSectionTitle(index, $event)" />
      </h2>
    </div>
    <p class="summary-text">
      <EditableText :modelValue="text" block @update:modelValue="updateCustom(index, $event)" />
    </p>
  </section>
</template>
