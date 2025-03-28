'use client'
import { useSession, signIn, signOut } from "next-auth/react"

const LoginButton = () => {
  const { data: session } = useSession()
    if(session) return <button className="bg-red-400 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" onClick={() => signOut()}>Sign out</button>
     return <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={() => signIn('twitter')}>Sign in</button>
}

export default LoginButton