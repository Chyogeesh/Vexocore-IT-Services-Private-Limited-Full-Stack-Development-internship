const express = require('-express');
const Task = require('../models/Task');
const { sendNotification } = require('../index');

const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, description, status } = req.body;
  const task = new Task({ userId: req.user.id, title, description, status });
  await task.save();
  await sendNotification(req.user.id, `New task created: ${title}`);
  res.json(task);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { title, description, status },
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
