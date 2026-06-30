<script setup lang="ts">
/**
 * IconPicker — visual Material Symbol icon selector.
 * Emits the selected icon ligature name on click.
 */
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isOpen = ref(false)

/**
 * Curated set of commonly-used Material Symbol icons for resume sections.
 * Grouped by category for easier browsing.
 */
const iconGroups = [
  {
    label: '技术',
    icons: ['terminal', 'code', 'code_blocks', 'data_object', 'bug_report', 'build', 'memory', 'hub', 'api', 'integration_instructions'],
  },
  {
    label: '数据',
    icons: ['database', 'storage', 'table_chart', 'query_stats', 'analytics', 'bar_chart', 'pie_chart', 'dataset', 'schema', 'dns'],
  },
  {
    label: '云服务',
    icons: ['cloud', 'cloud_sync', 'cloud_upload', 'dns', 'server_person', 'deployed_code', 'kubernetes', 'container', 'lan', 'network_intelligence'],
  },
  {
    label: '工具',
    icons: ['settings', 'tune', 'construction', 'hardware', 'precision_manufacturing', 'engineering', 'architecture', 'science', 'biotech', 'rocket_launch'],
  },
  {
    label: '通用',
    icons: ['star', 'bolt', 'diamond', 'shield', 'workspace_premium', 'verified', 'flag', 'target', 'emoji_events', 'military_tech'],
  },
  {
    label: '协作',
    icons: ['groups', 'handshake', 'diversity_3', 'support', 'forum', 'campaign', 'volunteer_activism', 'partner_exchange', 'eco', 'psychology'],
  },
]

function selectIcon(name: string) {
  emit('update:modelValue', name)
  isOpen.value = false
}
</script>

<template>
  <div class="icon-picker">
    <button class="icon-picker-trigger" :class="{ active: isOpen }" @click="isOpen = !isOpen">
      <span class="material-symbols-outlined">{{ modelValue || 'question_mark' }}</span>
      <span class="icon-picker-trigger-label">{{ modelValue || '选择图标' }}</span>
      <span class="material-symbols-outlined icon-picker-arrow">{{ isOpen ? 'expand_less' : 'expand_more' }}</span>
    </button>

    <div v-if="isOpen" class="icon-picker-dropdown">
      <div v-for="group in iconGroups" :key="group.label" class="icon-picker-group">
        <span class="icon-picker-group-label">{{ group.label }}</span>
        <div class="icon-picker-grid">
          <button
            v-for="icon in group.icons"
            :key="icon"
            class="icon-picker-option"
            :class="{ selected: modelValue === icon }"
            :title="icon"
            @click="selectIcon(icon)"
          >
            <span class="material-symbols-outlined">{{ icon }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
