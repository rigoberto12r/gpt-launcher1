import React from 'react';
import { ListTodo } from 'lucide-react';

interface Task {
  id: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
}

interface TaskQueueProps {
  tasks: Task[];
}

export default function TaskQueue({ tasks }: TaskQueueProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <ListTodo className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Task Queue</h2>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-lg border border-gray-100 hover:border-indigo-100 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.priority === 'high' ? 'bg-red-100 text-red-700' :
                task.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                'bg-green-100 text-green-700'
              }`}>
                {task.priority.toUpperCase()}
              </span>
              {task.assignedTo && (
                <span className="text-sm text-gray-600">
                  Assigned to: {task.assignedTo}
                </span>
              )}
            </div>
            <p className="text-gray-700">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}