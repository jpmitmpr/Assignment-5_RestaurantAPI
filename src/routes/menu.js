const express = require('express');
const { getAll, getById, create, update, remove } = require('../data/store');
const { menuRules, handleValidationErrors } = require('../middlewares/validators');

const router = express.Router();

router.get('/', (req, res) => {
  const items = getAll();
  return res.status(200).json(items);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = getById(id);
  if (!item) return res.status(404).json({ error: 'Menu item not found' });
  return res.status(200).json(item);
});

router.post('/', menuRules, handleValidationErrors, (req, res) => {
  const data = { ...req.body };
  if (typeof data.available === 'undefined') data.available = true;
  const created = create(data);
  return res.status(201).json(created);
});

router.put('/:id', menuRules, handleValidationErrors, (req, res) => {
  const id = Number(req.params.id);
  const existing = getById(id);
  if (!existing) return res.status(404).json({ error: 'Menu item not found' });
  const updated = update(id, req.body);
  return res.status(200).json(updated);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const removed = remove(id);
  if (!removed) return res.status(404).json({ error: 'Menu item not found' });
  return res.status(200).json({ message: 'Menu item deleted', item: removed });
});

module.exports = router;
