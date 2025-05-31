
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, X } from 'lucide-react';

interface Position {
  id: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  duration: string;
}

const positions: Position[] = [
  {
    id: '1',
    symbol: 'BTC/USDT',
    side: 'LONG',
    size: 0.5,
    entryPrice: 41250.00,
    currentPrice: 42350.50,
    pnl: 550.25,
    pnlPercent: 2.67,
    duration: '2h 15m'
  },
  {
    id: '2',
    symbol: 'ETH/USDT',
    side: 'SHORT',
    size: 2.0,
    entryPrice: 2620.00,
    currentPrice: 2580.25,
    pnl: 79.50,
    pnlPercent: 1.52,
    duration: '45m'
  },
  {
    id: '3',
    symbol: 'ADA/USDT',
    side: 'LONG',
    size: 5000,
    entryPrice: 0.470,
    currentPrice: 0.485,
    pnl: 75.00,
    pnlPercent: 3.19,
    duration: '1h 30m'
  },
];

export const PositionsTable = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-4 text-slate-300 font-medium">Symbol</th>
                <th className="text-center p-4 text-slate-300 font-medium">Seite</th>
                <th className="text-right p-4 text-slate-300 font-medium">Größe</th>
                <th className="text-right p-4 text-slate-300 font-medium">Einstieg</th>
                <th className="text-right p-4 text-slate-300 font-medium">Aktuell</th>
                <th className="text-right p-4 text-slate-300 font-medium">P&L</th>
                <th className="text-center p-4 text-slate-300 font-medium">Dauer</th>
                <th className="text-center p-4 text-slate-300 font-medium">Aktion</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-white">{position.symbol}</div>
                  </td>
                  <td className="p-4 text-center">
                    <Badge 
                      variant={position.side === 'LONG' ? 'default' : 'secondary'}
                      className={position.side === 'LONG' ? 'bg-green-600' : 'bg-red-600'}
                    >
                      {position.side}
                    </Badge>
                  </td>
                  <td className="p-4 text-right text-white font-mono">
                    {position.size}
                  </td>
                  <td className="p-4 text-right text-slate-300 font-mono">
                    ${position.entryPrice.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 text-right text-white font-mono">
                    ${position.currentPrice.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 text-right">
                    <div className={`font-medium ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                    </div>
                    <div className={`text-sm ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.pnl >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                    </div>
                  </td>
                  <td className="p-4 text-center text-slate-300 text-sm">
                    {position.duration}
                  </td>
                  <td className="p-4 text-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
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
