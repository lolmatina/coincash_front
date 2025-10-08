// Test API connectivity
export async function testApiConnection() {
  try {
    const response = await fetch('http://localhost:3000/api/binance/crypto-cards', {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:3001',
        'Referer': 'http://localhost:3001',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('API test successful:', data)
      return { success: true, data }
    } else {
      console.error('API test failed:', response.status, response.statusText)
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` }
    }
  } catch (error) {
    console.error('API test error:', error)
    return { success: false, error: error.message }
  }
}
