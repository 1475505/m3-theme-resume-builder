<script setup lang="ts">
import type { ResumeData } from '~/data/resume'

defineProps<{
  basics: ResumeData['basics']
}>()

const { updateBasics, updateContact } = useResume()
</script>

<template>
  <header class="resume-header">
    <div class="header-top">
      <h1 class="header-name">
        <EditableText :modelValue="basics.name" @update:modelValue="updateBasics('name', $event)" />
      </h1>
      <span v-if="basics.title" class="header-title">
        <EditableText :modelValue="basics.title" @update:modelValue="updateBasics('title', $event)" />
      </span>
    </div>
    <div class="header-contact">
      <template v-for="(contact, i) in basics.contacts" :key="contact.icon + i">
        <a v-if="contact.href" class="contact-item" :href="contact.href">
          <BrandIcon :name="contact.icon" />
          <EditableText :modelValue="contact.text" @update:modelValue="updateContact(i, $event)" />
        </a>
        <span v-else class="contact-item">
          <BrandIcon :name="contact.icon" />
          <EditableText :modelValue="contact.text" @update:modelValue="updateContact(i, $event)" />
        </span>
      </template>
    </div>
  </header>
</template>
