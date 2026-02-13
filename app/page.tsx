export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">LinkHub</div>
          <div className="space-x-4">
            <button className="text-gray-600 hover:text-gray-900">Sign In</button>
            <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Stop paying $5/mo for a{' '}
              <span className="text-blue-600">simple link page</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              LinkHub gives you everything Linktree does, but free forever.
              Premium features? Just $4/mo. No tricks, no upsells.
            </p>
            <a href="/signup" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
              Create Your Free Page
            </a>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required. Free forever.
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-4">Join thousands switching from overpriced alternatives</p>
            <div className="flex justify-center space-x-8 text-gray-400">
              <div>✓ No signup fee</div>
              <div>✓ Unlimited clicks</div>
              <div>✓ Analytics included</div>
            </div>
          </div>

          {/* Feature Comparison */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why pay more for the same thing?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Linktree */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-gray-400 mb-2">Linktree</div>
                <div className="text-3xl font-bold mb-4">$5-24/mo</div>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Custom links</li>
                  <li>✓ Basic analytics</li>
                  <li>✗ Limited themes</li>
                  <li>✗ Email support</li>
                </ul>
              </div>

              {/* LinkHub Free */}
              <div className="border-2 border-blue-600 rounded-lg p-6 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Most Popular
                </div>
                <div className="text-gray-600 mb-2">LinkHub Free</div>
                <div className="text-3xl font-bold mb-4">$0/mo</div>
                <ul className="space-y-2 text-gray-900">
                  <li>✓ Custom links (5)</li>
                  <li>✓ Basic analytics</li>
                  <li>✓ 10+ themes</li>
                  <li>✓ 24/7 support</li>
                </ul>
                <a href="/signup" className="block w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-center">
                  Start Free
                </a>
              </div>

              {/* LinkHub Premium */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-gray-600 mb-2">LinkHub Premium</div>
                <div className="text-3xl font-bold mb-4">$4/mo</div>
                <ul className="space-y-2 text-gray-900">
                  <li>✓ Unlimited links</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ Custom domain</li>
                  <li>✓ Priority support</li>
                </ul>
                <button className="w-full mt-6 border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50">
                  Upgrade Later
                </button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center bg-blue-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to save money?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Create your free LinkHub page in under 2 minutes
            </p>
            <a href="/signup" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
              Get Started Free →
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
          <p>© 2026 LinkHub. Built with ❤️ by Super Dune</p>
        </div>
      </footer>
    </div>
  )
}
