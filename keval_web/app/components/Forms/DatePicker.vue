<!-- ~/components/forms/DatePicker.vue -->
<template>
  <UFormGroup :label="label" :required="required" :error="error">
    <UPopover :popper="{ placement: 'bottom-start' }">
      <UButton
        type="button"
        variant="outline"
        color="gray"
        :class="['w-full justify-start text-left font-normal', !modelValue && 'text-gray-400']"
        :disabled="disabled"
      >
        <UIcon name="i-heroicons-calendar" class="w-5 h-5 mr-2 text-gray-400" />
        {{ displayDate }}
      </UButton>

      <template #panel="{ close }">
        <div class="p-4">
          <!-- Month/Year Navigation -->
          <div class="flex items-center justify-between mb-4">
            <UButton
              type="button"
              variant="ghost"
              size="xs"
              @click="previousMonth"
            >
              <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
            </UButton>
            
            <span class="font-semibold">
              {{ monthNames[currentMonth] }} {{ currentYear }}
            </span>
            
            <UButton
              type="button"
              variant="ghost"
              size="xs"
              @click="nextMonth"
            >
              <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
            </UButton>
          </div>

          <!-- Days of Week -->
          <div class="grid grid-cols-7 gap-1 mb-2">
            <div 
              v-for="day in dayNames" 
              :key="day" 
              class="text-center text-xs font-medium text-gray-500 py-1"
            >
              {{ day }}
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-1">
            <button
              v-for="(day, index) in calendarDays"
              :key="index"
              type="button"
              :disabled="!day.isCurrentMonth || day.isDisabled"
              @click="selectDate(day.date); close()"
              class="p-2 text-sm rounded-lg transition-colors"
              :class="{
                'text-gray-300': !day.isCurrentMonth,
                'text-gray-400 cursor-not-allowed': day.isDisabled,
                'hover:bg-gray-100': day.isCurrentMonth && !day.isDisabled && !day.isSelected,
                'bg-kevalgreen-500 text-white': day.isSelected,
                'ring-2 ring-kevalgreen-500': day.isToday && !day.isSelected
              }"
            >
              {{ day.dayNumber }}
            </button>
          </div>

          <!-- Quick Actions -->
          <div class="flex gap-2 mt-4 pt-4 border-t">
            <UButton
              type="button"
              variant="ghost"
              size="xs"
              @click="selectToday(); close()"
            >
              Today
            </UButton>
            <UButton
              v-if="modelValue"
              type="button"
              variant="ghost"
              size="xs"
              color="red"
              @click="clearDate(); close()"
            >
              Clear
            </UButton>
          </div>
        </div>
      </template>
    </UPopover>
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string | Date | null
  label?: string
  required?: boolean
  error?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  placeholder?: string
}>(), {
  placeholder: 'Select date'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const displayDate = computed(() => {
  if (!props.modelValue) return props.placeholder
  const date = new Date(props.modelValue)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const startPadding = firstDay.getDay()
  
  // Previous month days
  const prevLastDay = new Date(currentYear.value, currentMonth.value, 0)
  for (let i = startPadding - 1; i >= 0; i--) {
    days.push({
      date: new Date(currentYear.value, currentMonth.value - 1, prevLastDay.getDate() - i),
      dayNumber: prevLastDay.getDate() - i,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: true
    })
  }
  
  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    const isToday = date.toDateString() === today.toDateString()
    const isSelected = props.modelValue 
      ? date.toDateString() === new Date(props.modelValue).toDateString()
      : false
    
    let isDisabled = false
    if (props.minDate && date < props.minDate) isDisabled = true
    if (props.maxDate && date > props.maxDate) isDisabled = true
    
    days.push({
      date,
      dayNumber: i,
      isCurrentMonth: true,
      isToday,
      isSelected,
      isDisabled
    })
  }
  
  // Next month days (to fill the grid)
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(currentYear.value, currentMonth.value + 1, i),
      dayNumber: i,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: true
    })
  }
  
  return days
})

function previousMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function selectDate(date: Date) {
  emit('update:modelValue', date.toISOString().split('T')[0])
}

function selectToday() {
  emit('update:modelValue', today.toISOString().split('T')[0])
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
}

function clearDate() {
  emit('update:modelValue', null)
}
</script>