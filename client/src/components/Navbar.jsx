import React from 'react';
import { Users, Zap } from 'lucide-react';

export default function Navbar({ activeUsers }) {
  return (
    <header className="mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
          <Zap size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">SyncBoard</h1>
          <p className="text-xs text-slate-400">Real-Time Collaborative Kanban Workspace</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-full">
        <Users size={14} className="text-emerald-400" />
        <span className="text-xs font-medium text-slate-300">
          {activeUsers} {activeUsers === 1 ? 'User' : 'Users'} Online
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1"></span>
      </div>
    </header>
  );
}