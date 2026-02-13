'use client'

export default function Preview() {
  const links = [
    { id: '1', title: 'My Website', url: 'https://example.com', visible: true },
    { id: '2', title: 'YouTube Channel', url: 'https://youtube.com/@example', visible: true },
    { id: '3', title: 'Shop', url: 'https://shop.example.com', visible: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Profile Card */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
            👤
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Name</h1>
          <p className="text-white/90">Your bio goes here ✨</p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.filter(link => link.visible).map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white/95 hover:bg-white text-center py-4 px-6 rounded-xl font-semibold text-gray-800 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <a 
            href="/" 
            className="text-white/70 hover:text-white text-sm"
          >
            Made with LinkHub 🏜️
          </a>
        </div>
      </div>
    </div>
  )
}
