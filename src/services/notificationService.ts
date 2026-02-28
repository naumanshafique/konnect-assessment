import notifee, {
  AndroidImportance,
  AndroidCategory,
  AndroidVisibility,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {
  CALL_CHANNEL_ID,
  CALL_CHANNEL_NAME,
  ACTION_ACCEPT_CALL,
  ACTION_DECLINE_CALL,
  INCOMING_CALL_NOTIFICATION_ID,
} from '../constants';
import type { IncomingCallPayload } from '../types';

export async function registerNotificationCategories(): Promise<void> {
  await notifee.setNotificationCategories([
    {
      id: 'incoming-call',
      actions: [
        { id: ACTION_ACCEPT_CALL, title: 'Accept', foreground: true },
        { id: ACTION_DECLINE_CALL, title: 'Decline', destructive: true },
      ],
    },
  ]);
}

async function ensureChannel(): Promise<string> {
  return notifee.createChannel({
    id: CALL_CHANNEL_ID,
    name: CALL_CHANNEL_NAME,
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    sound: 'default',
    vibration: true,
  });
}

function buildCallNotification(callerName: string, channelId: string) {
  return {
    id: INCOMING_CALL_NOTIFICATION_ID,
    title: 'Incoming Call',
    body: `${callerName} is calling...`,
    android: {
      channelId,
      category: AndroidCategory.CALL,
      importance: AndroidImportance.HIGH,
      pressAction: { id: 'default' },
      fullScreenAction: { id: 'default' },
      actions: [
        {
          title: 'Accept',
          pressAction: { id: ACTION_ACCEPT_CALL, launchActivity: 'default' },
        },
        {
          title: 'Decline',
          pressAction: { id: ACTION_DECLINE_CALL },
        },
      ],
      ongoing: true,
      autoCancel: false,
    },
    ios: {
      categoryId: 'incoming-call',
      sound: 'default',
      critical: true,
      criticalVolume: 1.0,
    },
  };
}

export async function triggerIncomingCall(
  payload: IncomingCallPayload,
): Promise<void> {
  const channelId = await ensureChannel();
  await notifee.displayNotification(
    buildCallNotification(payload.callerName, channelId),
  );
}

export async function scheduleIncomingCall(
  payload: IncomingCallPayload,
  delayMs: number,
): Promise<void> {
  const channelId = await ensureChannel();
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + delayMs,
  };
  await notifee.createTriggerNotification(
    buildCallNotification(payload.callerName, channelId),
    trigger,
  );
}

export async function cancelIncomingCall(): Promise<void> {
  await notifee.cancelNotification(INCOMING_CALL_NOTIFICATION_ID);
}
