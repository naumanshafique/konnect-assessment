import { useCallback, useEffect, useState } from 'react';
import notifee, { EventType } from '@notifee/react-native';
import {
  triggerIncomingCall,
  scheduleIncomingCall,
  cancelIncomingCall,
} from '../services/notificationService';
import { ACTION_ACCEPT_CALL, ACTION_DECLINE_CALL } from '../constants';
import type { CallState, IncomingCallPayload } from '../types';

export function useIncomingCall() {
  const [callState, setCallState] = useState<CallState | null>(null);

  const trigger = useCallback(async (payload: IncomingCallPayload) => {
    setCallState({
      isIncoming: true,
      callerName: payload.callerName,
      callId: payload.callId,
    });
    await triggerIncomingCall(payload);
  }, []);

  const scheduleCall = useCallback(
    async (payload: IncomingCallPayload, delayMs: number) => {
      setCallState({
        isIncoming: true,
        callerName: payload.callerName,
        callId: payload.callId,
      });
      await scheduleIncomingCall(payload, delayMs);
    },
    [],
  );

  const clearCall = useCallback(() => {
    setCallState(null);
  }, []);

  useEffect(() => {
    notifee.getInitialNotification().then(initial => {
      const action = initial?.pressAction?.id;
      if (action === ACTION_ACCEPT_CALL) {
        cancelIncomingCall();
        setCallState(prev => (prev ? { ...prev, isIncoming: false } : null));
      } else if (action === ACTION_DECLINE_CALL) {
        cancelIncomingCall();
        setCallState(null);
      }
    });

    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.ACTION_PRESS) {
        switch (detail.pressAction?.id) {
          case ACTION_ACCEPT_CALL:
            cancelIncomingCall();
            setCallState(prev =>
              prev ? { ...prev, isIncoming: false } : null,
            );
            break;
          case ACTION_DECLINE_CALL:
            cancelIncomingCall();
            setCallState(null);
            break;
        }
      }
    });

    return unsubscribe;
  }, []);

  return {
    callState,
    triggerIncomingCall: trigger,
    scheduleIncomingCall: scheduleCall,
    clearCall,
  };
}
