'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Link = {
  id: string
  title: string
  url: string
  visible: boolean
}

export default function Dashboard() {
  const router = useRouter()
  const [links, setLinks] = useState<Link[]>([])
  const [newLink, setNewLink] = useState({ title: '', url: '' })
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/signup')
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    
    // Load user's links
    fetch(`/api/links?userId=${parsedUser.id}`)
      .then(res => res.json())
      .then(data => {
        setLinks(data.links.map((link: any) => ({
          id: link.id.toString(),
          title: link.title,
          url: link.url,
          visible: link.visible === 1
        })))
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load links:', err)
        setLoading(false)
      })
  }, [])

  const addLink = async () => {
    if (!newLink.title || !newLink.url || !user) return

    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          title: newLink.title,
          url: newLink.url
        })
      })

      const data = await res.json()
      if (res.ok) {
        setLinks([...links, {
          id: data.link.id.toString(),
          title: data.link.title,
          url: data.link.url,
          visible: data.link.visible === 1
        }])
        setNewLink({ title: '', url: '' })
      }
    } catch (err) {
      console.error('Failed to add link:', err)
    }
  }

  const deleteLink = async (id: string) => {
    try {
      const res = await fetch(`/api/links?id=${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setLinks(links.filter(link => link.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete link:', err)
    }
  }

  const toggleVisibility = (id: string) => {
    // TODO: Add API call to update visibility
    setLinks(links.map(link => 
      link.id === id ? { ...link, visible: !link.visible } : link
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🏜️</div>
          <div className="text-gray-600">Loading your dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">LinkHub</div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">@{user?.username}</span>
            <a 
              href={`/${user?.username}`} 
              target="_blank"
              className="text-gray-600 hover:text-gray-900"
            >
              Preview →
            </a>
            <button 
              onClick={() => {
                localStorage.removeItem('user')
                router.push('/')
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-gray-500 text-sm">Total Links</div>
            <div className="text-3xl font-bold">{links.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-gray-500 text-sm">Total Clicks</div>
            <div className="text-3xl font-bold">
              {links.reduce((sum, link: any) => sum + (link.clicks || 0), 0)}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-gray-500 text-sm">Active Links</div>
            <div className="text-3xl font-bold">
              {links.filter(link => link.visible).length}
            </div>
          </div>
        </div>

        {/* Add New Link */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Link</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                placeholder="My Awesome Link"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={addLink}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Add Link
            </button>
          </div>
        </div>

        {/* Existing Links */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Your Links</h2>
          <div className="space-y-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-semibold">{link.title}</div>
                  <div className="text-sm text-gray-500">{link.url}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleVisibility(link.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      link.visible 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {link.visible ? 'Visible' : 'Hidden'}
                  </button>
                  <button
                    onClick={() => deleteLink(link.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Link */}
        <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="font-semibold mb-2">Your LinkHub URL</h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={`linkhub.io/${user?.username}`}
              readOnly
              className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg"
            />
            <button 
              onClick={() => {
                navigator.clipboard.writeText(`linkhub.io/${user?.username}`)
                alert('Copied to clipboard!')
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
