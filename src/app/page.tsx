'use client'
import { AuthProvider } from '@/context/AuthProvider'
import LoginPage from './login/page'
import TanstackReactQueryProvider from '@/context/TanstackReactQueryProvider'

export default function Home() {
  return (
    <TanstackReactQueryProvider>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </TanstackReactQueryProvider>
  )
}
