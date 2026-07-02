<script setup lang="ts">
import { getFormatState } from '~/composables/useFormat'

/**
 * Floating mini-toolbar for bold / italic formatting.
 *
 * Shows above the currently focused .editable element.
 * Visibility is driven by whether a .editable element has focus.
 */

const visible = ref(false)
const toolbarStyle = ref<Record<string, string>>({})
const bold = ref(false)
const italic = ref(false)
const underline = ref(false)

let currentEditable: HTMLElement | null = null

function updatePosition() {
  if (!currentEditable) return
  const rect = currentEditable.getBoundingClientRect()
  // Position toolbar above the editable element, centered horizontally
  const top = rect.top - 40
  const left = rect.left + rect.width / 2
  toolbarStyle.value = {
    position: 'fixed',
    top: `${Math.max(8, top)}px`,
    left: `${left}px`,
    transform: 'translateX(-50%)',
  }
}

function updateState() {
  const state = getFormatState()
  bold.value = state.bold
  italic.value = state.italic
  underline.value = state.underline
}

function onFocusIn(e: FocusInEvent) {
  const target = e.target as HTMLElement
  if (target.classList?.contains('editable')) {
    currentEditable = target
    visible.value = true
    updatePosition()
    updateState()
  }
}

function onFocusOut(e: FocusOutEvent) {
  const target = e.target as HTMLElement
  if (target.classList?.contains('editable')) {
    // Delay to allow toolbar button clicks to register
    setTimeout(() => {
      if (!document.activeElement?.classList.contains('editable')) {
        visible.value = false
        currentEditable = null
      }
    }, 150)
  }
}

function onSelectionChange() {
  if (currentEditable && document.activeElement === currentEditable) {
    updateState()
  }
}

function applyBold() {
  document.execCommand('bold')
  updateState()
}

function applyItalic() {
  document.execCommand('italic')
  updateState()
}

function applyUnderline() {
  document.execCommand('underline')
  updateState()
}

onMounted(() => {
  document.addEventListener('focusin', onFocusIn, true)
  document.addEventListener('focusout', onFocusOut, true)
  document.addEventListener('selectionchange', onSelectionChange)
  window.addEventListener('scroll', updatePosition, true)
  window.addEventListener('resize', updatePosition)
})

onUnmounted(() => {
  document.removeEventListener('focusin', onFocusIn, true)
  document.removeEventListener('focusout', onFocusOut, true)
  document.removeEventListener('selectionchange', onSelectionChange)
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
})
</script>

<template>
  <div v-if="visible" class="format-toolbar" :style="toolbarStyle" @mousedown.prevent>
    <button
      class="format-btn"
      :class="{ active: bold }"
      title="加粗 (Ctrl+B)"
      @click="applyBold"
    >
      <span class="material-symbols-outlined">format_bold</span>
    </button>
    <button
      class="format-btn"
      :class="{ active: italic }"
      title="斜体 (Ctrl+I)"
      @click="applyItalic"
    >
      <span class="material-symbols-outlined">format_italic</span>
    </button>
    <button
      class="format-btn"
      :class="{ active: underline }"
      title="下划线 (Ctrl+U)"
      @click="applyUnderline"
    >
      <span class="material-symbols-outlined">format_underlined</span>
    </button>
  </div>
</template>
