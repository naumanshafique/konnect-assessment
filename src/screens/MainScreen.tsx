import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { CameraPreview } from '../components/CameraPreview';
import { CameraControls } from '../components/CameraControls';
import { PermissionGate } from '../components/PermissionGate';
import { useAppPermissions } from '../hooks/useAppPermissions';
import { useCamera } from '../hooks/useCamera';
import { useIncomingCall } from '../hooks/useIncomingCall';

export function MainScreen() {
  const { allGranted, anyBlocked, openSettings } = useAppPermissions();

  const { device, isActive, isMicMuted, toggleCamera, toggleMute } =
    useCamera();
  const { scheduleIncomingCall } = useIncomingCall();

  const handleTriggerCall = useCallback(() => {
    scheduleIncomingCall(
      { callId: `call-${Date.now()}`, callerName: 'John Doe' },
      5000,
    );
  }, [scheduleIncomingCall]);

  return (
    <View style={styles.container}>
      <PermissionGate
        allGranted={allGranted}
        anyBlocked={anyBlocked}
        onOpenSettings={openSettings}
      >
        <CameraPreview
          device={device}
          isActive={isActive}
          isMicMuted={isMicMuted}
        />
        <CameraControls
          isMicMuted={isMicMuted}
          onToggleCamera={toggleCamera}
          onToggleMute={toggleMute}
          onTriggerCall={handleTriggerCall}
        />
      </PermissionGate>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
