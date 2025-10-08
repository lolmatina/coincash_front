"use client"

import { motion } from "framer-motion"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { apiClient, TradingPair } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export function TradingPairs() {
  const [tradingPairs, setTradingPairs] = useState<TradingPair[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTradingPairs = async () => {
      try {
        setIsLoading(true)
        const response = await apiClient.getPopularPairs()
        setTradingPairs(response.slice(0, 4)) // Show only first 4 pairs
      } catch (err: any) {
        console.error('Error fetching trading pairs:', err)
        
        // Fallback to mock data if API fails
        const mockData: TradingPair[] = [
          {
            symbol: "BTCUSDT",
            price: "121432.43",
            priceChange: "-2839.59",
            priceChangePercent: "-2.29",
            weightedAvgPrice: "122000.00",
            prevClosePrice: "124271.02",
            lastPrice: "121432.43",
            lastQty: "0.001",
            bidPrice: "121432.42",
            askPrice: "121432.43",
            openPrice: "124271.02",
            highPrice: "125000.00",
            lowPrice: "120000.00",
            volume: "12345.67",
            quoteVolume: "1500000000.00",
            openTime: 1640995200000,
            closeTime: 1641081600000,
            firstId: 1000000,
            lastId: 2000000,
            count: 1000000
          },
          {
            symbol: "ETHUSDT",
            price: "4441.28",
            priceChange: "-245.08",
            priceChangePercent: "-5.23",
            weightedAvgPrice: "4500.00",
            prevClosePrice: "4686.36",
            lastPrice: "4441.28",
            lastQty: "0.1",
            bidPrice: "4441.27",
            askPrice: "4441.28",
            openPrice: "4686.36",
            highPrice: "4700.00",
            lowPrice: "4400.00",
            volume: "98765.43",
            quoteVolume: "450000000.00",
            openTime: 1640995200000,
            closeTime: 1641081600000,
            firstId: 2000000,
            lastId: 3000000,
            count: 1000000
          },
          {
            symbol: "LTCUSDT",
            price: "78.45",
            priceChange: "2.15",
            priceChangePercent: "2.82",
            weightedAvgPrice: "77.00",
            prevClosePrice: "76.30",
            lastPrice: "78.45",
            lastQty: "1.0",
            bidPrice: "78.44",
            askPrice: "78.45",
            openPrice: "76.30",
            highPrice: "79.00",
            lowPrice: "75.00",
            volume: "54321.09",
            quoteVolume: "4200000.00",
            openTime: 1640995200000,
            closeTime: 1641081600000,
            firstId: 3000000,
            lastId: 4000000,
            count: 1000000
          },
          {
            symbol: "DOGEUSDT",
            price: "0.1234",
            priceChange: "0.0023",
            priceChangePercent: "1.90",
            weightedAvgPrice: "0.1210",
            prevClosePrice: "0.1211",
            lastPrice: "0.1234",
            lastQty: "1000.0",
            bidPrice: "0.1233",
            askPrice: "0.1234",
            openPrice: "0.1211",
            highPrice: "0.1250",
            lowPrice: "0.1200",
            volume: "123456789.0",
            quoteVolume: "15000000.00",
            openTime: 1640995200000,
            closeTime: 1641081600000,
            firstId: 4000000,
            lastId: 5000000,
            count: 1000000
          }
        ]
        
        setTradingPairs(mockData)
        setError(`API Error: ${err.message}. Showing sample data.`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTradingPairs()
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchTradingPairs, 30000)
    return () => clearInterval(interval)
  }, [])

  // Generate mock chart data for visualization
  const generateChartData = (priceChangePercent: string) => {
    const isPositive = parseFloat(priceChangePercent) > 0
    const baseValue = 20
    const data = []
    for (let i = 0; i < 14; i++) {
      const variation = isPositive 
        ? Math.random() * 10 + i * 2
        : Math.random() * 10 - i * 2
      data.push(baseValue + variation)
    }
    return data
  }

  // Get crypto icon and color based on symbol
  const getCryptoInfo = (symbol: string) => {
    const symbolMap: { [key: string]: { icon: string; color: string } } = {
      'BTCUSDT': { icon: '₿', color: 'bg-orange-500' },
      'ETHUSDT': { icon: 'Ξ', color: 'bg-blue-500' },
      'LTCUSDT': { icon: 'Ł', color: 'bg-blue-400' },
      'BCHUSDT': { icon: 'Ƀ', color: 'bg-green-500' },
      'ADAUSDT': { icon: '₳', color: 'bg-blue-600' },
      'DOTUSDT': { icon: '●', color: 'bg-purple-500' },
      'LINKUSDT': { icon: '🔗', color: 'bg-blue-700' },
      'XRPUSDT': { icon: 'XRP', color: 'bg-gray-500' },
    }
    return symbolMap[symbol] || { icon: symbol.substring(0, 3), color: 'bg-gray-500' }
  }

  if (isLoading) {
    return (
      <motion.div
        className="bg-card/50 backdrop-blur rounded-lg border border-border/40 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Торговая пара</th>
                <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Цена</th>
                <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Измен. за 24ч</th>
                <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Динамика</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, index) => (
                <tr key={index} className="border-b border-border/40 last:border-b-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-10 w-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3 p-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-card/80 rounded-lg p-4 border border-border/40">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        className="bg-card/50 backdrop-blur rounded-lg border border-border/40 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 p-4">
          <p className="text-yellow-600 text-sm text-center">{error}</p>
        </div>
        
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Торговая пара</th>
                <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Цена</th>
                <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Измен. за 24ч</th>
                <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Динамика</th>
              </tr>
            </thead>
            <tbody>
              {tradingPairs.map((pair, index) => {
                const cryptoInfo = getCryptoInfo(pair.symbol)
                const isPositive = parseFloat(pair.priceChangePercent) > 0
                const displaySymbol = pair.symbol.replace('USDT', '/USDT')
                
                return (
                  <motion.tr
                    key={pair.symbol}
                    className="border-b border-border/40 last:border-b-0 hover:bg-card/80 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    {/* Trading Pair */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`h-8 w-8 rounded-full ${cryptoInfo.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {cryptoInfo.icon}
                        </motion.div>
                        <span className="font-semibold text-foreground whitespace-nowrap">{displaySymbol}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <span className="font-semibold text-foreground">${parseFloat(pair.lastPrice).toFixed(2)}</span>
                    </td>

                    {/* 24h Change */}
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                        {isPositive ? '+' : ''}{pair.priceChangePercent}% {isPositive ? "↑" : "↓"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        className="w-full h-10"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={generateChartData(pair.priceChangePercent).map((value) => ({ value }))}>
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                              strokeWidth={2}
                              dot={false}
                              animationDuration={1000}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </motion.div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3 p-4">
          {tradingPairs.map((pair, index) => {
            const cryptoInfo = getCryptoInfo(pair.symbol)
            const isPositive = parseFloat(pair.priceChangePercent) > 0
            const displaySymbol = pair.symbol.replace('USDT', '/USDT')
            
            return (
              <motion.div
                key={pair.symbol}
                className="bg-card/80 rounded-lg p-4 border border-border/40 hover:bg-card/90 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Header with pair and price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`h-8 w-8 rounded-full ${cryptoInfo.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {cryptoInfo.icon}
                    </motion.div>
                    <span className="font-semibold text-foreground">{displaySymbol}</span>
                  </div>
                  <span className="font-semibold text-foreground">${parseFloat(pair.lastPrice).toFixed(2)}</span>
                </div>

                {/* Change and chart */}
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                    {isPositive ? '+' : ''}{pair.priceChangePercent}% {isPositive ? "↑" : "↓"}
                  </span>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    className="w-20 h-8"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generateChartData(pair.priceChangePercent).map((value) => ({ value }))}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                          strokeWidth={2}
                          dot={false}
                          animationDuration={1000}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="bg-card/50 backdrop-blur rounded-lg border border-border/40 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40">
              <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Торговая пара</th>
              <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Цена</th>
              <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Измен. за 24ч</th>
              <th className="px-6 py-4 text-left text-sm text-muted-foreground font-normal">Динамика</th>
            </tr>
          </thead>
          <tbody>
            {tradingPairs.map((pair, index) => {
              const cryptoInfo = getCryptoInfo(pair.symbol)
              const isPositive = parseFloat(pair.priceChangePercent) > 0
              const displaySymbol = pair.symbol.replace('USDT', '/USDT')
              
              return (
                <motion.tr
                  key={pair.symbol}
                  className="border-b border-border/40 last:border-b-0 hover:bg-card/80 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  {/* Trading Pair */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`h-8 w-8 rounded-full ${cryptoInfo.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {cryptoInfo.icon}
                      </motion.div>
                      <span className="font-semibold text-foreground whitespace-nowrap">{displaySymbol}</span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-foreground">${parseFloat(pair.lastPrice).toFixed(2)}</span>
                  </td>

                  {/* 24h Change */}
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                      {isPositive ? '+' : ''}{pair.priceChangePercent}% {isPositive ? "↑" : "↓"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className="w-full h-10"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={generateChartData(pair.priceChangePercent).map((value) => ({ value }))}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                            strokeWidth={2}
                            dot={false}
                            animationDuration={1000}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3 p-4">
        {tradingPairs.map((pair, index) => {
          const cryptoInfo = getCryptoInfo(pair.symbol)
          const isPositive = parseFloat(pair.priceChangePercent) > 0
          const displaySymbol = pair.symbol.replace('USDT', '/USDT')
          
          return (
            <motion.div
              key={pair.symbol}
              className="bg-card/80 rounded-lg p-4 border border-border/40 hover:bg-card/90 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Header with pair and price */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`h-8 w-8 rounded-full ${cryptoInfo.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {cryptoInfo.icon}
                  </motion.div>
                  <span className="font-semibold text-foreground">{displaySymbol}</span>
                </div>
                <span className="font-semibold text-foreground">${parseFloat(pair.lastPrice).toFixed(2)}</span>
              </div>

              {/* Change and chart */}
              <div className="flex items-center justify-between">
                <span className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                  {isPositive ? '+' : ''}{pair.priceChangePercent}% {isPositive ? "↑" : "↓"}
                </span>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  className="w-20 h-8"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={generateChartData(pair.priceChangePercent).map((value) => ({ value }))}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                        strokeWidth={2}
                        dot={false}
                        animationDuration={1000}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}