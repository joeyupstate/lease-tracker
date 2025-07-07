'use client'
import { useEffect, useState } from 'react'
import { supabase } from "../../lib/supabaseClient"
import { useRouter } from 'next/navigation'

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
        setLoading(false)
      }
    }
    getUser()
  }, [router])

  if (loading) return <p>Loading...</p>

  return <>{children}</>
}
