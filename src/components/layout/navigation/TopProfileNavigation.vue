<script setup>
import { supabase, formActionDefault } from '@/utils/supabase'
import { getAvatarText } from '@/utils/helpers'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'

// Utilize pre-defined vue functions
const router = useRouter()

// Use Pinia Store
const authStore = useAuthUserStore()

// Load Variables
const formAction = ref({
  ...formActionDefault,
})

// Logout Functionality
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
  // Reset State
  setTimeout(() => {
    authStore.$reset()
  }, 2500)
  // Redirect to homepage
  router.replace('/')
}
</script>

<template>
  <v-menu min-width="200px" rounded>
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar
          v-if="authStore.userData.image_url"
          :image="authStore.userData.image_url"
          color="indigo darken-3"
          size="large"
          class="avatar-btn"
        >
        </v-avatar>

        <v-avatar class="avatar-btn" v-else color="indigo darken-3" size="large">
          <span class="text-h5">
            {{ getAvatarText(authStore.userData.firstname + ' ' + authStore.userData.lastname) }}
          </span>
        </v-avatar>
      </v-btn>
    </template>

    <v-card class="mt-1">
      <v-card-text>
        <v-list>
          <v-list-item
            :subtitle="authStore.userData.email"
            :title="authStore.userData.firstname + ' ' + authStore.userData.lastname"
          >
            <template #prepend>
              <v-avatar
                v-if="authStore.userData.image_url"
                :image="authStore.userData.image_url"
                color="indigo darken-3"
                size="large"
                class="avatar-btn"
              >
              </v-avatar>

              <v-avatar v-else color="indigo darken-3" size="large">
                <span class="text-h5">
                  {{
                    getAvatarText(authStore.userData.firstname + ' ' + authStore.userData.lastname)
                  }}
                </span>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>

        <v-divider class="my-3"></v-divider>

        <v-btn prepend-icon="mdi-wrench" variant="plain" to=""> Account Settings </v-btn>

        <v-divider class="my-3"></v-divider>

        <v-btn
          prepend-icon="mdi-logout"
          variant="plain"
          @click="onLogout"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
          class="menu-button logout-btn gradient-btn"
        >
          Logout
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<style scoped>
/* Avatar Button Styling */
.avatar-btn {
  transition: transform 0.3s ease;
}
.avatar-btn:hover {
  transform: scale(1.1);
}

.v-card {
  background-color: #f5f5f5;
  border-radius: 8px;
}

.v-card-text {
  padding: 15px;
}

/* Avatar Text */
.v-avatar {
  font-weight: bold;
}

/* Button Styling */
.menu-button {
  width: 100%;
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 10px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.menu-button:hover {
  background-color: #4caf50;
  color: white;
}

.logout-btn {
  border-radius: 20px;
  font-weight: bold;
}

.logout-btn:hover {
  background-color: #ca5454;
}

.gradient-btn {
  background: linear-gradient(90deg, #ffd700, #ff69b4, #1e88e5); /* Yellow, Pink, Blue */
  color: white; /* Ensures text/icon is visible */
}

.gradient-btn:hover {
  filter: brightness(1.2); /* Brighten on hover */
}

.gradient-btn.v-btn {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* Elevation effect */
}
</style>
