<script setup lang="ts">
import { sanitizeHTML } from '~/composables/useFormat'

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

const el = ref<HTMLElement | null>(null)
const isFocused = ref(false)

// Set innerHTML from props — only when not focused (avoid cursor jump)
function syncFromProps() {
  if (!el.value) return
  const value = props.modelValue || '\u00A0'
  if (el.value.innerHTML !== value) {
    el.value.innerHTML = value
  }
}

onMounted(() => {
  syncFromProps()
})

// Watch external changes — only sync when not editing
watch(() => props.modelValue, () => {
  if (!isFocused.value) {
    syncFromProps()
  }
})

function onFocus() {
  isFocused.value = true
}

function onBlur(e: FocusEvent) {
  isFocused.value = false
  const html = (e.target as HTMLElement).innerHTML || ''
  // Sanitize: keep only b/strong/i/em/br, strip everything else
  const cleaned = sanitizeHTML(html.replace(/\u00A0/g, ' ').trim())
  if (cleaned !== props.modelValue) {
    emit('update:modelValue', cleaned)
  } else {
    // Re-sync to normalize any transient DOM state
    syncFromProps()
  }
}

// Let browser handle Ctrl+B / Ctrl+I natively in contenteditable
// No interception needed — execCommand works automatically
</script>

<template>
  <span
    ref="el"
    contenteditable="true"
    spellcheck="false"
    class="editable"
    :class="{ 'editable-block': block }"
    :data-placeholder="placeholder"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
