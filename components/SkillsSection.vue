<script setup lang="ts">
import type { SkillGroup } from '~/data/resume'

const props = defineProps<{
  title: string
  groups: SkillGroup[]
  view: 'list' | 'cards'
  cardColumns: number
  index: number
  hiddenFields: string[]
}>()

const {
  updateSectionTitle,
  updateSkillGroup,
  updateSkill,
  updateSkillYears,
  cycleSkillProficiency,
} = useResume()

const proficiencyLabel: Record<string, string> = {
  expert: '精通',
  mastered: '掌握',
  proficient: '熟练',
  familiar: '熟悉',
  aware: '了解',
}

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

    <div class="skill-section" :data-view="view">
      <!-- List View -->
      <div class="skill-list">
        <div v-for="(group, gi) in groups" :key="group.category + gi" class="skill-list-group">
          <div class="skill-list-group-header">
            <EditableText :modelValue="group.category" @update:modelValue="updateSkillGroup(index, gi, 'category', $event)" />
          </div>
          <div v-for="(skill, si) in group.skills" :key="skill.name + si" class="skill-list-item">
            <div class="skill-info">
              <div class="skill-headline">
                <span class="skill-name">
                  <EditableText :modelValue="skill.name" @update:modelValue="updateSkill(index, gi, si, 'name', $event)" />
                </span>
                <span
                  v-if="!isHidden('proficiency')"
                  class="skill-proficiency"
                  :class="`skill-proficiency--${skill.proficiency}`"
                  title="点击切换熟练度"
                  style="cursor: pointer;"
                  @click="cycleSkillProficiency(index, gi, si)"
                >
                  {{ proficiencyLabel[skill.proficiency] }}
                </span>
              </div>
              <div v-if="!isHidden('years') || !isHidden('description')" class="skill-supporting">
                <template v-if="!isHidden('years')">
                  <EditableText :modelValue="String(skill.years)" @update:modelValue="updateSkillYears(index, gi, si, $event)" /> 年<template v-if="!isHidden('description')"> · </template>
                </template>
                <EditableText v-if="!isHidden('description')" :modelValue="skill.description" @update:modelValue="updateSkill(index, gi, si, 'description', $event)" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card View -->
      <div class="skill-cards" :style="{ gridTemplateColumns: `repeat(${cardColumns || 2}, 1fr)` }">
        <div v-for="(group, gi) in groups" :key="group.category + gi" class="skill-card">
          <div class="skill-card-header">
            <div class="skill-card-icon">
              <span class="material-symbols-outlined">{{ group.icon }}</span>
            </div>
            <span class="skill-card-title">
              <EditableText :modelValue="group.category" @update:modelValue="updateSkillGroup(index, gi, 'category', $event)" />
            </span>
          </div>
          <p v-if="!isHidden('description') && group.description" class="skill-card-desc">
            <EditableText :modelValue="group.description" block @update:modelValue="updateSkillGroup(index, gi, 'description', $event)" />
          </p>
          <div class="skill-card-items">
            <div v-for="(skill, si) in group.skills" :key="skill.name + si" class="skill-card-row">
              <span class="skill-name">
                <EditableText :modelValue="skill.name" @update:modelValue="updateSkill(index, gi, si, 'name', $event)" />
              </span>
              <span
                v-if="!isHidden('proficiency')"
                class="skill-proficiency"
                :class="`skill-proficiency--${skill.proficiency}`"
                title="点击切换熟练度"
                style="cursor: pointer;"
                @click="cycleSkillProficiency(index, gi, si)"
              >
                {{ proficiencyLabel[skill.proficiency] }}
              </span>
              <span v-if="!isHidden('description') && skill.description" class="skill-supporting">
                <EditableText :modelValue="skill.description" @update:modelValue="updateSkill(index, gi, si, 'description', $event)" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
