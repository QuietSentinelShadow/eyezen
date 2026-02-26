'use client';

import { useState, useEffect } from 'react';

interface NotificationSettings {
  enabled: boolean;
  intervalMinutes: number;
  soundEnabled: boolean;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  intervalMinutes: 20,
  soundEnabled: true,
};

export function useNotifications() {
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [nextNotificationIn, setNextNotificationIn] = useState<number>(0);

  // Check permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Request permission
  const requestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('This browser does not support notifications');
      return false;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  };

  // Start notification timer
  useEffect(() => {
    if (!settings.enabled || permission !== 'granted') {
      return;
    }

    const intervalMs = settings.intervalMinutes * 60 * 1000;
    let timeRemaining = intervalMs;

    // Update countdown every second
    const countdownInterval = setInterval(() => {
      timeRemaining -= 1000;
      setNextNotificationIn(Math.max(0, Math.floor(timeRemaining / 1000)));
    }, 1000);

    // Send notification at interval
    const notificationInterval = setInterval(() => {
      sendNotification();
      timeRemaining = intervalMs; // Reset countdown
    }, intervalMs);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(notificationInterval);
    };
  }, [settings.enabled, settings.intervalMinutes, permission]);

  // Send notification
  const sendNotification = () => {
    if (permission !== 'granted') {
      return;
    }

    const notification = new Notification('👁️ Time for an Eye Break!', {
      body: `You've been working for ${settings.intervalMinutes} minutes. Rest your eyes!`,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: 'eyezin-break',
      requireInteraction: true,
      actions: [
        {
          action: 'start-exercise',
          title: '🏋️ Start Exercise',
        },
        {
          action: 'snooze',
          title: '😴 Snooze 5 min',
        },
      ],
    });

    // Play sound if enabled
    if (settings.soundEnabled) {
      playNotificationSound();
    }

    // Handle click
    notification.onclick = () => {
      window.focus();
      notification.close();
      // Could navigate to /app here
    };

    // Auto-close after 30 seconds
    setTimeout(() => notification.close(), 30000);
  };

  // Play notification sound
  const playNotificationSound = () => {
    // Using Web Audio API for a gentle chime
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800; // Frequency in Hz
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  // Update settings
  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Toggle notifications
  const toggleNotifications = async () => {
    if (!settings.enabled && permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) {
        return;
      }
    }

    updateSettings({ enabled: !settings.enabled });
  };

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    settings,
    permission,
    nextNotificationIn: formatTime(nextNotificationIn),
    requestPermission,
    toggleNotifications,
    updateSettings,
    sendNotification,
  };
}
