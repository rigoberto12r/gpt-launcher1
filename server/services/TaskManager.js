import { logger } from '../utils/logger.js';
import { BotManager } from './BotManager.js';

export class TaskManager {
  constructor() {
    this.tasks = new Map();
    this.botManager = new BotManager();
  }

  async createTask(taskData) {
    try {
      const task = {
        ...taskData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      this.tasks.set(task.id, task);
      return task;
    } catch (error) {
      logger.error(`Error creating task: ${error.message}`);
      throw error;
    }
  }

  async getAllTasks() {
    return Array.from(this.tasks.values());
  }

  async getTaskById(id) {
    return this.tasks.get(id);
  }

  async updateTask(id, taskData) {
    const task = this.tasks.get(id);
    if (!task) return null;

    const updatedTask = {
      ...task,
      ...taskData,
      updatedAt: new Date().toISOString()
    };
    
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id) {
    return this.tasks.delete(id);
  }

  async assignTask(taskId, botId) {
    const task = this.tasks.get(taskId);
    const bot = await this.botManager.getBotById(botId);

    if (!task || !bot) {
      return null;
    }

    const updatedTask = {
      ...task,
      assignedTo: botId,
      status: 'assigned',
      updatedAt: new Date().toISOString()
    };

    this.tasks.set(taskId, updatedTask);

    // Start task execution
    this.executeTask(updatedTask, bot).catch(error => {
      logger.error(`Error executing task ${taskId}: ${error.message}`);
      this.handleTaskError(taskId, error);
    });

    return updatedTask;
  }

  private async executeTask(task, bot) {
    try {
      // Update task status to running
      task.status = 'running';
      this.tasks.set(task.id, task);

      // Execute the task using the bot
      await this.botManager.executeTask(bot.id, task);

      // Update task status to completed
      task.status = 'completed';
      task.completedAt = new Date().toISOString();
      this.tasks.set(task.id, task);

      logger.info(`Task ${task.id} completed successfully`);
    } catch (error) {
      throw error;
    }
  }

  private async handleTaskError(taskId, error) {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'failed';
      task.error = error.message;
      task.updatedAt = new Date().toISOString();
      this.tasks.set(taskId, task);
    }
  }
}