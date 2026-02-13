import db from '@/lib/db'
import { notFound } from 'next/navigation'

type Link = {
  id: number
  title: string
  url: string
  visible: number
}

type User = {
  id: number
  username: string
  bio: string | null
  avatar_emoji: string
  theme: string
}

async function getUser(username: string) {
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined
  return user
}

async function getLinks(userId: number) {
  const links = db.prepare(
    'SELECT * FROM links WHERE user_id = ? AND visible = 1 ORDER BY position ASC, created_at DESC'
  ).all(userId) as Link[]
  return links
}

export default async function UserProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const user = await getUser(username)
  
  if (!user) {
    notFound()
  }

  const links = await getLinks(user.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Profile Card */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
            {user.avatar_emoji || '👤'}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">@{user.username}</h1>
          {user.bio && <p className="text-white/90">{user.bio}</p>}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                // Track click (async, don't await)
                fetch('/api/clicks', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ linkId: link.id })
                }).catch(() => {})
              }}
              className="block w-full bg-white/95 hover:bg-white text-center py-4 px-6 rounded-xl font-semibold text-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              {link.title}
            </a>
          ))}
        </div>

        {links.length === 0 && (
          <div className="text-center text-white/80 py-12">
            No links yet!
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <a 
            href="/" 
            className="text-white/70 hover:text-white text-sm"
          >
            Create your own LinkHub 🏜️
          </a>
        </div>
      </div>
    </div>
  )
}
