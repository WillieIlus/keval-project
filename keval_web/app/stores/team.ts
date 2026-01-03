import { defineStore } from 'pinia'
import type { TeamMember } from '~/types/api'

export const useTeamStore = defineStore('team', () => {
  const { $api } = useNuxtApp()

  const members = ref<TeamMember[]>([])
  const loading = ref(false)

  // Getter to group by department if needed
  const membersByDepartment = computed(() => {
    return members.value.reduce((acc, member) => {
      const dept = member.department
      if (!acc[dept]) acc[dept] = []
      acc[dept].push(member)
      return acc
    }, {} as Record<string, TeamMember[]>)
  })

  async function fetchTeam() {
    loading.value = true
    try {
      // Adjusted path to match your /api/ prefix logic
      members.value = await $api<TeamMember[]>('/api/team/') 
    } catch (e) {
      console.error('Failed to fetch team', e)
    } finally {
      loading.value = false
    }
  }

  return { members, loading, membersByDepartment, fetchTeam }
})