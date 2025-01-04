import { supabase } from './supabaseClient'
import { ref } from 'vue'

const user = ref(null)

export async function refreshToken() {
  const { error } = await supabase.auth.refreshSession()
  if (error) throw error
}

export async function getCurrentUser() {
  const user = supabase.auth.user()
  if (!user) {
    await refreshToken()
    return supabase.auth.user()
  }
  return user
}

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

    user.value = data.user

    // Store authentication token
    localStorage.setItem('supabase.auth.token', data.session.access_token)
  } catch (err) {
    console.error('Error in login function:', err.message)
    throw err
  }
}

const logout = async () => {
  try {
    await supabase.auth.signOut()
    user.value = null

    // Clear authentication token
    localStorage.removeItem('supabase.auth.token')
  } catch (err) {
    console.error('Error in logout function:', err.message)
  }
}

const fetchUser = async () => {
  const authToken = localStorage.getItem('supabase.auth.token')
  if (authToken) {
    try {
      const { data, error } = await supabase.auth.getUser(authToken)
      if (error) {
        console.error('Error fetching user:', error)
        throw error
      }
      user.value = data.user
    } catch (err) {
      console.error('Error in fetchUser function:', err.message)
    }
  }
}

// Define and export logActivity function
const logActivity = async (message) => {
  try {
    const { error } = await supabase.from('activity_logs').insert({ message })
    if (error) {
      console.error('Error logging activity:', error)
      throw error
    }
  } catch (err) {
    console.error('Error in logActivity function:', err.message)
    throw err
  }
}

export { user, login, logout, fetchUser, logActivity }
