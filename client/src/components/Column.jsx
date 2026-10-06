import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import Card from './Card';

export default function Column({ column, cards, onAddCard, onCardClick }) {
  return (
    <div className="w-80 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col shrink-0">
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="text-sm font-semibold text-slate-300 tracking-wide">{column.title}</h2>
        <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full border border-slate-700/50">
          {column.cardIds.length}
        </span>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-50 space-y-3 rounded-xl p-1 transition-colors ${
              snapshot.isDraggingOver ? 'bg-indigo-500/5 ring-1 ring-indigo-500/20' : ''
            }`}
          >
            {column.cardIds.map((cardId, index) => {
              const card = cards[cardId];
              if (!card) return null;
              return (
                <Card
                  key={card.id}
                  card={card}
                  index={index}
                  onCardClick={onCardClick}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        onClick={() => onAddCard(column.id)}
        className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl border border-dashed border-slate-800 hover:border-slate-700 transition-colors"
      >
        <Plus size={14} /> Add New Task
      </button>
    </div>
  );
}