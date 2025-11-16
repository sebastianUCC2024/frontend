// Centralized API client with proper error handling
import { getMockResponse, isMockEndpoint } from '@/lib/mock-api'

interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: number
}

export class ApiClient {
  private baseUrl: string
  private useMock: boolean = false

  constructor(baseUrl?: string) {
    if (baseUrl) {
      this.baseUrl = baseUrl
    } else {
      this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
    }
  }

  async get<T>(
    endpoint: string,
    token?: string
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(token),
      })
      return this.handleResponse(response)
    } catch (error) {
      // If backend is down and it's a mock endpoint, use mock response
      if (isMockEndpoint(endpoint)) {
        const mockResponse = await getMockResponse(endpoint, 'GET')
        return this.handleResponse(mockResponse)
      }
      return this.handleError(error)
    }
  }

  async post<T>(
    endpoint: string,
    body: any,
    token?: string
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(token),
        body: JSON.stringify(body),
      })
      return this.handleResponse(response)
    } catch (error) {
      // If backend is down and it's a mock endpoint, use mock response
      if (isMockEndpoint(endpoint)) {
        const mockResponse = await getMockResponse(endpoint, 'POST')
        return this.handleResponse(mockResponse)
      }
      return this.handleError(error)
    }
  }

  async put<T>(
    endpoint: string,
    body: any,
    token?: string
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(token),
        body: JSON.stringify(body),
      })
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }

  async delete<T>(
    endpoint: string,
    token?: string
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(token),
      })
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }

  private getHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      return {
        data: null,
        error: `HTTP ${response.status}`,
        status: response.status,
      }
    }
    const data = await response.json()
    return { data, error: null, status: response.status }
  }

  private handleError(error: any): ApiResponse<any> {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 0,
    }
  }
}

export const apiClient = new ApiClient()
