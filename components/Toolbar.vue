<script setup lang="ts">
const { currentSeed, isDark, setSeedColor, toggleDarkMode, presetColors } = useTheme()

const emit = defineEmits<{
  (e: 'export-pdf'): void
}>()

const exporting = ref(false)
const customColor = ref(currentSeed.value)
const colorPickerRef = ref<HTMLInputElement | null>(null)

async function handleExport() {
  exporting.value = true
  emit('export-pdf')
  setTimeout(() => { exporting.value = false }, 2000)
}

function openCustomPicker() {
  colorPickerRef.value?.click()
}

function onCustomColor(e: Event) {
  const input = e.target as HTMLInputElement
  customColor.value = input.value
  setSeedColor(input.value)
}
</script>

<template>
  <nav class="toolbar">
    <span class="toolbar-label">M3 Resume</span>
    <div class="toolbar-divider" />
    <div class="color-swatches">
      <button
        v-for="color in presetColors"
        :key="color.hue"
        class="swatch"
        :class="{ active: currentSeed === color.hex }"
        :title="color.name"
        :style="{ background: color.hex }"
        @click="setSeedColor(color.hex)"
      />
      <button
        class="swatch swatch--custom"
        title="自定义颜色"
        @click="openCustomPicker"
      >
        <span class="material-symbols-outlined">palette</span>
      </button>
      <input
        ref="colorPickerRef"
        type="color"
        class="toolbar-color-picker-hidden"
        :value="customColor"
        @input="onCustomColor"
      />
    </div>
    <div class="toolbar-divider" />
    <button class="icon-btn" title="切换深色模式" @click="toggleDarkMode">
      <span class="material-symbols-outlined">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
    </button>
    <button class="icon-btn" title="打印" @click="() => window.print()">
      <span class="material-symbols-outlined">print</span>
    </button>
    <button class="pdf-btn" :disabled="exporting" @click="handleExport">
      {{ exporting ? '导出中...' : '导出 PDF' }}
    </button>
  </nav>
</template>
