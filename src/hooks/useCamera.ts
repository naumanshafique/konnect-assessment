import { useCallback, useEffect, useState } from 'react';
import { useCameraDevice } from 'react-native-vision-camera';
import type { CameraState } from '../types';

export function useCamera() {
  const [state, setState] = useState<CameraState>({
    position: 'front',
    isMicMuted: false,
    isActive: true,
  });

  const device = useCameraDevice(state.position);

  const toggleCamera = useCallback(() => {
    setState(prev => ({
      ...prev,
      position: prev.position === 'front' ? 'back' : 'front',
    }));
  }, []);

  const toggleMute = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMicMuted: !prev.isMicMuted,
    }));
  }, []);

  const setActive = useCallback((active: boolean) => {
    setState(prev => ({ ...prev, isActive: active }));
  }, []);

  useEffect(() => {
    return () => {
      setState(prev => ({ ...prev, isActive: false }));
    };
  }, []);

  return {
    device,
    ...state,
    toggleCamera,
    toggleMute,
    setActive,
  };
}
