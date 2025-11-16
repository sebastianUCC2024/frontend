// Mock API responses for development without backend
// This will intercept fetch calls when backend is not available

export const mockAuthResponses: Record<string, any> = {
  '/auth/register': {
    success: true,
    data: {
      id: '1',
      email: 'user@example.com',
      username: 'user',
      name: 'User Name',
      role: 'FARMER',
      token: 'mock-token-' + Math.random().toString(36).substring(7),
    },
    message: 'Registration successful',
  },
  '/auth/login': {
    success: true,
    data: {
      id: '1',
      email: 'user@example.com',
      username: 'user',
      name: 'User Name',
      role: 'FARMER',
      token: 'mock-token-' + Math.random().toString(36).substring(7),
    },
    message: 'Login successful',
  },
}

export function isMockEndpoint(endpoint: string): boolean {
  return endpoint.startsWith('/auth/')
}

export async function getMockResponse(endpoint: string, method: string = 'GET'): Promise<Response> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const mockData = mockAuthResponses[endpoint]

  if (mockData) {
    return new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Return 404 for unknown endpoints
  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  })
}
