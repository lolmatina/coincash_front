"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { apiClient } from "@/lib/api"
import { testApiConnection } from "@/lib/api-test"

export function ApiTestPage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runTests = async () => {
    setIsLoading(true)
    setTestResults(null)

    try {
      // Test 1: Direct fetch test
      const directTest = await testApiConnection()
      
      // Test 2: API client test
      let clientTest = null
      try {
        const cryptoCards = await apiClient.getCryptoCards()
        clientTest = { success: true, data: cryptoCards }
      } catch (error: any) {
        clientTest = { success: false, error: error.message }
      }

      // Test 3: Trading pairs test
      let tradingPairsTest = null
      try {
        const pairs = await apiClient.getPopularPairs()
        tradingPairsTest = { success: true, data: pairs }
      } catch (error: any) {
        tradingPairsTest = { success: false, error: error.message }
      }

      setTestResults({
        directTest,
        clientTest,
        tradingPairsTest,
        timestamp: new Date().toISOString()
      })
    } catch (error: any) {
      setTestResults({
        error: error.message,
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
        
        <Button 
          onClick={runTests} 
          disabled={isLoading}
          className="mb-6"
        >
          {isLoading ? "Testing..." : "Run API Tests"}
        </Button>

        {testResults && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Test Results</h2>
            
            <div className="grid gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Direct Fetch Test</h3>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(testResults.directTest, null, 2)}
                </pre>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">API Client - Crypto Cards</h3>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(testResults.clientTest, null, 2)}
                </pre>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">API Client - Trading Pairs</h3>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(testResults.tradingPairsTest, null, 2)}
                </pre>
              </Card>
            </div>

            <p className="text-sm text-gray-500">
              Test run at: {testResults.timestamp}
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
