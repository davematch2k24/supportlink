<script setup>
import { supabase } from '@/utils/supabase'
import { onMounted, ref } from 'vue'

// Mock user data (replace this with real data if needed)
const user = ref({
  initials: '',
  fullName: '',
  email: '',
})

const formAction = ref({
  ...formActionDefault,
})

const onLogout = async () => {
  /// Reset Form Action utils; Turn on processing at the same time
  formAction.value = { ...formActionDefault, formProcess: true }

  // Get supabase logout functionality
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during logout:', error)
    return
  }

  formAction.value.formProcess = false
  // Redirect to homepage
  router.replace('/')
}

const getUser = async () => {
  const {
    data: {
      user: { user_metadata: metadata },
    },
  } = await supabase.auth.getUser()

  userData.value.email = metadata.email
  userData.value.fullName = metadata.firstname + ' ' + metadata.lastname
  userData.value.initials = getAvatar(userData.value.fullName)
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-menu min-width="200px" rounded offset-y>
        <!-- Activator -->
        <template #activator="{ props }">
          <v-btn v-bind="props" class="d-flex align-center" icon>
            <v-avatar color="brown" size="large">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <!-- Dropdown Menu -->
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <!-- Profile Avatar -->
              <v-avatar color="brown" size="large" class="mx-auto mb-3">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>

              <!-- User Info -->
              <h3 class="font-weight-medium">{{ user.fullName }}</h3>
              <p class="text-caption mt-1">{{ user.email }}</p>

              <!-- Actions -->
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded @click="alert('Account Settings Clicked!')">
                Account Settings
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded color="error" @click="onLogout"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-caption {
  color: gray;
}
</style>
