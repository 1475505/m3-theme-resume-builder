<script setup lang="ts">
import { getFormatState, getColorPalette, getFontSizePresets, applyColor, removeColor, applyFontSize } from '~/composables/useFormat'

/**
 * Floating mini-toolbar for bold / italic / underline / color / font-size formatting.
 *
 * Shows above the currently focused .editable element.
 * Visibility is driven by whether a .editable element has focus.
 */

const visible = ref(false)
const toolbarStyle = ref<Record<string, string>>({})
const bold = ref(false)
const italic = ref(false)
const underline = ref(false)
const showColorPicker = ref(false)
const showSizePicker = ref(false)
const colorPalette = ref<{ name: string; value: string }[]>([])
const fontSizePresets = ref(getFontSizePresets())
const customColor = ref('#000000')
const colorPickerRef = ref<HTMLInputElement | null>(null)

let currentEditable: HTMLElement | null = null

function updatePosition() {
  if (!currentEditable) return
  const rect = currentEditable.getBoundingClientRect()
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

function refreshPalette() {
  colorPalette.value = getColorPalette()
  fontSizePresets.value = getFontSizePresets()
}

function onFocusIn(e: FocusInEvent) {
  const target = e.target as HTMLElement
  if (target.classList?.contains('editable')) {
    currentEditable = target
    visible.value = true
    showColorPicker.value = false
    showSizePicker.value = false
    refreshPalette()
    updatePosition()
    updateState()
  }
}

function onFocusOut(e: FocusOutEvent) {
  const target = e.target as HTMLElement
  if (target.classList?.contains('editable')) {
    setTimeout(() => {
      if (!document.activeElement?.classList.contains('editable')) {
        visible.value = false
        showColorPicker.value = false
        showSizePicker.value = false
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

function toggleColorPicker() {
  showColorPicker.value = !showColorPicker.value
  showSizePicker.value = false
  if (showColorPicker.value) refreshPalette()
}

function toggleSizePicker() {
  showSizePicker.value = !showSizePicker.value
  showColorPicker.value = false
}

function onPickColor(color: string) {
  applyColor(color)
  showColorPicker.value = false
  updateState()
}

function onRemoveColor() {
  removeColor()
  showColorPicker.value = false
  updateState()
}

function onPickSize(htmlSize: string) {
  applyFontSize(htmlSize)
  showSizePicker.value = false
  updateState()
}

function openCustomPicker() {
  colorPickerRef.value?.click()
}

function onCustomColor(e: Event) {
  const input = e.target as HTMLInputElement
  applyColor(input.value)
  showColorPicker.value = false
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
    <span class="format-divider" />
    <button
      class="format-btn"
      :class="{ active: showSizePicker }"
      title="字号"
      @click="toggleSizePicker"
    >
      <span class="material-symbols-outlined">format_size</span>
    </button>
    <div v-if="showSizePicker" class="size-picker">
      <button
        v-for="preset in fontSizePresets"
        :key="preset.htmlSize"
        class="size-option"
        :style="{ fontSize: preset.size }"
        @click="onPickSize(preset.htmlSize)"
      >
        {{ preset.label }}
      </button>
    </div>
    <button
      class="format-btn"
      :class="{ active: showColorPicker }"
      title="文字颜色"
      @click="toggleColorPicker"
    >
      <span class="material-symbols-outlined">format_color_text</span>
    </button>
    <div v-if="showColorPicker" class="color-palette">
      <button
        class="color-swatch color-swatch--remove"
        title="移除颜色"
        @click="onRemoveColor"
      >
        <span class="material-symbols-outlined">format_clear</span>
      </button>
      <button
        v-for="c in colorPalette"
        :key="c.value"
        class="color-swatch"
        :style="{ background: c.value }"
        :title="c.name"
        @click="onPickColor(c.value)"
      />
      <button
        class="color-swatch color-swatch--custom"
        title="自定义颜色"
        @click="openCustomPicker"
      >
        <span class="material-symbols-outlined">palette</span>
      </button>
      <input
        ref="colorPickerRef"
        type="color"
        class="color-picker-hidden"
        :value="customColor"
        @input="onCustomColor"
      />
    </div>
  </div>
</template>
