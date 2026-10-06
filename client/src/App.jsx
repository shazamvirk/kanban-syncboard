import React, { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useSocket } from './context/SocketContext';
import Navbar from './components/Navbar';
import Column from './components/Column';
import CardModal from './components/CardModal';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default function App() {
  const socket = useSocket();
  const [board, setBoard] = useState(null);
  const [activeUsers, setActiveUsers] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/board`)
      .then((res) => res.json())
      .then((data) => setBoard(data))
      .catch((err) => console.error('Failed to fetch initial board:', err));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('board_updated', (updatedBoard) => {
      setBoard(updatedBoard);
    });

    socket.on('user_presence_updated', ({ activeUsers }) => {
      setActiveUsers(activeUsers);
    });

    return () => {
      socket.off('board_updated');
      socket.off('user_presence_updated');
    };
  }, [socket]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const startCol = board.columns[source.droppableId];
    const finishCol = board.columns[destination.droppableId];

    let newBoard = { ...board };

    if (startCol === finishCol) {
      const newCardIds = Array.from(startCol.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      newBoard.columns[startCol.id] = { ...startCol, cardIds: newCardIds };
    } else {
      const startCardIds = Array.from(startCol.cardIds);
      startCardIds.splice(source.index, 1);

      const finishCardIds = Array.from(finishCol.cardIds);
      finishCardIds.splice(destination.index, 0, draggableId);

      newBoard.columns[startCol.id] = { ...startCol, cardIds: startCardIds };
      newBoard.columns[finishCol.id] = { ...finishCol, cardIds: finishCardIds };
    }

    setBoard(newBoard);

    if (socket) {
      socket.emit('card_moved', newBoard);
    }
  };

  const handleAddCard = (columnId) => {
    const title = prompt('Enter task title:');
    if (!title) return;

    const newCard = {
      title,
      description: '',
      priority: 'medium'
    };

    if (socket) {
      socket.emit('card_added', { columnId, newCard });
    }
  };

  const handleSaveCard = (updatedCard) => {
    if (socket) {
      socket.emit('card_updated', updatedCard);
    }
    setSelectedCard(null);
  };

  const handleDeleteCard = (cardId) => {
    const columnId = Object.keys(board.columns).find((colId) =>
      board.columns[colId].cardIds.includes(cardId)
    );

    if (socket && columnId) {
      socket.emit('card_deleted', { cardId, columnId });
    }
    setSelectedCard(null);
  };

  if (!board) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Connecting to SyncBoard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <Navbar activeUsers={activeUsers} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6 items-start">
          {Object.values(board.columns).map((column) => (
            <Column
              key={column.id}
              column={column}
              cards={board.cards}
              onAddCard={handleAddCard}
              onCardClick={(card) => setSelectedCard(card)}
            />
          ))}
        </div>
      </DragDropContext>

      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onSave={handleSaveCard}
          onDelete={handleDeleteCard}
        />
      )}
    </div>
  );
}