'use client';

import { useState, useEffect } from 'react';

interface NetworkInformation {
  type?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  addEventListener?: (event: string, listener: () => void) => void;
  removeEventListener?: (event: string, listener: () => void) => void;
}

interface NetworkQuality {
  isGoodConnection: boolean;
  connectionType: string;
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
  screenSize: 'small' | 'medium' | 'large';
}

export function useNetworkQuality(): NetworkQuality {
  const [networkQuality, setNetworkQuality] = useState<NetworkQuality>({
    isGoodConnection: true, // Default to true for SSR
    connectionType: 'unknown',
    effectiveType: '4g',
    downlink: 10,
    rtt: 50,
    saveData: false,
    screenSize: 'large'
  });

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    // Get screen size
    const getScreenSize = (): 'small' | 'medium' | 'large' => {
      const width = window.innerWidth;
      if (width < 768) return 'small';
      if (width < 1024) return 'medium';
      return 'large';
    };

    // Get network information
    const getNetworkInfo = () => {
      const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection || 
                        (navigator as Navigator & { mozConnection?: NetworkInformation }).mozConnection || 
                        (navigator as Navigator & { webkitConnection?: NetworkInformation }).webkitConnection;

      if (!connection) {
        // Fallback: assume good connection if no connection API
        return {
          isGoodConnection: true,
          connectionType: 'unknown',
          effectiveType: '4g',
          downlink: 10,
          rtt: 50,
          saveData: false
        };
      }

      // Determine if connection is good based on multiple factors
      const isGoodConnection = 
        connection.effectiveType === '4g' && 
        connection.downlink >= 1.5 && 
        connection.rtt <= 200 &&
        !connection.saveData;

      return {
        isGoodConnection,
        connectionType: connection.type || 'unknown',
        effectiveType: connection.effectiveType || '4g',
        downlink: connection.downlink || 10,
        rtt: connection.rtt || 50,
        saveData: connection.saveData || false
      };
    };

    // Initial check
    const updateNetworkInfo = () => {
      const networkInfo = getNetworkInfo();
      const screenSize = getScreenSize();
      
      setNetworkQuality({
        ...networkInfo,
        screenSize
      });
    };

    // Listen for network changes
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection || 
                      (navigator as Navigator & { mozConnection?: NetworkInformation }).mozConnection || 
                      (navigator as Navigator & { webkitConnection?: NetworkInformation }).webkitConnection;

    if (connection) {
      connection.addEventListener('change', updateNetworkInfo);
    }

    // Listen for window resize
    window.addEventListener('resize', updateNetworkInfo);

    // Initial update
    updateNetworkInfo();

    // Cleanup
    return () => {
      if (connection) {
        connection.removeEventListener('change', updateNetworkInfo);
      }
      window.removeEventListener('resize', updateNetworkInfo);
    };
  }, []);

  return networkQuality;
}

// Helper function to determine if video should be used
export function shouldUseVideo(networkQuality: NetworkQuality): boolean {
  // More conservative approach for better user experience
  return networkQuality.isGoodConnection && 
         networkQuality.screenSize !== 'small' && 
         !networkQuality.saveData &&
         networkQuality.downlink >= 1.5 && // At least 1.5 Mbps
         networkQuality.rtt <= 200; // Round trip time under 200ms
}
