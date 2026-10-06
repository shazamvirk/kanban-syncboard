import React, { useState } from 'react';
import { X, Trash2, Save } from 'lucide-react';

export default function CardModal({ card, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [priority, setPriority] = useState(card.priority || 'medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...card, title, description, priority });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-700/80 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-100">Edit Task</h2>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/60">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-700/60">
            <button
              type="button"
              onClick={() => onDelete(card.id)}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-3 py-2 rounded-lg transition-colors"
            >
              <Trash2 size={14} /> Delete
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-200 px-3 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <Save size={14} /> Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}