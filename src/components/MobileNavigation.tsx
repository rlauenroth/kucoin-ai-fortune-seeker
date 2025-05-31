
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Settings, 
  TrendingUp, 
  History, 
  Bell, 
  User,
  X
} from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  if (!isOpen) return null;

  const navigationItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/' },
    { icon: TrendingUp, label: 'Live Trading', href: '/trading' },
    { icon: History, label: 'Historie', href: '/history' },
    { icon: Bell, label: 'Benachrichtigungen', href: '/notifications' },
    { icon: Settings, label: 'Einstellungen', href: '/settings' },
    { icon: User, label: 'Profil', href: '/profile' },
  ];

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Navigation Panel */}
      <div className="absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-slate-900 border-r border-slate-700 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 p-3 h-auto"
                onClick={onClose}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>
        
        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <Card className="bg-slate-800/50 border-slate-600 p-3">
            <div className="text-sm text-slate-400 mb-2">Schnellzugriff</div>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                Notfall Stop
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                Status
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
