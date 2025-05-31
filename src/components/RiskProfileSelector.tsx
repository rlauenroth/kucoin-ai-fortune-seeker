
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp, Zap } from 'lucide-react';

type RiskProfile = 'conservative' | 'balanced' | 'aggressive';

export const RiskProfileSelector = () => {
  const [selectedProfile, setSelectedProfile] = useState<RiskProfile>('balanced');

  const profiles = {
    conservative: {
      name: 'Konservativ',
      icon: Shield,
      color: 'bg-green-600',
      description: 'Niedrige Risiken, stabile Gewinne',
      maxDrawdown: '3%',
      positionSize: '2%',
      stopLoss: '2%',
    },
    balanced: {
      name: 'Ausgewogen',
      icon: TrendingUp,
      color: 'bg-blue-600',
      description: 'Ausgewogenes Risiko-Ertrags-Verhältnis',
      maxDrawdown: '5%',
      positionSize: '5%',
      stopLoss: '3%',
    },
    aggressive: {
      name: 'Aggressiv',
      icon: Zap,
      color: 'bg-red-600',
      description: 'Hohe Gewinne, höhere Risiken',
      maxDrawdown: '8%',
      positionSize: '10%',
      stopLoss: '5%',
    },
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Risikoprofil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(profiles).map(([key, profile]) => {
          const isSelected = selectedProfile === key;
          const IconComponent = profile.icon;
          
          return (
            <Button
              key={key}
              variant={isSelected ? "default" : "ghost"}
              className={`w-full p-4 h-auto justify-start ${
                isSelected 
                  ? profile.color 
                  : 'hover:bg-slate-700/50 border border-slate-600'
              }`}
              onClick={() => setSelectedProfile(key as RiskProfile)}
            >
              <div className="flex items-start space-x-3 w-full">
                <IconComponent className="w-5 h-5 mt-1 flex-shrink-0" />
                <div className="text-left flex-1">
                  <div className="font-medium text-white">{profile.name}</div>
                  <div className="text-sm text-slate-300 mt-1">{profile.description}</div>
                  <div className="flex space-x-4 mt-2 text-xs">
                    <span className="text-slate-400">Max Drawdown: {profile.maxDrawdown}</span>
                    <span className="text-slate-400">Position: {profile.positionSize}</span>
                  </div>
                </div>
              </div>
            </Button>
          );
        })}

        {/* Current Profile Stats */}
        <div className="pt-4 border-t border-slate-700">
          <div className="text-sm text-slate-400 mb-3">Aktuelle Einstellungen:</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-400">Max Drawdown:</span>
              <div className="text-white font-medium">{profiles[selectedProfile].maxDrawdown}</div>
            </div>
            <div>
              <span className="text-slate-400">Position Size:</span>
              <div className="text-white font-medium">{profiles[selectedProfile].positionSize}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
