import { NextResponse } from 'next/server'
import db from '@/lib/db'

// GET all links for a user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const links = db.prepare(
      'SELECT * FROM links WHERE user_id = ? ORDER BY position ASC, created_at DESC'
    ).all(userId)

    return NextResponse.json({ links })
  } catch (error) {
    console.error('Get links error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create a new link
export async function POST(request: Request) {
  try {
    const { userId, title, url } = await request.json()

    if (!userId || !title || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = db.prepare(
      'INSERT INTO links (user_id, title, url) VALUES (?, ?, ?)'
    ).run(userId, title, url)

    const newLink = db.prepare('SELECT * FROM links WHERE id = ?')
      .get(result.lastInsertRowid)

    return NextResponse.json({ success: true, link: newLink })
  } catch (error) {
    console.error('Create link error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE a link
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const linkId = searchParams.get('id')

    if (!linkId) {
      return NextResponse.json({ error: 'Link ID required' }, { status: 400 })
    }

    db.prepare('DELETE FROM links WHERE id = ?').run(linkId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete link error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
