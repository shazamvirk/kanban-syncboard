const Column = require('../models/Column');
const Card = require('../models/Card');
const initialData = require('./initialData');

async function seedInitialData() {
  const cardMap = {};
  for (const [key, cardData] of Object.entries(initialData.cards)) {
    const card = await Card.create({
      title: cardData.title,
      description: cardData.description,
      priority: cardData.priority
    });
    cardMap[key] = card._id;
  }

  let order = 0;
  for (const [colKey, colData] of Object.entries(initialData.columns)) {
    const dbCardIds = colData.cardIds.map((cId) => cardMap[cId]);
    await Column.create({
      columnId: colData.id,
      title: colData.title,
      cardIds: dbCardIds,
      order: order++
    });
  }
}

async function getBoardState() {
  let columns = await Column.find().populate('cardIds').sort('order');
  
  if (columns.length === 0) {
    await seedInitialData();
    columns = await Column.find().populate('cardIds').sort('order');
  }

  const board = { columns: {}, cards: {} };

  columns.forEach((col) => {
    const cardIdStrings = col.cardIds.map((card) => card._id.toString());
    
    board.columns[col.columnId] = {
      id: col.columnId,
      title: col.title,
      cardIds: cardIdStrings
    };

    col.cardIds.forEach((card) => {
      board.cards[card._id.toString()] = {
        id: card._id.toString(),
        title: card.title,
        description: card.description,
        priority: card.priority
      };
    });
  });

  return board;
}

module.exports = { getBoardState };