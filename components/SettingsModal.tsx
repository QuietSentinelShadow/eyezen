'use client';

import { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { X, Bell, BellOff, Volume2, VolumeX } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const {
    settings,
    permission,
    nextNotificationIn,
    toggleNotifications,
    updateSettings,
  } = useNotifications();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Settings</h2>
          <p className="text-gray-600">Configure your break reminders</p>
        </div>

        {/* Notification Permission Warning */}
        {permission === 'default' && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-sm text-yellow-900">
              ⚠️ Notifications are blocked. Please enable them in your browser settings.
            </p>
          </div>
        )}

        {/* Notifications Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {settings.enabled ? (
                <Bell className="text-blue-500" size={24} />
              ) : (
                <BellOff className="text-gray-400" size={24} />
              )}
              <div>
                <h3 className="font-semibold">Break Reminders</h3>
                <p className="text-sm text-gray-600">
                  {settings.enabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleNotifications}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enabled ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Countdown */}
          {settings.enabled && (
            <div className="text-sm text-gray-600 mb-4">
              Next reminder in: <span className="font-semibold">{nextNotificationIn}</span>
            </div>
          )}
        </div>

        {/* Interval Selector */}
        {settings.enabled && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Reminder Interval
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 20, 30, 45].map((mins) => (
                <button
                  key={mins}
                  onClick={() => updateSettings({ intervalMinutes: mins })}
                  className={`py-2 px-4 rounded-lg border-2 transition-all ${
                    settings.intervalMinutes === mins
                      ? 'border-blue-500 bg-blue-50 text-blue-600 font-semibold'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Recommended: 20 minutes (20-20-20 rule)
            </p>
          </div>
        )}

        {/* Sound Toggle */}
        {settings.enabled && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.soundEnabled ? (
                  <Volume2 className="text-blue-500" size={24} />
                ) : (
                  <VolumeX className="text-gray-400" size={24} />
                )}
                <div>
                  <h3 className="font-semibold">Sound</h3>
                  <p className="text-sm text-gray-600">Play chime on break</p>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.soundEnabled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Premium Notice */}
        <div className="mt-8 pt-6 border-t">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">💡 Premium Feature:</span> Custom intervals & routines
            </p>
            <button
              onClick={() => alert('Upgrade to Premium!')}
              className="text-sm text-blue-600 font-medium hover:text-blue-700"
            >
              Learn more →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
