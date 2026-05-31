import React, { useState, useRef, useEffect } from 'react';
import { Send, CornerDownLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ChatInput = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-0 md:pb-6 relative z-10">
      <div className={cn(
        "relative rounded-2xl bg-card border shadow-sm transition-all duration-200",
        "focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50",
        disabled ? "opacity-70 bg-muted/50 border-border" : "border-border hover:border-border/80"
      )}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about the database... (Shift + Enter for new line)"
          disabled={disabled}
          className="w-full max-h-[200px] min-h-[60px] resize-none bg-transparent py-4 pl-4 pr-14 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed"
          rows={1}
        />
        
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className={cn(
              "p-2 rounded-xl flex items-center justify-center transition-all duration-200",
              input.trim() && !disabled
                ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90 active:scale-95"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
            title="Send Message"
          >
            <Send size={18} className="translate-x-[1px]" />
          </button>
        </div>
      </div>
      
      <div className="text-center mt-2 text-[11px] text-muted-foreground flex items-center justify-center gap-1 font-medium">
        <span className="hidden sm:inline">Press</span> 
        <span className="hidden sm:flex items-center justify-center bg-muted/80 rounded px-1.5 py-0.5 mx-0.5 border border-border/50 text-[10px]"><CornerDownLeft size={10} className="mr-0.5"/> Enter</span> 
        <span className="hidden sm:inline">to send</span>
        <span className="sm:hidden">AI Assistant can make mistakes. Consider verifying important information.</span>
      </div>
    </div>
  );
};

export default ChatInput;
