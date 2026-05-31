import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import EmptyState from '../components/EmptyState';
import { useChat } from '../hooks/useChat';
import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { messages, isLoading, error, sendMessage, clearHistory, setError } = useChat();

  const handleSendMessage = (content) => {
    sendMessage(content);
  };

  return (
    <div className="flex h-[100svh] w-full bg-background overflow-hidden selection:bg-primary/20 selection:text-primary">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNewChat={clearHistory}
        onClearHistory={clearHistory}
        hasMessages={messages.length > 0}
      />
      
      <main className="flex-1 flex flex-col h-full min-w-0 relative">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* Error Toast */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              className="absolute top-4 md:top-6 left-1/2 z-50 flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-3 rounded-xl shadow-lg font-medium text-[14px] w-[90%] md:w-auto max-w-md"
            >
              <AlertCircle size={18} />
              <span className="flex-1 truncate">{error}</span>
              <button 
                onClick={() => setError(null)}
                className="p-1 hover:bg-destructive-foreground/20 rounded-md transition-colors ml-2"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {messages.length === 0 ? (
          <div className="flex-1 overflow-y-auto">
            <EmptyState onExampleClick={handleSendMessage} />
          </div>
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
        )}
        
        <div className="p-4 md:px-8 pb-4 md:pb-8">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
