
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { TradingChart } from '@/components/TradingChart';
import { MarketData } from '@/components/MarketData';
import { PositionsTable } from '@/components/PositionsTable';
import { AIStrategyPanel } from '@/components/AIStrategyPanel';
import { RiskProfileSelector } from '@/components/RiskProfileSelector';
import { MobileNavigation } from '@/components/MobileNavigation';
import { Brain, TrendingUp, TrendingDown, DollarSign, Activity, Settings, Play, Square, Menu } from 'lucide-react';

const Index = () => {
  const [portfolioValue, setPortfolioValue] = useState(100000);
  const [dailyPnL, setDailyPnL] = useState(2847.52);
  const [totalPnL, setTotalPnL] = useState(12456.89);
  const [isTrading, setIsTrading] = useState(false);
  const [profitThreshold, setProfitThreshold] = useState([15]);
  const [lossThreshold, setLossThreshold] = useState([8]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      {/* Mobile-optimized Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                className="md:hidden p-2 hover:bg-slate-800 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold">KuCoin AI Trader</h1>
                <p className="text-slate-400 text-xs">KI-gesteuerte Mobile App</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isTrading ? "default" : "secondary"} className="px-2 py-1 text-xs">
                <Activity className="w-3 h-3 mr-1" />
                {isTrading ? 'Live' : 'Inaktiv'}
              </Badge>
              <Button
                onClick={handleStartTrading}
                size="sm"
                className={`${isTrading ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} transition-all duration-200`}
              >
                {isTrading ? <Square className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                <span className="hidden sm:inline">{isTrading ? 'Stop' : 'Start'}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="container mx-auto px-4 py-4">
        {/* Mobile-optimized Portfolio Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-300 text-xs font-medium">Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg font-bold text-white">
                ${(portfolioValue / 1000).toFixed(0)}k
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-500 text-xs">+2.85%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-300 text-xs font-medium">Heute P&L</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg font-bold text-green-400">
                +${(dailyPnL / 1000).toFixed(1)}k
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-500 text-xs">+2.85%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-300 text-xs font-medium">Gesamt P&L</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg font-bold text-green-400">
                +${(totalPnL / 1000).toFixed(1)}k
              </div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-500 text-xs">+12.46%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-300 text-xs font-medium">Positionen</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-lg font-bold text-white">7</div>
              <div className="flex items-center mt-1">
                <DollarSign className="w-3 h-3 text-blue-500 mr-1" />
                <span className="text-blue-500 text-xs">3L, 4S</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile-optimized Main Content */}
        <div className="space-y-6">
          {/* Trading Chart */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <TradingChart />
            </CardContent>
          </Card>

          {/* Risk Profile and Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RiskProfileSelector />
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-lg">
                  <Settings className="w-5 h-5 mr-2" />
                  Trading Limits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Gewinn bei: {profitThreshold[0]}%
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
          </div>

          {/* Mobile-optimized Tabs */}
          <Tabs defaultValue="positions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="positions" className="text-xs">Positionen</TabsTrigger>
              <TabsTrigger value="market" className="text-xs">Markt</TabsTrigger>
              <TabsTrigger value="ai" className="text-xs">KI-Strategie</TabsTrigger>
            </TabsList>
            <TabsContent value="positions" className="mt-4">
              <PositionsTable />
            </TabsContent>
            <TabsContent value="market" className="mt-4">
              <MarketData />
            </TabsContent>
            <TabsContent value="ai" className="mt-4">
              <AIStrategyPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
