"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ArrowUpDown } from "lucide-react"
import { motion } from "framer-motion"
import { apiClient, TradingPair } from "@/lib/api"
import { toast } from "sonner"

export function ExchangeWidget() {
  const [fromAmount, setFromAmount] = useState("5273.35")
  const [toAmount, setToAmount] = useState("0.2271")
  const [fromCurrency, setFromCurrency] = useState("ETH")
  const [toCurrency, setToCurrency] = useState("BTC")
  const [tradingPairs, setTradingPairs] = useState<TradingPair[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    const fetchTradingPairs = async () => {
      try {
        setIsLoading(true)
        const response = await apiClient.getPopularPairs()
        setTradingPairs(response)
      } catch (err: any) {
        console.error('Error fetching trading pairs:', err)
        toast.error('Failed to load exchange rates')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTradingPairs()
  }, [])

  const calculateExchange = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    try {
      setIsCalculating(true)
      
      // Get current prices for both currencies
      const fromPair = tradingPairs.find(pair => pair.symbol.includes(fromCurrency))
      const toPair = tradingPairs.find(pair => pair.symbol.includes(toCurrency))
      
      if (!fromPair || !toPair) {
        toast.error("Currency pair not found")
        return
      }

      const fromPrice = parseFloat(fromPair.lastPrice)
      const toPrice = parseFloat(toPair.lastPrice)
      
      // Calculate exchange rate
      const exchangeRate = fromPrice / toPrice
      const calculatedAmount = (parseFloat(fromAmount) * exchangeRate).toFixed(6)
      
      setToAmount(calculatedAmount)
    } catch (error: any) {
      toast.error("Failed to calculate exchange rate")
    } finally {
      setIsCalculating(false)
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  // Calculate total values
  const getTotalValue = (amount: string, currency: string) => {
    const pair = tradingPairs.find(pair => pair.symbol.includes(currency))
    if (pair) {
      const price = parseFloat(pair.lastPrice)
      const total = parseFloat(amount) * price
      return total.toFixed(2)
    }
    return "0.00"
  }

  const getBalance = (currency: string) => {
    // Mock balance - in real app this would come from user's account
    const mockBalances: { [key: string]: string } = {
      'BTC': '0.1234',
      'ETH': '2.5678',
      'USDT': '1000.00',
      'LTC': '15.4321'
    }
    return mockBalances[currency] || '0.00'
  }

  return (
    <motion.div
      className="bg-card/50 backdrop-blur border border-border/40 rounded-xl p-6"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-center mb-6">Обмен</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Итого: ${getTotalValue(fromAmount, fromCurrency)}</span>
            <span>Баланс: {getBalance(fromCurrency)} {fromCurrency}</span>
          </div>
          <div className="flex items-center justify-between bg-card/80 rounded-lg p-4 border border-border/20">
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="bg-transparent outline-none text-3xl font-bold text-white w-1/2"
              placeholder="0.00"
              onBlur={calculateExchange}
            />
            <button className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold">{fromCurrency}</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={swapCurrencies}
            className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-all hover:scale-110"
          >
            <ArrowUpDown className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Получите: ${getTotalValue(toAmount, toCurrency)}</span>
            <span>Баланс: {getBalance(toCurrency)} {toCurrency}</span>
          </div>
          <div className="flex items-center justify-between bg-card/80 rounded-lg p-4 border border-border/20">
            <input
              type="text"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className="bg-transparent outline-none text-3xl font-bold text-white w-1/2"
              placeholder="0.00"
              readOnly
            />
            <button className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
              <span className="text-2xl font-bold">{toCurrency}</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-lg mt-6 hover:scale-[1.02] transition-transform"
          onClick={calculateExchange}
          disabled={isCalculating || isLoading}
        >
          {isCalculating ? "Расчет..." : "Обменять"}
        </Button>
      </div>
    </motion.div>
  )
}
