'use client'

import { SignInButton, SignOutButton, useAuth, useSession } from '@clerk/nextjs'
import { useMutation, useQueries, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export default function Home() {
  const { isSignedIn } = useSession() // useAuth() wird auf dem Client verwendet
  const createPoster = useMutation(api.poster.createPoster)
  const poster = useQuery(api.poster.getPoster)
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      {isSignedIn ? <SignOutButton /> : <SignInButton />}
      {isSignedIn && (
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            if (!form) return
            const formData = new FormData(e.currentTarget)
            const title = formData.get('title') as string
            await createPoster({
              title,
            })
            form.reset()
          }}
        >
          <label htmlFor='title'>
            <input type='text' className='' name='title' />
            <button>Create</button>
          </label>
        </form>
      )}
      {poster &&
        poster?.map((p) => {
          return <div key={p._id}>{p.title}</div>
        })}
    </div>
  )
}
