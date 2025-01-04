<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabaseClient' // Ensure this path is correct
import { VList, VListItem, VListItemTitle, VListItemSubtitle } from 'vuetify/components'

const notifications = ref([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  const { data, error } = await supabase.from('notifications').select('*')
  loading.value = false

  if (error) {
    console.error('Error fetching notifications:', error)
    alert('Failed to fetch notifications. Please try again.')
    return
  }

  notifications.value = data
})
</script>

<template>
  <v-list>
    <v-list-item v-for="notification in notifications" :key="notification.id">
      <v-list-item>
        <v-list-item-title>{{ notification.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ notification.content }}</v-list-item-subtitle>
      </v-list-item>
    </v-list-item>
  </v-list>
  <v-progress-linear v-if="loading" indeterminate color="orange"></v-progress-linear>
</template>

<style scoped>
.v-list-item {
  margin-bottom: 1em;
}
</style>
