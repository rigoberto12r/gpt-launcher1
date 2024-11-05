export interface BrowserProfile {
  id: string;
  name: string;
  userAgent: string;
  proxy: {
    enabled: boolean;
    host?: string;
    port?: number;
    username?: string;
  };
  fingerprint: {
    timezone: string;
    resolution: string;
    platform: string;
    language: string;
  };
}

export interface Bot {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'paused';
  task: string;
  lastActive: string;
  profile?: BrowserProfile;
}

export interface Task {
  id: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
}