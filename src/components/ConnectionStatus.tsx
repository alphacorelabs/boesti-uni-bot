import React from 'react';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';

export type ConnectionState = 'connected' | 'connecting' | 'disconnected' | 'error';

interface ConnectionStatusProps {
  status: ConnectionState;
  className?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status, className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: Wifi,
          text: 'Connected',
          className: 'text-success bg-success/10'
        };
      case 'connecting':
        return {
          icon: Wifi,
          text: 'Connecting...',
          className: 'text-primary bg-primary/10'
        };
      case 'disconnected':
        return {
          icon: WifiOff,
          text: 'Disconnected',
          className: 'text-muted-foreground bg-muted'
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'Connection Error',
          className: 'text-error bg-error/10'
        };
      default:
        return {
          icon: WifiOff,
          text: 'Unknown',
          className: 'text-muted-foreground bg-muted'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.className} ${className}`}>
      <Icon className="w-3 h-3" />
      <span>{config.text}</span>
    </div>
  );
};