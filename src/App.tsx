import React, { useState } from 'react';
import { PlusCircle, Brain } from 'lucide-react';
import BotCard from './components/BotCard';
import TaskQueue from './components/TaskQueue';
import type { Bot, Task, BrowserProfile } from './types';

const defaultProfile: BrowserProfile = {
  id: '1',
  name: 'Default Profile',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  proxy: {
    enabled: false,
  },
  fingerprint: {
    timezone: 'UTC',
    resolution: '1920x1080',
    platform: 'Windows',
    language: 'en-US',
  },
};

function App() {
  const [bots, setBots] = useState<Bot[]>([
    {
      id: '1',
      name: 'Analysis Bot',
      status: 'running',
      task: 'Analyzing market trends and generating insights',
      lastActive: '2 minutes ago',
      profile: { ...defaultProfile, id: '1' },
    },
    {
      id: '2',
      name: 'Social Bot',
      status: 'paused',
      task: 'Monitoring social media engagement',
      lastActive: '15 minutes ago',
      profile: { ...defaultProfile, id: '2' },
    },
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      description: 'Analyze competitor website content and generate report',
      priority: 'high',
      assignedTo: 'Analysis Bot',
    },
    {
      id: '2',
      description: 'Schedule social media posts for the week',
      priority: 'medium',
    },
    {
      id: '3',
      description: 'Generate weekly performance metrics',
      priority: 'low',
    },
  ]);

  const toggleBotStatus = (botId: string) => {
    setBots(bots.map(bot => {
      if (bot.id === botId) {
        return {
          ...bot,
          status: bot.status === 'running' ? 'paused' : 'running',
          lastActive: 'Just now',
        };
      }
      return bot;
    }));
  };

  const deleteBot = (botId: string) => {
    setBots(bots.filter(bot => bot.id !== botId));
  };

  const updateBotProfile = (botId: string, profile: BrowserProfile) => {
    setBots(bots.map(bot => {
      if (bot.id === botId) {
        return { ...bot, profile };
      }
      return bot;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Brain className="w-10 h-10 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">GPT Launcher</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Manage and coordinate multiple AI bots efficiently. Launch autonomous tasks,
            monitor performance, and optimize resource allocation in real-time.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Active Bots</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <PlusCircle className="w-5 h-5" />
                <span>Add Bot</span>
              </button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {bots.map(bot => (
                <BotCard
                  key={bot.id}
                  {...bot}
                  onToggle={() => toggleBotStatus(bot.id)}
                  onDelete={() => deleteBot(bot.id)}
                  onUpdateProfile={(profile) => updateBotProfile(bot.id, profile)}
                />
              ))}
            </div>
          </div>

          <div>
            <TaskQueue tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;