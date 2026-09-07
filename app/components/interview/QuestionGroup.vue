<script setup lang="ts">
import type { SidebarGroup } from '~/types/interview'

const props = defineProps<{
  group: SidebarGroup
  /** Раскрыта ли группа изначально (когда активный вопрос внутри неё). */
  defaultOpen?: boolean
}>()

// Локальное состояние сворачивания/разворачивания категории.
// Синхронизируем с defaultOpen при переходе между вопросами.
const isOpen = ref(props.defaultOpen ?? false)
watch(
  () => props.defaultOpen,
  value => {
    if (value) isOpen.value = true
  }
)
</script>

<template>
  <div>
    <button
      type="button"
      class="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm font-semibold text-highlighted hover:bg-elevated/50"
      @click="isOpen = !isOpen"
    >
      <span class="flex items-center gap-2">
        <UIcon v-if="group.icon" :name="group.icon" class="size-4 shrink-0" />
        {{ group.title }}
      </span>
      <UIcon
        name="i-lucide-chevron-right"
        class="size-4 shrink-0 transition-transform"
        :class="isOpen && 'rotate-90'"
      />
    </button>

    <div v-show="isOpen" class="mt-1 ml-2 flex flex-col gap-0.5 border-l border-default pl-2">
      <InterviewQuestionItem v-for="item in group.items" :key="item.path" :item="item" />
    </div>
  </div>
</template>
