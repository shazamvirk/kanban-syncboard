const Card = require('../models/Card');
const Column = require('../models/Column');
const { getBoardState } = require('../utils/boardState');

module.exports = (io) => {
  let activeUsersCount = 0;

  io.on('connection', (socket) => {
    activeUsersCount++;
    console.log(`User connected: ${socket.id} (Total: ${activeUsersCount})`);
    
    socket.join('kanban-room');
    io.to('kanban-room').emit('user_presence_updated', { activeUsers: activeUsersCount });

    // Handle card moves across columns or within a column
    socket.on('card_moved', async (updatedBoardState) => {
      try {
        for (const [colId, colData] of Object.entries(updatedBoardState.columns)) {
          await Column.updateOne(
            { columnId: colId },
            { $set: { cardIds: colData.cardIds } }
          );
        }
        const state = await getBoardState();
        socket.to('kanban-room').emit('board_updated', state);
      } catch (err) {
        console.error('Error handling card_moved:', err);
      }
    });

    // Handle adding a new card
    socket.on('card_added', async ({ columnId, newCard }) => {
      try {
        const createdCard = await Card.create({
          title: newCard.title,
          description: newCard.description || '',
          priority: newCard.priority || 'medium'
        });

        await Column.updateOne(
          { columnId },
          { $push: { cardIds: createdCard._id } }
        );

        const state = await getBoardState();
        io.to('kanban-room').emit('board_updated', state);
      } catch (err) {
        console.error('Error handling card_added:', err);
      }
    });

    // Handle updating an existing card
    socket.on('card_updated', async (updatedCard) => {
      try {
        await Card.findByIdAndUpdate(updatedCard.id, {
          title: updatedCard.title,
          description: updatedCard.description,
          priority: updatedCard.priority
        });

        const state = await getBoardState();
        io.to('kanban-room').emit('board_updated', state);
      } catch (err) {
        console.error('Error handling card_updated:', err);
      }
    });

    // Handle deleting a card
    socket.on('card_deleted', async ({ cardId, columnId }) => {
      try {
        await Card.findByIdAndDelete(cardId);
        await Column.updateOne(
          { columnId },
          { $pull: { cardIds: cardId } }
        );

        const state = await getBoardState();
        io.to('kanban-room').emit('board_updated', state);
      } catch (err) {
        console.error('Error handling card_deleted:', err);
      }
    });

    socket.on('disconnect', () => {
      activeUsersCount = Math.max(0, activeUsersCount - 1);
      console.log(`User disconnected: ${socket.id} (Total: ${activeUsersCount})`);
      io.to('kanban-room').emit('user_presence_updated', { activeUsers: activeUsersCount });
    });
  });
};