import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger.js';
import { TaskManager } from '../services/TaskManager.js';
import { validateTask } from '../validators/taskValidator.js';

const taskManager = new TaskManager();

export const taskController = {
  async createTask(req, res) {
    try {
      const validatedData = validateTask(req.body);
      const task = await taskManager.createTask(validatedData);
      logger.info(`Task created: ${task.id}`);
      res.status(201).json(task);
    } catch (error) {
      logger.error(`Error creating task: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  },

  async getAllTasks(req, res) {
    try {
      const tasks = await taskManager.getAllTasks();
      res.json(tasks);
    } catch (error) {
      logger.error(`Error fetching tasks: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getTaskById(req, res) {
    try {
      const task = await taskManager.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      logger.error(`Error fetching task: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateTask(req, res) {
    try {
      const validatedData = validateTask(req.body);
      const task = await taskManager.updateTask(req.params.id, validatedData);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      logger.info(`Task updated: ${task.id}`);
      res.json(task);
    } catch (error) {
      logger.error(`Error updating task: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  },

  async deleteTask(req, res) {
    try {
      const success = await taskManager.deleteTask(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Task not found' });
      }
      logger.info(`Task deleted: ${req.params.id}`);
      res.status(204).send();
    } catch (error) {
      logger.error(`Error deleting task: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async assignTask(req, res) {
    try {
      const { botId } = req.body;
      const task = await taskManager.assignTask(req.params.id, botId);
      if (!task) {
        return res.status(404).json({ error: 'Task or bot not found' });
      }
      logger.info(`Task ${task.id} assigned to bot ${botId}`);
      res.json(task);
    } catch (error) {
      logger.error(`Error assigning task: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }
};