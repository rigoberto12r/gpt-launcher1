import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger.js';
import { BotManager } from '../services/BotManager.js';
import { validateBot } from '../validators/botValidator.js';

const botManager = new BotManager();

export const botController = {
  async createBot(req, res) {
    try {
      const validatedData = validateBot(req.body);
      const bot = await botManager.createBot(validatedData);
      logger.info(`Bot created: ${bot.id}`);
      res.status(201).json(bot);
    } catch (error) {
      logger.error(`Error creating bot: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  },

  async getAllBots(req, res) {
    try {
      const bots = await botManager.getAllBots();
      res.json(bots);
    } catch (error) {
      logger.error(`Error fetching bots: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getBotById(req, res) {
    try {
      const bot = await botManager.getBotById(req.params.id);
      if (!bot) {
        return res.status(404).json({ error: 'Bot not found' });
      }
      res.json(bot);
    } catch (error) {
      logger.error(`Error fetching bot: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateBot(req, res) {
    try {
      const validatedData = validateBot(req.body);
      const bot = await botManager.updateBot(req.params.id, validatedData);
      if (!bot) {
        return res.status(404).json({ error: 'Bot not found' });
      }
      logger.info(`Bot updated: ${bot.id}`);
      res.json(bot);
    } catch (error) {
      logger.error(`Error updating bot: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  },

  async deleteBot(req, res) {
    try {
      const success = await botManager.deleteBot(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Bot not found' });
      }
      logger.info(`Bot deleted: ${req.params.id}`);
      res.status(204).send();
    } catch (error) {
      logger.error(`Error deleting bot: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async toggleBotStatus(req, res) {
    try {
      const bot = await botManager.toggleBotStatus(req.params.id);
      if (!bot) {
        return res.status(404).json({ error: 'Bot not found' });
      }
      logger.info(`Bot status toggled: ${bot.id}`);
      res.json(bot);
    } catch (error) {
      logger.error(`Error toggling bot status: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};