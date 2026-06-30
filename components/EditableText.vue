<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string
  block?: boolean
  placeholder?: string
}>(), {
  placeholder: '点击编辑',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// displayValue ONLY reads from props — never changes during typing
const displayValue = computed(() => props.modelValue || '\u00A0')

function onBlur(e: FocusEvent) {
  const text = (e.target as HTMLElement).textContent || ''
  const cleaned = text.replace(/\u00A0/g, ' ').trim()
  if (cleaned !== props.modelValue) {
    emit('update:modelValue', cleaned)
  }
}
</script>

<template>
  <span
    contenteditable="true"
    spellcheck="false"
    class="editable"
    :class="{ 'editable-block': block }"
    :data-placeholder="placeholder"
    @blur="onBlur"
  >{{ displayValue }}</span>
</template>
