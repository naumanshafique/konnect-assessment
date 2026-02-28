import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface PermissionGateProps {
  allGranted: boolean;
  anyBlocked: boolean;
  onOpenSettings: () => void;
  children: React.ReactNode;
}

export function PermissionGate({
  allGranted,
  anyBlocked,
  onOpenSettings,
  children,
}: PermissionGateProps) {
  if (allGranted) {
    return <>{children}</>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permissions Required</Text>
      <Text style={styles.description}>
        This app needs camera, microphone & notification access to function.
      </Text>
      {anyBlocked && (
        <TouchableOpacity style={styles.button} onPress={onOpenSettings}>
          <Text style={styles.buttonText}>Open Settings</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
