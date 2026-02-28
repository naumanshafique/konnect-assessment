import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, CameraDevice } from 'react-native-vision-camera';

interface CameraPreviewProps {
  device: CameraDevice | undefined;
  isActive: boolean;
  isMicMuted: boolean;
}

export function CameraPreview({
  device,
  isActive,
  isMicMuted,
}: CameraPreviewProps) {
  if (!device) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>No camera device available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        audio={!isMicMuted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
});
