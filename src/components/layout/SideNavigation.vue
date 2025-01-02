<script setup>
import { supabase } from '@/utils/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigation items
const navigationItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/dashboard' },
  { title: 'Profile', icon: 'mdi-account', route: '/profile' },
  { title: 'Settings', icon: 'mdi-cog', route: '/settings' },
]

// State for the drawer
const drawer = ref(true)

// State for theme
const theme = ref(localStorage.getItem('theme') ?? 'light')

// Logout function
const logout = async () => {
  // Sign out from Supabase
  const { error } = await supabase.auth.signOut()

  if (error) {
    alert('Error logging out: ' + error.message)
  } else {
    alert('Logging out...')
    router.push('/') // Navigate to login screen
  }
}
// const logout = () => {
//   alert('Logging out...')
//   router.push('/')
// }
</script>

<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer
    app
    permanent
    :model-value="drawer"
    :color="theme === 'light' ? 'grey-lighten-5' : 'grey-darken-4'"
    width="250"
  >
    <!-- Navigation List -->
    <v-list>
      <!-- Dynamic Navigation Items -->
      <v-list-item v-for="item in navigationItems" :key="item.title" link :to="item.route">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

      <!-- Divider -->
      <v-divider></v-divider>

      <!-- Logout Item -->
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
