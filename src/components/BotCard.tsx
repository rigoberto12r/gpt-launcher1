import React, { useState } from 'react';
import { Bot, Play, Pause, XCircle, Settings } from 'lucide-react';
import type { Bot as BotType } from '../types';
import ProfileManager from './ProfileManager';

interface BotCardProps extends Omit<BotType, 'id'> {
  onToggle: () => void;
  onDelete: () => void;
  onUpdateProfile: (profile: BotType['profile']) => void;
}

export default function BotCard({
  name,
  status,
  task,
  lastActive,
  profile,
  onToggle,
  onDelete,
  onUpdateProfile
}: BotCardProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-indigo-600" />
          <h3 className="font-semibold text-lg">{name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {status === 'running' ? (
              <Pause className="w-5 h-5 text-amber-600" />
            ) : (
              <Play className="w-5 h-5 text-green-600" />
            )}
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XCircle className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Status:</span>
          <span className={`text-sm ${
            status === 'running' ? 'text-green-600' :
            status === 'paused' ? 'text-amber-600' :
            'text-gray-600'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          <p className="font-medium">Current Task:</p>
          <p className="mt-1">{task}</p>
        </div>
        <div className="text-xs text-gray-500">
          Last Active: {lastActive}
        </div>
      </div>

      {showProfile && profile && (
        <div className="mt-4 pt-4 border-t">
          <ProfileManager
            profile={profile}
            onUpdate={onUpdateProfile}
          />
        </div>
      )}
    </div>
  );
}