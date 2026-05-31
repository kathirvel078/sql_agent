import React from 'react';
import { Menu, Database } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:hidden">
      <button 
        onClick={onMenuClick}
        className="p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
      >
        <Menu size={20} />
      </button>
      
      <div className="flex items-center gap-2 font-semibold">
        <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center">
          <Database size={14} />
        </div>
        <span className="text-[15px] tracking-tight">SQL Agent</span>
      </div>
    </header>
  );
};

export default Header;
