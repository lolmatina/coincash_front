"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { apiClient, CryptoCard } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export function CryptoCards() {
  const [cryptoData, setCryptoData] = useState<CryptoCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setIsLoading(true)
        const response = await apiClient.getCryptoCards()
        setCryptoData(response.cards)
      } catch (err: any) {
        console.error('Error fetching crypto cards:', err)
        
        // Fallback to mock data if API fails
        const mockData: CryptoCard[] = [
          {
            symbol: "BTC",
            name: "Bitcoin",
            price: "121432.43",
            change: "-2839.59",
            changePercent: "-2.29",
            trend: "down"
          },
          {
            symbol: "ETH", 
            name: "Ethereum",
            price: "4441.28",
            change: "-245.08",
            changePercent: "-5.23",
            trend: "down"
          },
          {
            symbol: "LTC",
            name: "Litecoin", 
            price: "78.45",
            change: "2.15",
            changePercent: "2.82",
            trend: "up"
          },
          {
            symbol: "DOGE",
            name: "Dogecoin",
            price: "0.1234",
            change: "0.0023",
            changePercent: "1.90",
            trend: "up"
          }
        ]
        
        setCryptoData(mockData)
        setError(`API Error: ${err.message}. Showing sample data.`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCryptoData()
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Generate mock chart data for visualization
  const generateChartData = (trend: 'up' | 'down') => {
    const baseValue = 20
    const data = []
    for (let i = 0; i < 14; i++) {
      const variation = trend === 'up' 
        ? Math.random() * 10 + i * 2
        : Math.random() * 10 - i * 2
      data.push(baseValue + variation)
    }
    return data
  }

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="p-6 bg-card border border-border/40">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="border-t border-border/30" />
                  <div>
                    <Skeleton className="h-8 w-20 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-12 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
            <p className="text-yellow-600 text-sm text-center">{error}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cryptoData.map((crypto, index) => (
              <motion.div
                key={crypto.symbol}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card
                  className={`p-6 bg-card transition-all cursor-pointer ${
                    index === 0 ? "border-2 border-blue-500" : "border border-border/40 hover:border-primary/50"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">{crypto.symbol}</span>
                      <span className="text-sm text-muted-foreground">{crypto.name}</span>
                    </div>

                    <div className="border-t border-border/30" />

                    <div>
                      <p className="text-2xl font-bold mb-1">${parseFloat(crypto.price).toFixed(2)}</p>
                      <p className={`text-xs ${crypto.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {crypto.trend === 'up' ? '+' : ''}{crypto.changePercent}%
                      </p>
                    </div>

                    <motion.div
                      className="h-12 mt-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={generateChartData(crypto.trend).map((value, idx) => ({ x: idx, y: value }))}>
                          <Line
                            type="monotone"
                            dataKey="y"
                            stroke={crypto.trend === 'up' ? "#10b981" : "#ef4444"}
                            strokeWidth={2}
                            dot={false}
                            animationDuration={1000}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cryptoData.map((crypto, index) => (
            <motion.div
              key={crypto.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card
                className={`p-6 bg-card transition-all cursor-pointer ${
                  index === 0 ? "border-2 border-blue-500" : "border border-border/40 hover:border-primary/50"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">{crypto.symbol}</span>
                    <span className="text-sm text-muted-foreground">{crypto.name}</span>
                  </div>

                  <div className="border-t border-border/30" />

                  <div>
                    <p className="text-2xl font-bold mb-1">${parseFloat(crypto.price).toFixed(2)}</p>
                    <p className={`text-xs ${crypto.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {crypto.trend === 'up' ? '+' : ''}{crypto.changePercent}%
                    </p>
                  </div>

                  <motion.div
                    className="h-12 mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generateChartData(crypto.trend).map((value, idx) => ({ x: idx, y: value }))}>
                        <Line
                          type="monotone"
                          dataKey="y"
                          stroke={crypto.trend === 'up' ? "#10b981" : "#ef4444"}
                          strokeWidth={2}
                          dot={false}
                          animationDuration={1000}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}