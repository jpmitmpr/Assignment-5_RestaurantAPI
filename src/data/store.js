let _id = 1;
const items = [
  {
    id: _id++,
    name: 'Tomato Soup',
    description: 'Creamy tomato soup with fresh basil and croutons.',
    price: 4.5,
    category: 'appetizer',
    ingredients: ['tomato', 'cream', 'basil'],
    available: true,
  },
  {
    id: _id++,
    name: 'Grilled Chicken',
    description: 'Juicy grilled chicken breast with herbs and vegetables.',
    price: 11.99,
    category: 'entree',
    ingredients: ['chicken', 'herbs', 'vegetables'],
    available: true,
  },
];

function getAll() { return items; }
function getById(id) { return items.find(i => i.id === id); }
function create(data) {
  const item = {
    id: _id++,
    available: true,
    ...data,
  };
  items.push(item);
  return item;
}
function update(id, data) {
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  return items[idx];
}
function remove(id) {
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return null;
  const [deleted] = items.splice(idx, 1);
  return deleted;
}

module.exports = { getAll, getById, create, update, remove };
