export type PermissionStatus =
  | 'granted'
  | 'denied'
  | 'blocked'
  | 'undetermined'
  | 'never_ask_again';

export interface AppPermissions {
  camera: PermissionStatus;
  microphone: PermissionStatus;
  notifications: PermissionStatus;
}

export type CameraPosition = 'front' | 'back';

export interface CameraState {
  position: CameraPosition;
  isMicMuted: boolean;
  isActive: boolean;
}

export type CallAction = 'accept' | 'decline';

export interface CallState {
  isIncoming: boolean;
  callerName: string;
  callId: string;
}

export interface IncomingCallPayload {
  callId: string;
  callerName: string;
  callerAvatar?: string;
}
