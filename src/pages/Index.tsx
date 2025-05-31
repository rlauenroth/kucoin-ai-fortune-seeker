
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TradingChart } from '@/components/TradingChart';
import { MarketData } from '@/components/MarketData';
import { PositionsTable } from '@/components/PositionsTable';
import { AIStrategyPanel } from '@/components/AIStrategyPanel';
import { RiskProfileSelector } from '@/components/RiskProfileSelector';
import { Brain, TrendingUp, TrendingDown, DollarSign, Activity, Settings, Play, Square } from 'lucide-react';

const Index = () => {
  const [portfolioValue, setPortfolioValue] = useState(100000);
  const [dailyPnL, setDailyPnL] = useState(2847.52);
  const [totalPnL, setTotalPnL] = useState(12456.89);
  const [isTrading, setIsTrading] = useState(false);
  const [profitThreshold, setProfitThreshold] = useState([15]);
  const [lossThreshold, setLossThreshold] = useState([8]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 100;
      setPortfolioValue(prev => Math.max(0, prev + change));
      setDailyPnL(prev => prev + change * 0.1);
      setTotalPnL(prev => prev + change * 0.05);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleStartTrading = () => {
    setIsTrading(!isTrading);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">KuCoin AI Trader</h1>
                <p className="text-slate-400 text-sm">KI-gesteuerte Gewinn-App</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isTrading ? "default" : "secondary"} className="px-3 py-1">
                <Activity className="w-3 h-3 mr-1" />
                {isTrading ? 'Live Trading' : 'Inaktiv'}
              </Badge>
              <Button
                onClick={handleStartTrading}
                className={`${isTrading ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} transition-all duration-200`}
              >
                {isTrading ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isTrading ? 'Stoppen' : 'Trading starten'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-300 text-sm font-medium">Portfolio Wert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${portfolioValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm">+2.85%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-300 text-sm font-medium">Tages P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                +${dailyPnL.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm">+2.85%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-300 text-sm font-medium">Gesamt P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                +${totalPnL.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm">+12.46%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-300 text-sm font-medium">Aktive Positionen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">7</div>
              <div className="flex items-center mt-2">
                <DollarSign className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-blue-500 text-sm">3 Long, 4 Short</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Chart and Market Data */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <TradingChart />
              </CardContent>
            </Card>

            <Tabs defaultValue="positions" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                <TabsTrigger value="positions">Positionen</TabsTrigger>
                <TabsTrigger value="market">Marktdaten</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>
              <TabsContent value="positions">
                <PositionsTable />
              </TabsContent>
              <TabsContent value="market">
                <MarketData />
              </TabsContent>
              <TabsContent value="orders">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <p className="text-slate-400">Keine aktiven Orders</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Strategy Panel */}
          <div className="space-y-6">
            <RiskProfileSelector />
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Gewinn/Verlust Limits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Gewinnmitnahme bei: {profitThreshold[0]}%
                  </label>
                  <Slider
                    value={profitThreshold}
                    onValueChange={setProfitThreshold}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Stop-Loss bei: {lossThreshold[0]}%
                  </label>
                  <Slider
                    value={lossThreshold}
                    onValueChange={setLossThreshold}
                    max={25}
                    min={2}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <AIStrategyPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
