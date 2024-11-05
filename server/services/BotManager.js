import puppeteer from 'puppeteer';
import { logger } from '../utils/logger.js';

export class BotManager {
  constructor() {
    this.bots = new Map();
    this.browsers = new Map();
  }

  async createBot(botData) {
    try {
      const browser = await this.launchBrowser(botData.profile);
      const bot = {
        ...botData,
        status: 'idle',
        lastActive: new Date().toISOString()
      };
      
      this.bots.set(bot.id, bot);
      this.browsers.set(bot.id, browser);
      
      return bot;
    } catch (error) {
      logger.error(`Error creating bot: ${error.message}`);
      throw error;
    }
  }

  async launchBrowser(profile) {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          `--window-size=${profile.fingerprint.resolution.replace('x', ',')}`,
          `--user-agent=${profile.userAgent}`
        ]
      });
      
      return browser;
    } catch (error) {
      logger.error(`Error launching browser: ${error.message}`);
      throw error;
    }
  }

  async getAllBots() {
    return Array.from(this.bots.values());
  }

  async getBotById(id) {
    return this.bots.get(id);
  }

  async updateBot(id, botData) {
    const bot = this.bots.get(id);
    if (!bot) return null;

    const updatedBot = { ...bot, ...botData };
    this.bots.set(id, updatedBot);
    return updatedBot;
  }

  async deleteBot(id) {
    const browser = this.browsers.get(id);
    if (browser) {
      await browser.close();
      this.browsers.delete(id);
    }
    return this.bots.delete(id);
  }

  async toggleBotStatus(id) {
    const bot = this.bots.get(id);
    if (!bot) return null;

    const newStatus = bot.status === 'running' ? 'paused' : 'running';
    const updatedBot = {
      ...bot,
      status: newStatus,
      lastActive: new Date().toISOString()
    };

    this.bots.set(id, updatedBot);
    return updatedBot;
  }

  async executeTask(botId, task) {
    const bot = this.bots.get(botId);
    const browser = this.browsers.get(botId);
    
    if (!bot || !browser) {
      throw new Error('Bot not found');
    }

    try {
      const page = await browser.newPage();
      // Configure page based on bot profile
      await page.setViewport({
        width: parseInt(bot.profile.fingerprint.resolution.split('x')[0]),
        height: parseInt(bot.profile.fingerprint.resolution.split('x')[1])
      });

      // Execute task logic here
      // This is where you'd implement specific task handling

      await page.close();
      return true;
    } catch (error) {
      logger.error(`Error executing task: ${error.message}`);
      throw error;
    }
  }
}