'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import FormSubmit from "./FormSubmit"

export default function Login() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
                        {/* User Image */}
                        <img
                            src={session.user.image}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full mb-4"
                        />

                        {/* User Name */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">{session.user.name}</h2>
                        {session.user.email}

                        {/* Input and Button */}
                        <FormSubmit />
                        <br/>
                <button className="bg-red-400 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" onClick={() => signOut()}>Sign out</button>
                    </div>
                </div>
                {/* Signed in as {JSON.stringify(session.user)} <br /> */}
            </>
        )
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-xl font-semibold mb-4">Not Signed In</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={() => signIn('twitter')}>Twitter Sign in</button>

                {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={() => signIn()}>LinkedIn Sign in</button> */}
            </div>
        </div>
    )
}