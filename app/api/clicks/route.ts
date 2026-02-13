import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { linkId } = await request.json()

    if (!linkId) {
      return NextResponse.json({ error: 'Link ID required' }, { status: 400 })
    }

    // Record click
    db.prepare('INSERT INTO clicks (link_id) VALUES (?)').run(linkId)

    // Update link clicks count
    db.prepare('UPDATE links SET clicks = clicks + 1 WHERE id = ?').run(linkId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Click tracking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
