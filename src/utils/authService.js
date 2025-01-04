// src/utils/authService.js
import { supabase } from './supabaseClient'
import { ref } from 'vue'

const user = ref(null)

const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error.message)
      throw new Error('Invalid credentials')
    }

    console.log('Login successful:', data.user)
    user.value = data.user
  } catch (err) {
    console.error('Error in login function:', err)
    throw err
  }
}

const logout = async () => {
  try {
    await supabase.auth.signOut()
    user.value = null
    console.log('Logout successful')
  } catch (err) {
    console.error('Error in logout function:', err)
  }
}

export { user, login, logout }
