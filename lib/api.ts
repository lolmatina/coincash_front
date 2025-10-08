import { config } from './config'

const API_BASE_URL = config.apiUrl

export interface User {
  id: number
  name: string
  lastname: string
  email: string
  profile_type: 'personal' | 'company'
  email_verified_at: string | null
  documents_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  message: string
  user: User
  token: string
}

export interface SignupData {
  name: string
  lastname: string
  email: string
  password: string
  profile_type: 'personal' | 'company'
}

export interface LoginData {
  email: string
  password: string
}

export interface TradingPair {
  symbol: string
  price: string
  priceChange: string
  priceChangePercent: string
  weightedAvgPrice: string
  prevClosePrice: string
  lastPrice: string
  lastQty: string
  bidPrice: string
  askPrice: string
  openPrice: string
  highPrice: string
  lowPrice: string
  volume: string
  quoteVolume: string
  openTime: number
  closeTime: number
  firstId: number
  lastId: number
  count: number
}

export interface CryptoCard {
  symbol: string
  name: string
  price: string
  change: string
  changePercent: string
  trend: 'up' | 'down'
}

export interface ExchangeData {
  tradingPairs: Array<{
    symbol: string
    price: string
    change24h: string
    changePercent24h: string
    trend: 'up' | 'down'
  }>
  timestamp: number
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Add frontend-only headers for Binance endpoints
    if (endpoint.includes('/api/binance')) {
      defaultHeaders['Origin'] = 'http://localhost:3001'
      defaultHeaders['Referer'] = 'http://localhost:3001'
      defaultHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      console.log('Making API request to:', url)
      console.log('Request config:', config)
      
      const response = await fetch(url, config)
      
      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
          console.error('Error response data:', errorData)
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError)
          const textResponse = await response.text()
          console.error('Raw error response:', textResponse)
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log('Response data:', data)
      return data
    } catch (error) {
      console.error('API request failed:', error)
      console.error('Request URL:', url)
      console.error('Request config:', config)
      
      // Provide more specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to the server. Please check if the backend is running.')
      }
      
      throw error
    }
  }

  // Auth endpoints
  async signup(data: SignupData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/v1/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async login(data: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/v1/auth', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getCurrentUser(token: string): Promise<{ user: User }> {
    return this.request<{ user: User }>('/api/v1/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
  }

  // Binance endpoints
  async getCryptoCards(): Promise<{ cards: CryptoCard[]; timestamp: number }> {
    return this.request<{ cards: CryptoCard[]; timestamp: number }>('/api/binance/crypto-cards')
  }

  async getTradingPairs(): Promise<TradingPair[]> {
    return this.request<TradingPair[]>('/api/binance/trading-pairs')
  }

  async getPopularPairs(): Promise<TradingPair[]> {
    return this.request<TradingPair[]>('/api/binance/popular-pairs')
  }

  async getExchangeData(): Promise<ExchangeData> {
    return this.request<ExchangeData>('/api/binance/exchange-data')
  }

  async getTradingPair(symbol: string): Promise<TradingPair> {
    return this.request<TradingPair>(`/api/binance/trading-pair/${symbol}`)
  }

  async getCurrentPrice(symbol: string): Promise<{ symbol: string; price: string; time: number }> {
    return this.request<{ symbol: string; price: string; time: number }>(`/api/binance/price/${symbol}`)
  }

  async getKlineData(symbol: string, interval = '1h', limit = '24'): Promise<any[]> {
    return this.request<any[]>(`/api/binance/kline/${symbol}?interval=${interval}&limit=${limit}`)
  }

  // Profile verification endpoints
  async verifyEmail(email: string, code: string): Promise<{ message: string }> {
    return this.request('/api/v1/auth/email/verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    })
  }

  async resendVerificationCode(email: string): Promise<{ message: string }> {
    return this.request('/api/v1/auth/email/send', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async uploadDocuments(email: string, files: { front: File, back: File, selfie: File }): Promise<{ message: string }> {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('files', files.front)
    formData.append('files', files.back)
    formData.append('files', files.selfie)

    // Create a custom request for file upload without Content-Type header
    const url = `${this.baseURL}/api/v1/auth/documents`
    
    try {
      console.log('Uploading documents to:', url)
      console.log('Files:', { front: files.front.name, back: files.back.name, selfie: files.selfie.name })
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary
      })
      
      console.log('Upload response status:', response.status)
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
          console.error('Upload error response:', errorData)
        } catch (parseError) {
          console.error('Failed to parse upload error response:', parseError)
          const textResponse = await response.text()
          console.error('Raw upload error response:', textResponse)
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log('Upload success:', data)
      return data
    } catch (error) {
      console.error('Document upload failed:', error)
      throw error
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
