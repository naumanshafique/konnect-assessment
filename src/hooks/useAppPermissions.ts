import { useCallback, useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import type { AppPermissions, PermissionStatus } from '../types';
import { openAppSettings } from '../utils/permissions';
import {
  checkNotifications,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

function mapVisionStatus(status: CameraPermissionStatus): PermissionStatus {
  switch (status) {
    case 'granted':
      return 'granted';
    case 'denied':
      return 'denied';
    default:
      return 'undetermined';
  }
}

function mapNotificationStatus(status: string): PermissionStatus {
  return status === 'granted' ? 'granted' : 'denied';
}

export function useAppPermissions() {
  const [permissions, setPermissions] = useState<AppPermissions>({
    camera: 'undetermined',
    microphone: 'undetermined',
    notifications: 'undetermined',
  });

  const checkPermissions = useCallback(async () => {
    const cameraStatus = await Camera.getCameraPermissionStatus();
    const micStatus = await Camera.getMicrophonePermissionStatus();

    let notificationStatus;

    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      notificationStatus = hasPermission ? 'granted' : 'denied';
    } else {
      const { status } = await checkNotifications();
      notificationStatus = status === RESULTS.GRANTED ? 'granted' : 'denied';
    }
    setPermissions({
      camera: mapVisionStatus(cameraStatus),
      microphone: mapVisionStatus(micStatus),
      notifications: mapNotificationStatus(notificationStatus),
    });
  }, []);

  const requestPermissions = useCallback(async () => {
    const cameraResult = await Camera.requestCameraPermission();
    const micResult = await Camera.requestMicrophonePermission();
    let notificationResult;

    if (Platform.OS === 'android') {
      notificationResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } else {
      const { status } = await requestNotifications(['alert', 'sound']);
      notificationResult = status === RESULTS.GRANTED ? 'granted' : 'denied';
    }

    setPermissions({
      camera: mapVisionStatus(cameraResult),
      microphone: mapVisionStatus(micResult),
      notifications: mapNotificationStatus(notificationResult),
    });
  }, []);

  useEffect(() => {
    checkPermissions();
    requestPermissions();
  }, [checkPermissions, requestPermissions]);

  const allGranted =
    permissions.camera === 'granted' &&
    permissions.microphone === 'granted' &&
    permissions.notifications === 'granted';

  const anyBlocked =
    permissions.camera === 'denied' ||
    permissions.microphone === 'denied' ||
    permissions.notifications === 'denied' ||
    permissions.notifications === 'never_ask_again';

  return {
    allGranted,
    anyBlocked,
    requestPermissions,
    checkPermissions,
    openSettings: openAppSettings,
  };
}
