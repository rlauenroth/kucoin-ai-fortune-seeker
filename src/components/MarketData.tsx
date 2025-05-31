
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export const MarketData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    { symbol: 'BTC/USDT', price: 42350.50, change: 1250.30, changePercent: 3.04, volume: 1234567 },
    { symbol: 'ETH/USDT', price: 2580.25, change: -45.20, changePercent: -1.72, volume: 987654 },
    { symbol: 'BNB/USDT', price: 310.15, change: 8.45, changePercent: 2.80, volume: 456789 },
    { symbol: 'ADA/USDT', price: 0.485, change: 0.015, changePercent: 3.19, volume: 2345678 },
    { symbol: 'SOL/USDT', price: 98.75, change: -2.30, changePercent: -2.28, volume: 876543 },
    { symbol: 'XRP/USDT', price: 0.635, change: 0.025, changePercent: 4.09, volume: 3456789 },
  ]);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prev => prev.map(crypto => {
        const priceChange = (Math.random() - 0.5) * crypto.price * 0.002;
        const newPrice = Math.max(0, crypto.price + priceChange);
        const changePercent = (priceChange / crypto.price) * 100;
        
        return {
          ...crypto,
          price: newPrice,
          change: crypto.change + priceChange,
          changePercent: crypto.changePercent + changePercent * 0.1,
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-4 text-slate-300 font-medium">Symbol</th>
                <th className="text-right p-4 text-slate-300 font-medium">Preis</th>
                <th className="text-right p-4 text-slate-300 font-medium">24h Änderung</th>
                <th className="text-right p-4 text-slate-300 font-medium">Volumen</th>
                <th className="text-center p-4 text-slate-300 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto, index) => (
                <tr key={crypto.symbol} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-white">{crypto.symbol}</div>
                  </td>
                  <td className="p-4 text-right text-white font-mono">
                    ${crypto.price.toLocaleString('de-DE', { 
                      minimumFractionDigits: crypto.price < 1 ? 3 : 2,
                      maximumFractionDigits: crypto.price < 1 ? 3 : 2
                    })}
                  </td>
                  <td className="p-4 text-right">
                    <div className={`${crypto.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent.toFixed(2)}%
                    </div>
                    <div className={`text-sm ${crypto.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.changePercent >= 0 ? '+' : ''}${crypto.change.toFixed(2)}
                    </div>
                  </td>
                  <td className="p-4 text-right text-slate-300 font-mono">
                    ${(crypto.volume / 1000).toFixed(0)}k
                  </td>
                  <td className="p-4 text-center">
                    {crypto.changePercent >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-400 mx-auto" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
