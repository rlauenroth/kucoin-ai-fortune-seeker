
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Activity, Zap } from 'lucide-react';

export const AIStrategyPanel = () => {
  const [strategies, setStrategies] = useState({
    movingAverages: true,
    rsi: true,
    mlModel: true,
    volumeAnalysis: false,
  });

  const [parameters, setParameters] = useState({
    maWindow: [20],
    rsiPeriod: [14],
    mlConfidence: [75],
    volumeThreshold: [150],
  });

  const toggleStrategy = (strategy: keyof typeof strategies) => {
    setStrategies(prev => ({
      ...prev,
      [strategy]: !prev[strategy]
    }));
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          KI-Strategien
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Moving Averages */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-white">Moving Averages</span>
            </div>
            <Switch
              checked={strategies.movingAverages}
              onCheckedChange={() => toggleStrategy('movingAverages')}
            />
          </div>
          {strategies.movingAverages && (
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Zeitfenster: {parameters.maWindow[0]} Perioden
              </label>
              <Slider
                value={parameters.maWindow}
                onValueChange={(value) => setParameters(prev => ({ ...prev, maWindow: value }))}
                max={50}
                min={5}
                step={1}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* RSI */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-white">RSI Indikator</span>
            </div>
            <Switch
              checked={strategies.rsi}
              onCheckedChange={() => toggleStrategy('rsi')}
            />
          </div>
          {strategies.rsi && (
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                RSI Periode: {parameters.rsiPeriod[0]}
              </label>
              <Slider
                value={parameters.rsiPeriod}
                onValueChange={(value) => setParameters(prev => ({ ...prev, rsiPeriod: value }))}
                max={30}
                min={7}
                step={1}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* ML Model */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-green-400" />
              <span className="text-white">ML Modell</span>
              <Badge variant="secondary" className="text-xs">Neural Network</Badge>
            </div>
            <Switch
              checked={strategies.mlModel}
              onCheckedChange={() => toggleStrategy('mlModel')}
            />
          </div>
          {strategies.mlModel && (
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Mindest-Konfidenz: {parameters.mlConfidence[0]}%
              </label>
              <Slider
                value={parameters.mlConfidence}
                onValueChange={(value) => setParameters(prev => ({ ...prev, mlConfidence: value }))}
                max={95}
                min={50}
                step={5}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Volume Analysis */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white">Volumen-Analyse</span>
              <Badge variant="outline" className="text-xs">Experimental</Badge>
            </div>
            <Switch
              checked={strategies.volumeAnalysis}
              onCheckedChange={() => toggleStrategy('volumeAnalysis')}
            />
          </div>
          {strategies.volumeAnalysis && (
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Volumen-Schwelle: {parameters.volumeThreshold[0]}%
              </label>
              <Slider
                value={parameters.volumeThreshold}
                onValueChange={(value) => setParameters(prev => ({ ...prev, volumeThreshold: value }))}
                max={300}
                min={100}
                step={10}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Strategy Status */}
        <div className="pt-4 border-t border-slate-700">
          <div className="text-sm text-slate-400 mb-2">Aktive Strategien:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(strategies).map(([key, enabled]) => {
              if (!enabled) return null;
              const labels = {
                movingAverages: 'MA',
                rsi: 'RSI',
                mlModel: 'ML',
                volumeAnalysis: 'Volume'
              };
              return (
                <Badge key={key} variant="default" className="bg-blue-600">
                  {labels[key as keyof typeof labels]}
                </Badge>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
