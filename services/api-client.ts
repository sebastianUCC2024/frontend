interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: number
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = '/api/proxy'
  }

  async get<T>(
    endpoint: string,
    token?: string
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}?target=${encodeURIComponent(endpoint)}`, {
        method: 'GET',
        headers: this.getHeaders(token),
      })
      return this.handleResponse(response)
    } catch (error) {
      console.error('[v0] API GET Error:', error)
      return this.handleError(error)
    }
  }

  async post<T>(
    endpoint: string,
    body: any,
    token?: string
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}?target=${encodeURIComponent(endpoint)}`, {
        method: 'POST',
        headers: this.getHeaders(token),
        body: JSON.stringify(body),
      })
      return this.handleResponse(response)
    } catch (error) {
      console.error('[v0] API POST Error:', error)
      return this.handleError(error)
    }
  }

  async put<T>(
    endpoint: string,
    body: any,
    token?: string
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}?target=${encodeURIComponent(endpoint)}`, {
        method: 'PUT',
        headers: this.getHeaders(token),
        body: JSON.stringify(body),
      })
      return this.handleResponse(response)
    } catch (error) {
      console.error('[v0] API PUT Error:', error)
      return this.handleError(error)
    }
  }

  async delete<T>(
    endpoint: string,
    token?: string
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}?target=${encodeURIComponent(endpoint)}`, {
        method: 'DELETE',
        headers: this.getHeaders(token),
      })
      return this.handleResponse(response)
    } catch (error) {
      console.error('[v0] API DELETE Error:', error)
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
      let errorMessage = `HTTP ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch {
        const text = await response.text()
        if (text) errorMessage = text
      }
      return {
        data: null,
        error: errorMessage,
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
