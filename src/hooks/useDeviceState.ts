import { MIN_DESKTOP_WIDTH, MIN_TABLET_WIDTH } from '@/constants/deviceBreakpoints';
import { Device } from '@/types/deviceTypes';
import { useEffect, useState } from 'react';

function getDeviceState(width: number): Device {
  if (width < MIN_TABLET_WIDTH) return Device.MOBILE;
  if (width < MIN_DESKTOP_WIDTH) return Device.TABLET;
  return Device.DESKTOP;
}

export const useDeviceState = () => {
  const [deviceState, setDeviceState] = useState<Device | null>(null);

  const handleResize = () => {
    const newDeviceState = getDeviceState(window.innerWidth);
    setDeviceState((prev) => (prev !== newDeviceState ? newDeviceState : prev));
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceState;
};
