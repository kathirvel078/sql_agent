import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { User, Database } from 'lucide-react';
import { motion } from 'framer-motion';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  // Format the timestamp
  const timeString = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full mb-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex max-w-[85%] md:max-w-[75%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Avatar */}
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1",
          isUser ? "ml-3 bg-primary text-primary-foreground" : "mr-3 bg-accent text-accent-foreground border border-border"
        )}>
          {isUser ? <User size={16} /> : <Database size={16} />}
        </div>

        {/* Message Content */}
        <div className={cn(
          "flex flex-col",
          isUser ? "items-end" : "items-start"
        )}>
          <div className={cn(
            "px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-none" 
              : "bg-card text-card-foreground border border-border rounded-tl-none"
          )}>
            {/* Simple text rendering for now. In a real app we might use react-markdown here */}
            <div className="whitespace-pre-wrap break-words font-medium">
              {message.content}
            </div>
          </div>
          
          <span className="text-xs text-muted-foreground mt-1.5 px-1 font-medium">
            {timeString}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
