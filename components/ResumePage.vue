<script setup lang="ts">
import type { ResumeData, ResumeSection } from '~/data/resume'

const props = defineProps<{
  data: ResumeData
}>()

const pages = ref<ResumeSection[][]>([])
const headerHeight = ref(0)
const footerHeight = ref(0)
const measureContainer = ref<HTMLElement | null>(null)
const measureHeader = ref<HTMLElement | null>(null)
const measureFooter = ref<HTMLElement | null>(null)
const sectionRefs = ref<HTMLElement[]>([])
const ready = ref(false)

function pxPerMm() {
  const el = document.createElement('div')
  el.style.width = '1mm'
  el.style.position = 'fixed'
  el.style.visibility = 'hidden'
  document.body.appendChild(el)
  const px = el.getBoundingClientRect().width
  document.body.removeChild(el)
  return px
}

function splitPages() {
  try {
    const ppm = pxPerMm()
    const pageHeightPx = 297 * ppm

    const headerEl = measureHeader.value?.$el || measureHeader.value
    const footerEl = measureFooter.value?.$el || measureFooter.value
    const hHeight = headerEl?.getBoundingClientRect().height ?? 0
    const fHeight = footerEl?.getBoundingClientRect().height ?? 0

    // Available content height on page 1 (with header) and following pages (no header)
    const firstPageAvailable = pageHeightPx - hHeight - fHeight
    const nextPageAvailable = pageHeightPx - fHeight

    const sectionNodes = sectionRefs.value.filter(Boolean)
    const sectionHeights = sectionNodes.map(node => {
      const el = node.$el || node
      const rect = el.getBoundingClientRect()
      const style = window.getComputedStyle(el)
      const marginTop = parseFloat(style.marginTop) || 0
      const marginBottom = parseFloat(style.marginBottom) || 0
      return rect.height + marginTop + marginBottom
    })

  const result: ResumeSection[][] = []
  let currentPage: ResumeSection[] = []
  let currentUsed = 0

  props.data.sections.forEach((section, idx) => {
    const height = sectionHeights[idx] ?? 0
    const available = result.length === 0 ? firstPageAvailable : nextPageAvailable

    // Start a new page if current section doesn't fit (unless page is empty)
    if (currentPage.length > 0 && currentUsed + height > available) {
      result.push(currentPage)
      currentPage = [section]
      currentUsed = height
    } else {
      currentPage.push(section)
      currentUsed += height
    }
  })

  if (currentPage.length) {
    result.push(currentPage)
  }

  headerHeight.value = hHeight
  footerHeight.value = fHeight
  pages.value = result
  ready.value = true
  } catch (err) {
    console.error('[ResumePage] splitPages error', err)
  }
}

onMounted(() => {
  nextTick(splitPages)
})

watch(() => props.data, () => {
  nextTick(splitPages)
}, { deep: true })

function setSectionRef(el: any, idx: number) {
  if (el) sectionRefs.value[idx] = el
}
</script>

<template>
  <div class="page-wrapper">
    <!-- Measurement container (off-screen but rendered, single pass) -->
    <div
      ref="measureContainer"
      class="a4-page measure-page"
      aria-hidden="true"
    >
      <ResumeHeader ref="measureHeader" :basics="data.basics" />
      <div class="resume-body">
        <ResumeSection
          v-for="(section, idx) in data.sections"
          :key="`m-${section.id}`"
          :ref="(el) => setSectionRef(el, idx)"
          :section="section"
          :index="idx"
        />
      </div>
      <div ref="measureFooter" class="resume-footer">BUILT WITH MATERIAL DESIGN 3</div>
    </div>

    <!-- Visible paginated pages -->
    <template v-if="ready">
      <div
        v-for="(page, pi) in pages"
        :key="pi"
        class="a4-page"
        :class="{ 'first-page': pi === 0 }"
        :id="pi === 0 ? 'resume-page' : undefined"
      >
        <ResumeHeader v-if="pi === 0" :basics="data.basics" />
        <div class="resume-body">
          <ResumeSection
            v-for="(section, idx) in page"
            :key="section.id"
            :section="section"
            :index="data.sections.findIndex(s => s.id === section.id)"
          />
        </div>
        <div class="resume-footer">
          <span>BUILT WITH MATERIAL DESIGN 3</span>
          <span class="resume-page-number">第 {{ pi + 1 }} 页</span>
        </div>
      </div>
    </template>
  </div>
</template>
