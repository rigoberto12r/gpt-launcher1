import { Router } from 'express';
import { botController } from '../controllers/botController.js';

const router = Router();

router.post('/', botController.createBot);
router.get('/', botController.getAllBots);
router.get('/:id', botController.getBotById);
router.put('/:id', botController.updateBot);
router.delete('/:id', botController.deleteBot);
router.post('/:id/toggle', botController.toggleBotStatus);

export default router;