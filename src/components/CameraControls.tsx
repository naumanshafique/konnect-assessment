import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

interface CameraControlsProps {
  isMicMuted: boolean;
  onToggleCamera: () => void;
  onToggleMute: () => void;
  onTriggerCall: () => void;
}

export function CameraControls({
  isMicMuted,
  onToggleCamera,
  onToggleMute,
  onTriggerCall,
}: CameraControlsProps) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.button} onPress={onToggleCamera}>
          <Text style={styles.buttonText}>Flip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.button, isMicMuted && styles.buttonActive]}
          onPress={onToggleMute}
        >
          <Text style={styles.buttonText}>
            {isMicMuted ? 'Unmute' : 'Mute'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.callButton]}
          onPress={onTriggerCall}
        >
          <Text style={styles.buttonText}>Simulate Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonActive: {
    backgroundColor: 'rgba(255, 59, 48, 0.8)',
  },
  callButton: {
    backgroundColor: 'rgba(52, 199, 89, 0.8)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
