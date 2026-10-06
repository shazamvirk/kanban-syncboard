import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Edit3 } from 'lucide-react';

const priorityColors = {
  high: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
};

export default function Card({ card, index, onCardClick }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onCardClick(card)}
          className={`group relative p-4 bg-slate-800 rounded-xl border transition-all cursor-pointer select-none ${
            snapshot.isDragging
              ? 'border-indigo-500 ring-2 ring-indigo-500/30 shadow-2xl scale-[1.02] bg-slate-700'
              : 'border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/90 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md border ${priorityColors[card.priority] || priorityColors.medium}`}>
              {card.priority || 'medium'}
            </span>
            <Edit3 size={14} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <h3 className="text-sm font-medium text-slate-200 leading-snug mb-1">
            {card.title}
          </h3>

          {card.description && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {card.description}
            </p>
          )}
        </div>
      )}
    </Draggable>
  );
}