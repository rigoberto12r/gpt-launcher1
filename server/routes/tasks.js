import { Router } from 'express';
import { taskController } from '../controllers/taskController.js';

const router = Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.post('/:id/assign', taskController.assignTask);

export default router;