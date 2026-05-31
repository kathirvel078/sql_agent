import React from 'react';
import { MessageSquare, Plus, Trash2, Database, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = ({ isOpen, onClose, onNewChat, onClearHistory, hasMessages }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed md:sticky top-0 left-0 h-[100svh] w-72 bg-secondary/30 border-r border-border flex flex-col z-50 transition-transform duration-300 ease-in-out backdrop-blur-xl md:backdrop-blur-none",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <Database size={18} />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-foreground">SQL Agent</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 md:hidden text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-3 flex-1 overflow-y-auto">
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-xl transition-all duration-200 shadow-sm font-medium text-[14px]"
          >
            <Plus size={18} />
            New Query
          </button>

          <div className="mt-8">
            <h3 className="text-xs font-semibold text-muted-foreground px-3 mb-2 uppercase tracking-wider">Recent Activity</h3>
            {hasMessages ? (
              <div className="space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-accent text-accent-foreground font-medium text-[14px] transition-colors">
                  <MessageSquare size={16} className="text-primary" />
                  <span className="truncate">Current Session</span>
                </button>
              </div>
            ) : (
              <p className="text-[13px] text-muted-foreground px-3 py-2 italic">No recent activity</p>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-border mt-auto">
          <button
            onClick={onClearHistory}
            disabled={!hasMessages}
            className="w-full flex items-center gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-muted-foreground disabled:cursor-not-allowed px-4 py-2.5 rounded-xl transition-colors font-medium text-[14px]"
          >
            <Trash2 size={16} />
            Clear History
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
