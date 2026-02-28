import notifee, { EventType } from '@notifee/react-native';
import { ACTION_ACCEPT_CALL, ACTION_DECLINE_CALL } from '../constants';
import { cancelIncomingCall, triggerIncomingCall } from './notificationService';

export function registerBackgroundHandler(): void {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const actionId = detail.pressAction?.id;
    if (
      type === EventType.ACTION_PRESS &&
      (actionId === ACTION_ACCEPT_CALL || actionId === ACTION_DECLINE_CALL)
    ) {
      await cancelIncomingCall();
    }
  });
}

export async function handleDataOnlyPush(
  data: Record<string, string>,
): Promise<void> {
  if (data.type === 'incoming_call') {
    await triggerIncomingCall({
      callId: data.callId ?? 'unknown',
      callerName: data.callerName ?? 'Unknown Caller',
    });
  }
}
