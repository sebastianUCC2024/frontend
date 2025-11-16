import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get('target')
  const token = request.headers.get('Authorization')

  if (!target) {
    return NextResponse.json(
      { message: 'Target endpoint required' },
      { status: 400 }
    )
  }

  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    if (token) {
      headers['Authorization'] = token
    }

    const response = await fetch(`${backendUrl}${target}`, {
      method: 'GET',
      headers,
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('[v0] Proxy error:', error)
    return NextResponse.json(
      { message: 'Proxy error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const target = request.nextUrl.searchParams.get('target')
  const token = request.headers.get('Authorization')

  if (!target) {
    return NextResponse.json(
      { message: 'Target endpoint required' },
      { status: 400 }
    )
  }

  try {
    const body = await request.json()
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    if (token) {
      headers['Authorization'] = token
    }

    const response = await fetch(`${backendUrl}${target}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('[v0] Proxy error:', error)
    return NextResponse.json(
      { message: 'Proxy error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  const target = request.nextUrl.searchParams.get('target')
  const token = request.headers.get('Authorization')

  if (!target) {
    return NextResponse.json(
      { message: 'Target endpoint required' },
      { status: 400 }
    )
  }

  try {
    const body = await request.json()
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    if (token) {
      headers['Authorization'] = token
    }

    const response = await fetch(`${backendUrl}${target}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('[v0] Proxy error:', error)
    return NextResponse.json(
      { message: 'Proxy error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const target = request.nextUrl.searchParams.get('target')
  const token = request.headers.get('Authorization')

  if (!target) {
    return NextResponse.json(
      { message: 'Target endpoint required' },
      { status: 400 }
    )
  }

  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    if (token) {
      headers['Authorization'] = token
    }

    const response = await fetch(`${backendUrl}${target}`, {
      method: 'DELETE',
      headers,
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('[v0] Proxy error:', error)
    return NextResponse.json(
      { message: 'Proxy error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
