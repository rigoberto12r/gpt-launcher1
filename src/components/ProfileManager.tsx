import React from 'react';
import { Settings, Globe, Shield, Fingerprint } from 'lucide-react';
import type { BrowserProfile } from '../types';

interface ProfileManagerProps {
  profile: BrowserProfile;
  onUpdate: (profile: BrowserProfile) => void;
}

export default function ProfileManager({ profile, onUpdate }: ProfileManagerProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Browser Profile</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium">User Agent</h3>
          </div>
          <input
            type="text"
            value={profile.userAgent}
            onChange={(e) => onUpdate({ ...profile, userAgent: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium">Proxy Settings</h3>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profile.proxy.enabled}
                onChange={(e) => onUpdate({
                  ...profile,
                  proxy: { ...profile.proxy, enabled: e.target.checked }
                })}
                className="rounded text-indigo-600"
              />
              <span>Enable Proxy</span>
            </label>
            {profile.proxy.enabled && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Host"
                  value={profile.proxy.host}
                  onChange={(e) => onUpdate({
                    ...profile,
                    proxy: { ...profile.proxy, host: e.target.value }
                  })}
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Port"
                  value={profile.proxy.port}
                  onChange={(e) => onUpdate({
                    ...profile,
                    proxy: { ...profile.proxy, port: parseInt(e.target.value) }
                  })}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium">Fingerprint</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Timezone
              </label>
              <select
                value={profile.fingerprint.timezone}
                onChange={(e) => onUpdate({
                  ...profile,
                  fingerprint: { ...profile.fingerprint, timezone: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">EST</option>
                <option value="Europe/London">GMT</option>
                <option value="Asia/Tokyo">JST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Resolution
              </label>
              <select
                value={profile.fingerprint.resolution}
                onChange={(e) => onUpdate({
                  ...profile,
                  fingerprint: { ...profile.fingerprint, resolution: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="1920x1080">1920x1080</option>
                <option value="1366x768">1366x768</option>
                <option value="2560x1440">2560x1440</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}